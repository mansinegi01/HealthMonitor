// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate, Link } from "react-router-dom";


// function Header() {
//   const navigate = useNavigate(0)
//   return (
//     <div className="flex flex-col justify-center ">


//       <div className="flex justify-evenly h-1/6 w-full border-b border-gray-700">
//         <ul className="nav">

//           <div className="flex p-2 items-center gap-7 ">
//             <Link to="/home" className="link">Home</Link>
//           </div>
//         </ul>
//         <ul className="flex justify-end gap-2 m-1">
//             <div className="border-l-2 border-gray-600 h-4 mt-1.5"></div>
//             <Link to="/login" className="link">Login</Link>
//             <div className="border-l-2 border-gray-600 h-4 mt-1.5"></div>
//             <Link to="/signup" className="link">Singup</Link>
//         </ul>
//       </div>

      


//     </div>
//   );
// }

// export default Header;
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 shadow-lg backdrop-blur-md z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Brand / Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/home")}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
            alt="logo"
            className="w-10 h-10 drop-shadow-md"
          />
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Health Monitor<span className="text-yellow-300"></span>
          </h1>
        </motion.div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/home"
              className="text-white font-medium hover:text-yellow-300 transition-all duration-300"
            >
              Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/about"
              className="text-white font-medium hover:text-yellow-300 transition-all duration-300"
            >
              About
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }}>
            <Link
              to="/contact"
              className="text-white font-medium hover:text-yellow-300 transition-all duration-300"
            >
              Contact
            </Link>
          </motion.div>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-blue-600 bg-white rounded-full shadow-md hover:bg-yellow-300 hover:text-gray-800 transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 text-sm font-semibold text-white border border-white rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300"
          >
            Signup
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;
