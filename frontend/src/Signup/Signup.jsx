import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/yoga-4849681_1280.jpg"; 

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
      if (response.status === 201) navigate("/question");
      else if (response.status === 409) navigate("/login");
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen overflow-hidden text-gray-900"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 🌤️ Light Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-blue-50/70 to-indigo-50/60 backdrop-blur-sm"></div>

      {/* ✨ Soft Gradient Blurs */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-blue-300 rounded-full blur-[140px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-300 rounded-full blur-[140px] opacity-40 animate-pulse"></div>

      {/* 🪷 Signup Form Card */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-10 rounded-3xl shadow-2xl bg-white/95 backdrop-blur-md border border-gray-200"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6 tracking-wide">
          Create Account 🌸
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Join <span className="font-semibold text-indigo-600">HealthMonitor</span> and begin your journey to wellness.
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 shadow-sm"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 shadow-sm"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400/50 shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
        >
          Sign Up
        </motion.button>

        {/* Login Redirect */}
        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default Signup;
