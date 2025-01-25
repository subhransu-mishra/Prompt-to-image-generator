import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { RiAiGenerate2 } from "react-icons/ri";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
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

  const switchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const switchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const showCreditScore = () => {
    Swal.fire({
      title: "Your Credits",
      html: `
        <div class="space-y-6 p-4">
          <div class="flex flex-col items-center gap-2">
            <div class="text-4xl font-bold text-blue-500">150</div>
            <div class="text-gray-400 text-sm">Available Credits</div>
          </div>
          
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Total Credits</span>
              <span class="font-semibold">200</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-400">Used Credits</span>
              <span class="font-semibold">50</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div class="bg-blue-500 h-2.5 rounded-full" style="width: 75%"></div>
            </div>
          </div>

          <button 
            class="w-full bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 
            text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 
            border border-zinc-600 hover:border-zinc-500 shadow-lg hover:shadow-zinc-700/50"
            onclick="window.location.href='/buy'"
          >
            Buy More Credits
          </button>
        </div>
      `,
      showConfirmButton: false,
      background: "#1a1a1a",
      color: "#fff",
      customClass: {
        popup: "rounded-xl border border-gray-800",
        htmlContainer: "space-y-4",
      },
      didOpen: () => {
        // Add click handler for the buy credits button
        const buyButton = Swal.getPopup().querySelector("button");
        buyButton.addEventListener("click", () => {
          Swal.close();
          navigate("/buy");
        });
      },
    });
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
                  <button
                    onClick={showCreditScore}
                    className="text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    Your Credit Score
                  </button>
                  <button className="text-white bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2">
                    <FaUserAlt />
                    User
                  </button>
                </>
              )}
              {!user && (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-white bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu with Animation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                className="backdrop-blur-md w-full py-4 px-6"
              >
                <ul className="space-y-4 flex flex-col items-center">
                  <li>
                    <Link
                      to="/"
                      className="block text-lg text-white hover:text-gray-400"
                    >
                      Home
                    </Link>
                  </li>

                  {/* Horizontal Line */}
                  <hr className="w-full border-t border-gray-700 my-2" />

                  {user && (
                    <>
                      <motion.li
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="w-full"
                      >
                        <button
                          onClick={showCreditScore}
                          className="w-full text-center text-lg text-white py-2 rounded-lg transition-all duration-300"
                        >
                          Available Credit Score
                        </button>
                      </motion.li>
                      <motion.li
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-full"
                      >
                        <button className="w-full text-center text-lg text-white hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300">
                          <FaUserAlt />
                          User
                        </button>
                      </motion.li>
                    </>
                  )}
                  {!user && (
                    <motion.li
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="w-full"
                    >
                      <button
                        onClick={() => setIsLoginModalOpen(true)}
                        className="w-full text-center text-lg text-blue-400 font-semibold px-4 py-2 transition-all duration-300"
                      >
                        Login
                      </button>
                    </motion.li>
                  )}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Add both modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        switchToSignup={switchToSignup}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        switchToLogin={switchToLogin}
      />
    </div>
  );
};

export default Navbar;
