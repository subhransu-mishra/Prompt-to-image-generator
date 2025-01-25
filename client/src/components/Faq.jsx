import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const Faq = () => {
  const faqs = [
    {
      question: "What is Canvas.ai?",
      answer:
        "Canvas.ai is an AI-powered image generation platform that transforms text descriptions into stunning visual content using advanced artificial intelligence algorithms.",
    },
    {
      question: "How does the image generation work?",
      answer:
        "Simply type your description in the text box, and our AI will analyze your input to generate unique images that match your description. The process typically takes a few seconds.",
    },
    {
      question: "Can I use the generated images commercially?",
      answer:
        "Yes, all images generated through Canvas.ai are royalty-free and can be used for both personal and commercial purposes. You own full rights to the images you generate.",
    },
    {
      question: "What image formats are supported?",
      answer:
        "Generated images are available in high-quality PNG format. We also support JPEG downloads and can provide different resolution options based on your needs.",
    },
    {
      question: "Is there a limit to how many images I can generate?",
      answer:
        "Free accounts can generate up to 5 images per day. Premium subscribers enjoy unlimited generations and priority processing.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-primary py-20 bg-cover bg-center bg-fixed" style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
      }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Find answers to common questions about Canvas.ai
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-gray-900 to-black rounded-lg border border-gray-800"
            >
              {/* Question Button */}
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left text-white hover:text-blue-400 transition-colors duration-300"
                onClick={() => toggleQuestion(index)}
              >
                <span className="font-medium">{faq.question}</span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeIndex === index ? (
                    <FiMinus className="w-5 h-5" />
                  ) : (
                    <FiPlus className="w-5 h-5" />
                  )}
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-400">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
