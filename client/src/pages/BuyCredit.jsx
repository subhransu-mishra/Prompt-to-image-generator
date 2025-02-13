import React, { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import LoginModal from "../components/LoginModal";
import { RingLoader } from "react-spinners";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [earnedCredits, setEarnedCredits] = useState(0);
  const { width, height } = useWindowSize();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Purchase",
      description: "Credits Purchase",
      order_id: order.id,
      handler: async function (response) {
        try {
          const verificationData = {
            order,
            payment: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }
          };

          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razor`,
            verificationData,
            { headers: { token } }
          );

          if (data.success) {
            await loadCreditsData();
            setEarnedCredits(data.credits);
            setShowCongrats(true);
            toast.success("Payment successful!");
            setTimeout(() => {
              setShowCongrats(false);
              navigate("/");
            }, 5000);
          } else {
            toast.error(data.message || "Payment verification failed");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          toast.error(error.response?.data?.message || "Payment verification failed");
        }
      },
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function() {
          setLoadingPlan(null);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      setLoadingPlan(planId);
      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razor`,
        { planId, userId: user._id },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message || "Payment initiation failed");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error(error.response?.data?.message || "Failed to initiate payment");
    } finally {
      setLoadingPlan(null);
    }
  };

  const plans = [
    {
      id: "Starter",
      name: "Starter",
      credits: "100",
      price: "10",
      features: [
        "50 Image Generations",
        "Standard Resolution",
        "Basic Editing Tools",
        "24/7 Support",
        "7 Days Validity",
      ],
      recommended: false,
    },
    {
      id: "Professional",
      name: "Professional",
      credits: "200",
      price: "14.99",
      features: [
        "200 Image Generations",
        "HD Resolution",
        "Advanced Editing Tools",
        "Priority Support",
        "30 Days Validity",
        "Commercial Usage",
      ],
      recommended: true,
    },
    {
      id: "Enterprise",
      name: "Enterprise",
      credits: "500",
      price: "29.99",
      features: [
        "500 Image Generations",
        "4K Resolution",
        "Premium Editing Suite",
        "Dedicated Support",
        "60 Days Validity",
        "API Access",
        "Custom Branding",
      ],
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-primary pt-24 px-4">
      {showCongrats && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-80">
          <Confetti width={width} height={height} />
          <div className="text-center bg-gradient-to-b from-green-400 to-blue-600 text-white p-10 rounded-xl shadow-xl">
            <h2 className="text-4xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
            <p className="text-xl mb-2">You've successfully purchased credits.</p>
            <p className="text-2xl font-semibold">You received {earnedCredits} credits! 🚀</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select the perfect credit package for your creative needs. All plans
            include access to our cutting-edge AI image generation technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative bg-gradient-to-b from-gray-900 to-black rounded-xl p-6 border ${
                plan.recommended
                  ? "border-blue-500 shadow-lg shadow-blue-500/20"
                  : "border-gray-800"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recommended
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="text-3xl font-bold text-white">
                  ${plan.price}
                  <span className="text-lg text-gray-400 font-normal">/month</span>
                </div>
                <div className="text-blue-400 font-semibold">
                  {plan.credits} Credits
                </div>

                <ul className="space-y-3 py-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <FaCheck className="text-blue-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                    plan.recommended
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gradient-to-r from-gray-800 to-zinc-900 hover:from-gray-700 hover:to-zinc-800 text-white border border-gray-700"
                  }`}
                  onClick={() => paymentRazorpay(plan.id)}
                  disabled={loadingPlan === plan.id}
                >
                  {loadingPlan === plan.id ? (
                    <div className="flex justify-center">
                      <RingLoader
                        color={plan.recommended ? "#ffffff" : "#60a5fa"}
                        size={24}
                        speedMultiplier={0.8}
                      />
                    </div>
                  ) : user ? (
                    "Purchase"
                  ) : (
                    "Get Started"
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyCredit;
