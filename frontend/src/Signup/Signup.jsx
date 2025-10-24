import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import two from '../assets/two.jpg'
import three from '../assets/three.jpg'

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log("Signup successful:", data);
      if (response.status === 201) navigate("/login");
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden">
      
      {/* ✨ Animated Background Images */}
      <motion.img
        src={two}
        alt="Planet"
        className="absolute w-40 h-40 opacity-50 top-50 left-10"
        animate={{ x: [0,345, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      <motion.img
        src={three}
        alt="Road"
        className="absolute w-52 h-52 opacity-40 bottom-10 right-10 rounded-full"
        animate={{ x: [0, -300, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

     
      {/* 🌌 Signup Form Card */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-10 rounded-3xl shadow-lg bg-white/10 backdrop-blur-md border border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account 🌟
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-400/50"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-400/50"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-400/50"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Sign Up
        </motion.button>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default Signup;
