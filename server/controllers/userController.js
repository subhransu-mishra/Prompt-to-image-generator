import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../model/transactionModel.js";
import crypto from 'crypto';

// User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = { name, email, password: hashedPassword };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" }); // Fixed typo here
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token, user: { name: user.name } });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get User Credits
const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message }); // Fixed typo here
  }
};

// Razorpay Configuration
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Payment Processing
const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const userData = await userModel.findById(userId);

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing Details" }); // Fixed typo here
    }

    let credits, plan, amount, date;

    // Match planId case with frontend values
    switch (planId.toLowerCase()) {
      case "starter":
        plan = "Starter";
        credits = 100;
        amount = 10;
        break;
      case "professional":
        plan = "Professional";
        credits = 200;
        amount = 14.99;
        break;
      case "enterprise":
        plan = "Enterprise";
        credits = 500;
        amount = 29.99;
        break;
      default:
        return res.json({ success: false, message: "Invalid Plan" }); // Fixed typo here
    }

    date = Date.now();

    // Create Transaction Record
    const transactionData = { userId, plan, credits, amount, date };
    const newTransaction = await transactionModel.create(transactionData);

    // Create Razorpay Order
    const options = {
      amount: amount * 100, // Amount in paise
      currency: process.env.CURRENCY,
      receipt: `${newTransaction._id}`,
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error.message }); // Fixed typo here
      }
      return res.json({ success: true, order }); // Fixed typo here
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message }); // Fixed typo here
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body.payment;
    const { order } = req.body;

    // Verify the payment
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.json({ success: false, message: "Invalid payment signature" });
    }

    // Update transaction and user credits
    const transactionData = await transactionModel.findById(order.receipt);
    if (!transactionData || transactionData.payment) {
      return res.json({ success: false, message: "Invalid transaction" });
    }

    const userData = await userModel.findById(transactionData.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Update user credits and mark payment as complete
    await Promise.all([
      userModel.findByIdAndUpdate(userData._id, {
        creditBalance: userData.creditBalance + transactionData.credits
      }),
      transactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      })
    ]);

    res.json({ success: true, message: "Payment Successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay };
