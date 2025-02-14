import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa6";
import ShinyText from "../ui/ShinyText";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo or Brand Name */}
          <div className="text-2xl font-bold">Canvas.ai</div>

          {/* Social Media Icons */}
          <div className="flex gap-6">
            <a
              href="https://github.com/subhransu-mishra"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-gray-700/50 group-hover:scale-110">
                <FaGithub className="w-5 h-5 text-white group-hover:text-white" />
              </div>
            </a>
            <a
              href="https://www.instagram.com/subhransumishra_/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-gray-700/50 group-hover:scale-110">
                <FaInstagram className="w-5 h-5 text-white group-hover:text-white" />
              </div>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-gray-700/50 group-hover:scale-110">
                <FaLinkedinIn className="w-5 h-5 text-white group-hover:text-white" />
              </div>
            </a>
          </div>

          {/* Divider */}
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
          <div className="text-sm text-gray-400">
            Developed by <span className="hover:text-gray-600 text-white"><Link to="https://subhransumishra.me/"><ShinyText text="Subhransu" disabled={false} speed={3} className='custom-class text-lg' /></Link></span>
          </div>
          {/* Copyright */}
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;