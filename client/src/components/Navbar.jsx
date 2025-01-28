import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { RiAiGenerate2 } from "react-icons/ri";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Swal from "sweetalert2";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For user dropdown
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { user, setUser, setToken } = useContext(AppContext);
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

  const handleLogout = () => {
    setUser(false);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  const showCreditScorePopup = () => {
    Swal.fire({
      title: "Credit Score",
      text: "Your Credit is 750",
      icon: "success",
      background: "#141415", // Dark background
      color: "#fff", // White text
      confirmButtonColor: "#27272a", // Dark confirm button
      confirmButtonText: "Close",
      showCancelButton: true,
      cancelButtonText: "Buy Credit",
      cancelButtonColor: "#141415", // Blue cancel button
      customClass: {
        popup: "rounded-lg shadow-xl", // Rounded corners and shadow
      },
      
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        // Navigate to the "Buy Credit" page
        navigate("/buy");
      }
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
                <RiAiGenerate2 className="inline-block w-8 h-8 text-blue-400 animate-pulse cursor-pointer" />
              </Link>
            </div>

            {/* Brand Name */}
            <div className="flex-1 text-center">
              <h1 className="cursor-pointer text-white text-2xl font-semibold flex items-center justify-center gap-2">
                <span className="whitespace-nowrap">Canvas.ai</span>
              </h1>
            </div>

            {/* Hamburger Icon */}
            <div className="md:hidden flex items-center">
              <button
                className="cursor-pointer text-white text-2xl transition-transform"
                onClick={toggleMenu}
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <>
                  <button
                    onClick={showCreditScorePopup}
                    className="cursor-pointer text-white bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    Check Credit
                  </button>
                  <div
                    className="relative"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <button className="cursor-pointer text-white bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300">
                      <FaUserAlt />
                      {user.name || "User"}
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-zinc-900 text-white rounded-lg shadow-lg z-10">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-zinc-700 rounded-t-lg"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-white cursor-pointer bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="cursor-pointer md:hidden bg-zinc-900 text-white px-4 py-3 space-y-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-sm hover:underline"
            >
              Home
            </Link>
            {user ? (
              <>
                <button
                  onClick={() => {
                    showCreditScorePopup();
                    setMenuOpen(false);
                  }}
                  className="block text-sm hover:underline cursor-pointer"
                >
                  Check Credit
                </button>
                <button
                  onClick={handleLogout}
                  className="block text-sm hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setMenuOpen(false);
                }}
                className="block text-sm hover:underline cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        )}
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
