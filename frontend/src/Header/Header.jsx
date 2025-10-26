  import React, { useState } from "react";
  import { motion } from "framer-motion";
  import { Link } from "react-router-dom";
  import { User } from "lucide-react"; // simple, clean profile icon

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

        {/* Right Side: Profile + Hamburger */}
        <div className="flex items-center gap-5 z-50">
          {/* Profile Icon */}
          <Link
            to="/profile"
            className="text-white hover:text-yellow-300 transition-transform transform hover:scale-110"
          >
            <User size={26} />
          </Link>

          {/* Hamburger Icon (always visible) */}
          <div
            className="flex flex-col justify-between w-8 h-6 cursor-pointer"
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
        </div>

        {/* Slide-Out Menu */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? 0 : "100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed top-0 right-0 h-screen w-40 sm:w-52 bg-gray-900 text-white flex flex-col items-center justify-center gap-5 shadow-2xl"
        >
          <Link to="/home" onClick={toggleMenu} className="hover:text-yellow-300 text-base">
            Home
          </Link>
          <Link to="/about" onClick={toggleMenu} className="hover:text-yellow-300 text-base">
            About
          </Link>
          <Link to="/contact" onClick={toggleMenu} className="hover:text-yellow-300 text-base">
            Contact
          </Link>
          <Link to="/login" onClick={toggleMenu} className="hover:text-yellow-300 text-base">
            Login
          </Link>
          <Link to="/signup" onClick={toggleMenu} className="hover:text-yellow-300 text-base">
            Signup
          </Link>
        </motion.div>
      </header>
    );
  }

  export default Header;
