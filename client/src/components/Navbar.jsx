import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { RiAiGenerate } from "react-icons/ri";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Swal from "sweetalert2";
import { AppContext } from "../context/AppContext";
import { FiLogOut } from "react-icons/fi";
import { CiCoinInsert, CiMenuFries } from "react-icons/ci";
import { CgClose, CgLogIn } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { user, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => { 
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const showCreditScorePopup = () => {
    Swal.fire({
      title: `Credit Score: ${credit}`,
      text: "Buy more credits to get the best results",
      icon: "success",
      background: "#141415",
      color: "#fff",
      confirmButtonColor: "#27272a",
      showCancelButton: true,
      cancelButtonColor: "#141415",
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) navigate("/buy");
    });
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
                  className="text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={showCreditScorePopup}
                >
                  Credit: {credit}
                </button>
                <button
                  className="text-red-500 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  onClick={logout}
                >
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-zinc-900 text-white flex flex-col items-center space-y-4 py-4"
            >
              <Link
                to="/result"
                className="hover:text-gray-400 flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <RiAiGenerate className="text-lg" /> Generate Image
              </Link>
              {user ? (
                <>
                  <button
                    onClick={() => {
                      showCreditScorePopup();
                      setMenuOpen(false);
                    }}
                    className="hover:text-gray-400 flex items-center gap-2"
                  >
                    <CiCoinInsert className="text-lg" /> Check Credit
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="text-red-500 flex items-center gap-2"
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
                  className="hover:text-gray-400 flex items-center gap-2"
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