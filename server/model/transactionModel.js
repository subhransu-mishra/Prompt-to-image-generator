import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  plan: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  razorpayOrderId: { 
    type: String,
    required: true // Keep as required, but ensure we set it during creation
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const transactionModel = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default transactionModel;
