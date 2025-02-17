import React, { useContext, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { RingLoader } from "react-spinners";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import StarBorder from "../ui/StarBorder";

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

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [earnedCredits, setEarnedCredits] = useState(0);
  const { width, height } = useWindowSize();
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: 'Credits Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razor`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            const purchasedPlan = plans.find(
              (plan) => plan.credits === data.transaction?.credits
            );
            setEarnedCredits(purchasedPlan?.credits || 0);
            setShowCongrats(true);
            await loadCreditsData();
            setTimeout(() => {
              setShowCongrats(false);
              navigate("/dashboard");
            }, 5000);
            toast.success("Credit Added Successfully!");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || error.message);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async () => {
    setShowPaymentPopup(false);
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }

      setLoadingPlan(selectedPlan);
      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razor`,
        { planId: selectedPlan },
        { headers: { token } }
      );

      if (data.success && data.order) {
        initPay(data.order);
      } else {
        toast.error("Failed to initiate payment.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment initiation failed");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-24 px-4">
      {showCongrats && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-80">
          <Confetti width={width} height={height} />
          <div className="text-center bg-gradient-to-b from-green-400 to-blue-600 text-white p-10 rounded-xl shadow-xl">
            <h2 className="text-4xl font-bold mb-4">🎉 Congratulations! 🎉</h2>
            <p className="text-xl mb-2">
              You've successfully purchased credits.
            </p>
            <p className="text-2xl font-semibold">
              You received {earnedCredits} credits! 🚀
            </p>
          </div>
        </div>
      )}

      {showPaymentPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gradient-to-b from-gray-900 to-black p-6 rounded-lg shadow-lg text-center max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              We only accept credit cards or international debit cards . We are facing some technical issues on other payment methods. 
            </h3>
            <button
              className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={paymentRazorpay}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Select the perfect credit package for your creative needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
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
            <h3 className="text-xl font-bold text-white">{plan.name}</h3>
            <div className="text-3xl font-bold text-white mb-4">
              ${plan.price}
            </div>
            <ul className="text-gray-400 text-sm mb-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 mb-2">
                  <FaCheck className="text-green-400" /> {feature}
                </li>
              ))}
            </ul>
            
            <StarBorder
              as="div"
              className="custom-class"
              color="cyan"
              speed="5s"
            >
              <motion.button
                onClick={() => {
                  setShowPaymentPopup(true);
                  setSelectedPlan(plan.id);
                }}
                className="w-full rounded-lg font-medium transition-all duration-300  text-white"
                disabled={loadingPlan === plan.id || verifyingPayment}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {loadingPlan === plan.id ? (
                  <RingLoader color="#ffffff" size={24} />
                ) : (
                  "Purchase"
                )}
              </motion.button>
            </StarBorder>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BuyCredit;  