import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  TrendingUp,
  MessageCircle,
  Users,
  Smile,
  Activity,
  PlayCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const GetStart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 via-white to-indigo-50 text-gray-900 overflow-hidden relative">
      {/* Floating Gradient Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 opacity-20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-300 opacity-25 blur-3xl rounded-full animate-pulse"></div>

      {/* Hero Section */}
      <section className="text-center py-24 px-4 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
            <Heart className="h-10 w-10 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
        >
          Your Personal Health Companion
        </motion.h1>
        <h2 className="text-green-600">MindNest – a cozy place for your thoughts</h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed"
        >
          Track your health, express your emotions, and rejuvenate your mind
          with therapy, workouts, and a supportive community.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-110"
          >
            🚀 Get Started Free
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-gray-400 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-md transform transition-all duration-300 hover:scale-105"
          >
            🔑 Sign In
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-transparent w-full text-center relative">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">
          Everything You Need to Stay Healthy 🌿
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: <Users className="h-7 w-7 text-purple-600" />,
              title: "Share Your Thoughts",
              text: "Connect with a supportive community where you can express emotions freely and find encouragement.",
              color: "from-purple-100 to-indigo-50",
            },
            {
              icon: <Smile className="h-7 w-7 text-green-600" />,
              title: "Write Wellness Notes",
              text: "Write about your day according to your mood",
              color: "from-green-100 to-emerald-50",
            },
            {
              icon: <MessageCircle className="h-7 w-7 text-blue-500" />,
              title: "AI Health Assistant",
              text: "Chat with our intelligent assistant for quick stress-relief tips and health advice.",
              color: "from-blue-100 to-cyan-50",
            },
            {
              icon: <Activity className="h-7 w-7 text-pink-600" />,
              title: "Take Therapies",
              text: "Access guided therapy sessions and relaxation exercises to calm your mind and body.",
              color: "from-pink-100 to-rose-50",
            },
            {
              icon: <PlayCircle className="h-7 w-7 text-orange-500" />,
              title: "Workout Videos",
              text: "Stay fit with easy workout routines designed to boost both your mood and physical health.",
              color: "from-orange-100 to-amber-50",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl shadow-xl bg-gradient-to-br ${card.color} backdrop-blur-md hover:scale-105 transition-transform duration-300 border border-gray-100`}
            >
              <div className="flex justify-center mb-5">
                <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                  {card.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {card.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24 px-6 text-center w-full shadow-inner mt-10"
      >
        <h2 className="text-4xl font-extrabold mb-4">
          Ready to Take Control of Your Health?
        </h2>
        <p className="text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands on their journey to a healthier, happier lifestyle —
          track your progress, take therapies, and grow every day.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-indigo-700 px-10 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-110"
        >
          🌈 Start Your Journey Today
        </button>
      </motion.section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm bg-white/60 backdrop-blur-md w-full">
        © 2025{" "}
        <span className="font-semibold text-indigo-600">HealthMonitor</span> —{" "}
        Your health, your data, your control.
      </footer>
    </div>
  );
};

export default GetStart;
