import React from "react";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const BuyCredit = () => {
  const plans = [
    {
      name: "Starter",
      credits: "50",
      price: "4.99",
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select the perfect credit package for your creative needs. All plans
            include access to our cutting-edge AI image generation technology.
          </p>
        </div>

        {/* Cards Container */}
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
                  <span className="text-lg text-gray-400 font-normal">
                    /month
                  </span>
                </div>
                <div className="text-blue-400 font-semibold">
                  {plan.credits} Credits
                </div>

                {/* Features List */}
                <ul className="space-y-3 py-6">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <FaCheck className="text-blue-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Buy Button */}
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 
                  ${
                    plan.recommended
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gradient-to-r from-gray-800 to-zinc-900 hover:from-gray-700 hover:to-zinc-800 text-white border border-gray-700"
                  }`}
                >
                  Get Started
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
