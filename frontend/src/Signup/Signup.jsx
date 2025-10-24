import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

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
      if (response.status === 201) {
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-blue-100 to-cyan-100 overflow-hidden">

      {/* Floating animated icons */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
        alt="decor"
        className="absolute w-14 top-10 left-20 opacity-70"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/888/888859.png"
        alt="decor"
        className="absolute w-16 bottom-10 right-20 opacity-70"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
        alt="decor"
        className="absolute w-12 top-1/3 right-10 opacity-70"
        animate={{ x: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />

      {/* Glassmorphic Signup Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-11/12 md:w-1/2 lg:w-1/3"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create Account ✨
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={user.name}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={user.email}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-sm text-gray-500 mt-1">
            We'll never share your email with anyone else.
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={user.password}
            onChange={handleChange}
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-lg transition-all duration-300"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm text-gray-700">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:underline ml-1">
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
}

export default Signup;
