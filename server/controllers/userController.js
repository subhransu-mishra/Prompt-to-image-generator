import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transactionModel from "../model/transactionModel.js";
import razorpay from "razorpay";
import crypto from "crypto";

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, credits: user.creditBalance, user: { name: user.name } });
  } catch (error) {
    console.error("User Credits Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const paymentRazorpay = async (req, res) => {
  
  try {
    const { userId, planId } = req.body;
    if (!userId || !planId) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    const plans = {
      Starter: { amount: 99.99, credits: 100 },
      Professional: { amount: 149.99, credits: 200 },
      Enterprise: { amount: 199.99, credits: 500 },
    };

    const plan = plans[planId];
    if (!plan) {
      return res.status(400).json({ success: false, message: "Invalid plan" });
    }

    const transaction = await transactionModel.create({
      userId,
      plan: planId,
      credits: plan.credits,
      amount: plan.amount,
      date: Date.now(),
      payment: false,
    });

    const order = await razorpayInstance.orders.create({
      amount: plan.amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: transaction._id.toString(),
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error("Payment Initiation Error:", error);
    res.status(500).json({ success: false, message: "Payment initiation failed" });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const transaction = await transactionModel.findById(razorpay_order_id);
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    transaction.payment = true;
    await transaction.save();

    const user = await userModel.findById(transaction.userId);
    if (user) {
      user.creditBalance += transaction.credits;
      await user.save();
    }

    res.json({ success: true, message: "Payment verified, credits added" });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};

export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay };
