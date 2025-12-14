import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transactionModel from "../model/transactionModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(201)
      .json({
        success: true,
        token,
        user: { name: user.name, credits: user.creditBalance },
      });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: { name: user.name, credits: user.creditBalance },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get User Credits
const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.error("User Credits Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Initiate Razorpay Payment
const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    if (!userId || !planId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    const plans = {
      Starter: { amount: 9999, credits: 100 },
      Professional: { amount: 14999, credits: 200 },
      Enterprise: { amount: 19999, credits: 500 },
    };

    const plan = plans[planId];
    if (!plan) {
      return res.status(400).json({ success: false, message: "Invalid plan" });
    }

    // First create Razorpay order
    const order = await razorpayInstance.orders.create({
      amount: plan.amount,
      currency: process.env.CURRENCY || "INR",
    });

    // Then create transaction WITH razorpayOrderId
    const transaction = await transactionModel.create({
      userId,
      plan: planId,
      credits: plan.credits,
      amount: plan.amount,
      payment: false,
      razorpayOrderId: order.id, // <-- Add Razorpay ID at creation time
    });

    res.json({ success: true, order });
  } catch (error) {
    console.error("Payment Initiation Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Payment initiation failed" });
  }
};

// Verify Razorpay Payment (Fixed)
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Find transaction by Razorpay's order ID (NOT MongoDB _id)
    const transaction = await transactionModel.findOne({
      razorpayOrderId: razorpay_order_id, // <-- FIXED: Use Razorpay's ID
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    // Verify signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }

    // Update transaction
    transaction.payment = true;
    await transaction.save();

    // Update user credits
    const user = await userModel.findById(transaction.userId);
    if (user) {
      user.creditBalance += transaction.credits;
      await user.save();
    }

    res.json({ success: true, message: "Payment verified, credits added" });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Payment verification failed" });
  }
};

export {
  registerUser,
  loginUser,
  userCredits,
  paymentRazorpay,
  verifyRazorpay,
};
