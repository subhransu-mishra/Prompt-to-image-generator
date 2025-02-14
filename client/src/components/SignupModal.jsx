import React, { useContext } from "react";
import { FaTimes, FaEyeSlash, FaEye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import StarBorder from "../ui/StarBorder";
import TrueFocus from "../ui/TrueFocus";

const SignupModal = ({ isOpen, onClose, switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, setUser, backendUrl } = useContext(AppContext);
  const [passwordShow, setPasswordShow] = useState(false);

  const onSubmitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });
      const data = response.data;

      console.log("Response Data:", data);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        onClose();
        toast.success("Account created successfully");
      } else {
        toast.error(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-gradient-to-b from-gray-900 to-black p-8 rounded-lg shadow-xl w-[90%] max-w-md border border-gray-800"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white text-center gap-2">
                Create Account in <TrueFocus
                    sentence="Canvas AI"
                    manualMode={false}
                    blurAmount={5}
                    borderColor="cyan"
                    animationDuration={1}
                    pauseBetweenAnimations={1}
                    
                  />
              </h2>

              <form className="space-y-4" onSubmit={onSubmitHandler}>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
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
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 
                    focus:border-blue-500 focus:outline-none text-white placeholder:text-gray-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={passwordShow ? "text" : "password"}
                    className="w-full px-4 py-3 pr-10 bg-gray-800/50 rounded-lg border border-gray-700 
    focus:border-blue-500 focus:outline-none text-white placeholder:text-gray-500"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="absolute right-4 top-[60%] transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {passwordShow ? (
                      <FaEyeSlash className="w-5 h-5" />
                    ) : (
                      <FaEye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <StarBorder as="div" className="flex justify-center" color="cyan" speed="5s">
                  <motion.button
                    type="submit"
                    className="rounded-lg text-lg font-medium flex items-center gap-2 mx-auto text-white transition-colors"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Sign Up"}
                  </motion.button>
                </StarBorder>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignupModal;


