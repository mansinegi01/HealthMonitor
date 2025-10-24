
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function GetStart() {
  const navigate = useNavigate();

  return (
    <div className="relative">
     
      {/* Body / Hero Section */}
      <main className="">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen flex flex-col justify-center items-center">
          <h2 className="text-5xl font-bold mb-6 text-center">
            Welcome to Health Monitor
          </h2>
          <p className="text-lg mb-8 text-center max-w-xl">
            Track your health, monitor your progress, and stay motivated with our
            all-in-one health tracking platform.
          </p>
          <Link
            to="/signup"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-white transition-all duration-300"
          >
            Get Started
          </Link>

          {/* Floating shapes for motion */}
          <motion.div
            className="absolute w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-30 top-10 left-10 animate-pulse"
            animate={{ x: [0, 200, 0], y: [0, 100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          ></motion.div>
          <motion.div
            className="absolute w-72 h-72 bg-purple-600 rounded-full blur-[120px] opacity-30 bottom-10 right-10 animate-pulse"
            animate={{ x: [0, -200, 0], y: [0, -100, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          ></motion.div>
        </section>

        {/* Features / Content Section */}
        <section className="py-20 bg-gray-100 text-gray-800">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4">Track Fitness</h3>
              <p>Monitor your workouts and see your progress over time.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4">Health Metrics</h3>
              <p>Keep track of your vital health stats in one place.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-4">Stay Motivated</h3>
              <p>Get insights and reminders to stay on top of your health goals.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default GetStart;
