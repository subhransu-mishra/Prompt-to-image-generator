import React from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const SignupModal = ({ isOpen, onClose, switchToLogin }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-gradient-to-b from-gray-900 to-black p-8 rounded-lg shadow-xl w-[90%] max-w-md border border-gray-800"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Signup Form */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center">
                Create Account
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 
                    focus:border-blue-500 focus:outline-none text-white placeholder:text-gray-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 
                    focus:border-blue-500 focus:outline-none text-white placeholder:text-gray-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 
                    focus:border-blue-500 focus:outline-none text-white placeholder:text-gray-500"
                    placeholder="Create a password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-gray-900 to-zinc-800 
                  hover:from-gray-800 hover:to-zinc-700 px-6 py-3 rounded-lg text-sm 
                  font-medium transition-all duration-300 border border-zinc-600 
                  hover:border-zinc-500 shadow-lg hover:shadow-zinc-700/50"
                >
                  Sign Up
                </button>
              </form>

              <div className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={switchToLogin}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignupModal;
