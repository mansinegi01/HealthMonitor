import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import two from '../assets/two.jpg'
import three from '../assets/three.jpg'
function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.status === 200) navigate('/home',{ state : {user : data.user}});
      else alert(data.message || "Invalid credentials");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden text-white">
      
      {/* 🌠 Floating / traveling images */}
       {/* ✨ Animated Background Images */}
          <motion.img
            src={two}
            alt="Planet"
            className="absolute w-40 h-40 opacity-50 top-50 left-10"
            animate={{ x: [0,300, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
    
          <motion.img
            src={three}
            alt="Road"
            className="absolute w-52 h-52 opacity-40 bottom-10 right-10 rounded-full"
            animate={{ x: [0, -300, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

      {/* 🔷 Glowing blur background shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>

      {/* 🌙 Login Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-10 w-11/12 md:w-1/2 lg:w-1/3"
      >
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-6 tracking-wide">
          Welcome Back 💫
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-gray-300">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={user.email}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={user.password}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-lg transition-all duration-300"
        >
          Login
        </button>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <Link to="#" className="hover:text-blue-400">
            Forgot Password?
          </Link>
          <p>
            Don’t have an account?
            <Link to="/signup" className="text-blue-400 hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
}

export default Login;
