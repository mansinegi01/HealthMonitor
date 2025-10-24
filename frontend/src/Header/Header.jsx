import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-indigo-500 to-cyan-500 p-4 shadow-lg z-50 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
          alt="logo"
          className="w-10 h-10"
        />
        <h1 className="text-white text-xl font-bold">Health Monitor</h1>
      </div>

      {/* Hamburger Icon (always visible on small screens) */}
      <div
        className="flex flex-col justify-between w-8 h-6 cursor-pointer md:hidden"
        onClick={toggleMenu}
      >
        <span
          className={`h-1 w-full bg-white rounded transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2.5" : ""
          }`}
        ></span>
        <span
          className={`h-1 w-full bg-white rounded transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`h-1 w-full bg-white rounded transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2.5" : ""
          }`}
        ></span>
      </div>

      {/* Horizontal Menu (hidden on small screens) */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isOpen ? "auto" : 0 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="absolute top-0 right-0 h-full bg-gray-900 text-white flex items-center gap-6 overflow-hidden px-4 md:flex"
      >
        <Link to="/home" onClick={toggleMenu} className="hover:text-yellow-300">
          Home
        </Link>
        <Link to="/about" onClick={toggleMenu} className="hover:text-yellow-300">
          About
        </Link>
        <Link to="/contact" onClick={toggleMenu} className="hover:text-yellow-300">
          Contact
        </Link>
        <Link to="/login" onClick={toggleMenu} className="hover:text-yellow-300">
          Login
        </Link>
        <Link to="/signup" onClick={toggleMenu} className="hover:text-yellow-300">
          Signup
        </Link>
      </motion.div>
    </header>
  );
}

export default Header;
