import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { RiAiGenerate2 } from "react-icons/ri";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-primary py-3 ${
          isScrolled ? "backdrop-blur-md shadow-lg" : "bg-secondary"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
              <RiAiGenerate2 className="inline-block w-8 h-8 text-blue-400 animate-pulse" />
              </Link>
            </div>

            {/* Brand Name (Visible on all devices) */}
            <div className="flex-1 text-center">
              <h1 className="text-white text-2xl font-semibold flex items-center justify-center gap-2">
                <span className="whitespace-nowrap">Canvas.ai</span>
              </h1>
            </div>

            {/* Hamburger Icon (Visible only on mobile) */}
            <div className="md:hidden flex items-center">
              <button
                className="text-white text-2xl transition-transform"
                onClick={toggleMenu}
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Buttons (Hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-3">
              {user && (
                <>
                  <button className="text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                    Your Credit Score
                  </button>
                  <button className="text-white bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2">
                    <FaUserAlt />
                    User
                  </button>
                </>
              )}
              {!user && (
                <button className="text-white bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu (Visible when menuOpen is true) */}
        {menuOpen && (
          <div className="md:hidden backdrop-blur-md w-full py-4 px-6">
            <ul className="space-y-4 flex flex-col items-center">
              <li>
                <Link
                  to="/"
                  className="block text-lg text-white hover:text-gray-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/docs"
                  className="block text-lg text-white hover:text-gray-400"
                >
                  Docs
                </Link>
              </li>
              {user && (
                <>
                  <li className="w-full">
                    <button className="w-full text-center text-lg text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-all duration-300">
                      Your Credit Score
                    </button>
                  </li>
                  <li className="w-full">
                    <button className="w-full text-center text-lg text-white bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300">
                      <FaUserAlt />
                      User
                    </button>
                  </li>
                </>
              )}
              {!user && (
                <li className="w-full">
                  <button className="w-full text-center text-lg text-white bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg transition-all duration-300">
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
