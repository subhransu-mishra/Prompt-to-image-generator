import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, isUser] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
              isScrolled ? "bg-primary backdrop-blur-md" : "bg-secondary"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Link to="/">
                    <img
                      className="h-8 w-auto"
                      src="/logo_icon.svg" // Add your logo file in the public folder
                      alt="Logo"
                    />
                  </Link>
                </div>

                {/* Centered Heading - Hidden on mobile, visible on medium screens and up */}
                <div className="hidden md:block flex-1 text-center">
                  <h1 className="text-white text-xl font-semibold">
                    Your Brand Name
                  </h1>
                </div>

                {/* Login Button */}
                <div className="flex items-center space-x-3">
                  <button className="text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300  hover:border-zinc-500 shadow-md hover:shadow-zinc-700/50">
                    Your Credit Score
                  </button>
                  <button className="text-white bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-zinc-600 hover:border-zinc-500 shadow-lg hover:shadow-zinc-700/50 flex justify-center items-center gap-2">
                    <FaUserAlt />
                    User
                  </button>
                </div>

                {/* Mobile Heading - Visible only on mobile, positioned below the navbar */}
                <div className="md:hidden absolute top-16 left-0 w-full bg-inherit py-2">
                  <h1 className="text-white text-lg font-semibold text-center">
                    Your Brand Name
                  </h1>
                </div>
              </div>
            </div>
          </nav>
        </div>
      ) : (
        <div>
          <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
              isScrolled ? "bg-primary backdrop-blur-md" : "bg-secondary"
            }`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <Link to="/">
                    <img
                      className="h-8 w-auto"
                      src="/logo_icon.svg" // Add your logo file in the public folder
                      alt="Logo"
                    />
                  </Link>
                </div>

                {/* Centered Heading - Hidden on mobile, visible on medium screens and up */}
                <div className="hidden md:block flex-1 text-center">
                  <h1 className="text-white text-xl font-semibold">
                    Your Brand Name
                  </h1>
                </div>

                {/* Login Button */}
                <div>
                  <button className="text-white bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border border-zinc-600 hover:border-zinc-500 shadow-lg hover:shadow-zinc-700/50">
                    Login
                  </button>
                </div>

                {/* Mobile Heading - Visible only on mobile, positioned below the navbar */}
                <div className="md:hidden absolute top-16 left-0 w-full bg-inherit py-2">
                  <h1 className="text-white text-lg font-semibold text-center">
                    Your Brand Name
                  </h1>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
