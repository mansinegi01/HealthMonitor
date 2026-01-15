import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.status === 201) navigate("/question");
      else if (response.status === 409) navigate("/login");
    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-10 font-sans selection:bg-blue-500 selection:text-white">
      {/* 🌌 Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <div 
        className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[32px] shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/10"
        style={{ perspective: "1200px" }}
      >
        
        {/* --- LEFT SIDE: DECORATIVE / MOTIVATIONAL --- */}
        <motion.div 
          initial={{ opacity: 0, x: -50, rotateY: 15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative hidden lg:flex flex-col justify-center items-center p-16 bg-gradient-to-tl from-indigo-900/40 to-black overflow-hidden border-r border-white/5"
        >
          {/* 3D Orbitals */}
          <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_40s_linear_infinite]" />
          <div className="absolute w-[350px] h-[350px] border border-white/10 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
          
          <div className="relative z-10 text-center">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
                Your New Chapter
              </span>
              <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-500 leading-tight mb-6">
                Redefine <br /> Yourself.
              </h3>
              <p className="text-xl text-gray-400 font-light max-w-sm mx-auto leading-relaxed">
                "The secret of getting ahead is getting started."
              </p>
            </motion.div>
          </div>

          {/* Floating UI element */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute top-12 left-12 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Live Wellness Sync</span>
            </div>
          </motion.div>
        </motion.div>

        {/* --- RIGHT SIDE: SIGNUP FORM --- */}
        <motion.div 
          initial={{ opacity: 0, x: 50, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-[#0f0f13]/95 backdrop-blur-3xl p-8 md:p-16 flex flex-col justify-center z-10"
        >
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
              Create Account
            </h2>
            <p className="text-gray-400">Join a community dedicated to mental clarity.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label className="block text-sm font-medium text-gray-500 mb-2 group-focus-within:text-blue-400 transition-colors">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={user.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-inner"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-500 mb-2 group-focus-within:text-indigo-400 transition-colors">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={user.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all shadow-inner"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-500 mb-2 group-focus-within:text-purple-400 transition-colors">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={user.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all shadow-inner"
              />
            </div>

            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-[0_10px_30px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-2"
              >
                Get Started
              </motion.button>
            </div>
          </form>

          <p className="mt-8 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:text-blue-400 font-semibold underline underline-offset-4 decoration-blue-500 transition-colors">
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
