import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiAiGenerate } from "react-icons/ri";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Swal from "sweetalert2";
import { AppContext } from "../context/AppContext";
import { FiLogOut } from "react-icons/fi";
import { CiMenuFries } from "react-icons/ci";
import { CgClose, CgLogIn } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { FaViacoin } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { user, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // New state for logout modal


  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const showCreditScorePopup = () => {
    Swal.fire({
      showCancelButton: true,
      cancelButtonText: "Okay",
      
      title: `Available Credit Score: ${credit}`,
      text: "Buy more credits to get the best results",
      icon: "success",
      background: "#141415",
      color: "#fff",
      confirmButtonColor: "#27272a",
      confirmButtonText: "Buy Credits", // Add the icon here
      customClass: {
        confirmButton: "swal2-custom-confirm-button",
      },
    }).then((result) => {
      if (result.isConfirmed) navigate("/buy");
      if (result.isDismissed) setMenuOpen(false);
    });
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true); // Open the logout confirmation modal
  };
  const confirmLogout = () => {
    logout(); // Perform logout operation
    setIsLogoutModalOpen(false); // Close the modal
  };

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-md bg-opacity-50" : "bg-primary"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo2.png"
              alt="Logo"
              className="lg:w-12 lg:h-12 w-8 h-8 animate-pulse"
            />
            <h1 className="text-white text-2xl font-semibold">Canvas.ai</h1>
          </Link>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white text-3xl focus:outline-none"
            >
              {menuOpen ? <CgClose /> : <CiMenuFries />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <button
                  className="text-white flex justify-center items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={showCreditScorePopup}
                >
                  <FaViacoin className="text-lg text-blue-400" />
                  Check Credits Score
                </button>
                <button
                  className="flex items-center gap-2 text-red-500 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={handleLogout}
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
        {isLogoutModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-lg font-semibold text-white">Confirm Logout</h2>
            <p className="text-gray-400 mt-2">Are you sure you want to logout?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
                onClick={() => setIsLogoutModalOpen(false)} // Close modal
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
                onClick={confirmLogout} // Confirm logout
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Mobile Menu */}
        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-zinc-900 text-white flex flex-col items-start space-y-2 py-4 border-t border-gray-700"
            >
              <Link
                to="/result"
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-800 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <RiAiGenerate className="text-lg text-blue-400" /> Generate Image
              </Link>
              {user ? (
                <>
                  <button
                    onClick={() => {
                      showCreditScorePopup();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-800 transition-colors"
                  >
                    <FaViacoin className="text-lg text-blue-400" /> Check Credit
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-gray-800 transition-colors"
                  >
                    <FiLogOut className="text-lg" /> Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-800 transition-colors"
                >
                  <CgLogIn className="text-lg" /> Login
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        switchToSignup={() => {
          setIsLoginModalOpen(false);
          setIsSignupModalOpen(true);
        }}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        switchToLogin={() => {
          setIsSignupModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
    </div>
  );
};

export default Navbar;
