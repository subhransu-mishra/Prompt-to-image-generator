import React from "react";
import { useNavigate } from "react-router-dom";
import { RiAiGenerate2 } from "react-icons/ri";
import { motion } from "framer-motion";
import "../styles/Hero.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      className="mt-16 w-full min-h-screen bg-cover bg-center bg-fixed text-white py-16 lg:px-0 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-pulse-slow"></div>

      <div className="relative z-10 p-8 rounded-lg min-h-[calc(100vh-8rem)] flex items-center">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold leading-tight m-3"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Transform Text Into Stunning
            <motion.span
              className="text-blue-400 m-2"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              AI
            </motion.span>
            Images
          </motion.h1>

          <motion.p
            className="text-lg mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            Discover the magic of AI-powered creativity! Type your thoughts and
            watch them turn into captivating visuals instantly.
          </motion.p>

          <motion.button
            onClick={() => navigate("/result")}
            className="mt-6 px-10 py-3 rounded-lg text-lg font-medium bg-gradient-to-r from-gray-900 to-zinc-800 text-white border border-zinc-600 shadow-lg flex items-center gap-2 mx-auto"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#3b82f6",
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Try Now <RiAiGenerate2 className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
