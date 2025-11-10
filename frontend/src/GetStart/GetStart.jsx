
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Heart, TrendingUp, MessageCircle } from "lucide-react";

// const GetStart = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white text-gray-900">
//       {/* Hero Section */}
//       <section className="text-center py-20 px-4 max-w-4xl">
//         <div className="flex justify-center mb-6">
//           <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
//             <Heart className="h-8 w-8 text-white" />
//           </div>
//         </div>

//         <h1 className="text-4xl md:text-6xl font-bold mb-4">
//           Your Personal Health Companion
//         </h1>
//         <p className="text-lg md:text-xl text-gray-600 mb-8">
//           Track your health metrics, visualize trends, and get personalized
//           insights with our intelligent health monitoring system.
//         </p>

//         <div className="flex flex-col sm:flex-row justify-center gap-4">
//           <button
//             onClick={() => navigate("/signup")}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transform transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
//           >
//             🚀 Get Started Free
//           </button>
//           <button
//             onClick={() => navigate("/login")}
//             className="border border-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100"
//           >
//             🔑 Sign In
//           </button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-16 px-6 bg-white w-full text-center">
//         <h2 className="text-3xl font-bold mb-12">
//           Everything You Need to Stay Healthy
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//           {/* Card 1 */}
//           <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <div className="flex justify-center mb-4">
//               <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
//                 <Heart className="h-6 w-6 text-blue-500" />
//               </div>
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Track Vital Metrics</h3>
//             <p className="text-gray-600">
//               Monitor weight, blood pressure, glucose levels, heart rate, and
//               more — all in one place.
//             </p>
//           </div>

//           {/* Card 2 */}
//           <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <div className="flex justify-center mb-4">
//               <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
//                 <TrendingUp className="h-6 w-6 text-green-500" />
//               </div>
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Visualize Trends</h3>
//             <p className="text-gray-600">
//               Beautiful charts and graphs help you understand your health
//               patterns and progress over time.
//             </p>
//           </div>

//           {/* Card 3 */}
//           <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
//             <div className="flex justify-center mb-4">
//               <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
//                 <MessageCircle className="h-6 w-6 text-purple-500" />
//               </div>
//             </div>
//             <h3 className="text-xl font-semibold mb-2">Health Assistant</h3>
//             <p className="text-gray-600">
//               Get instant health tips and answers from our smart chatbot
//               assistant.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-6 text-center w-full">
//         <h2 className="text-3xl font-bold mb-4">
//           Ready to Take Control of Your Health?
//         </h2>
//         <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
//           Join thousands of users who are already tracking their health and
//           making better decisions every day.
//         </p>
//         <button
//           onClick={() => navigate("/signup")}
//           className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform transition-transform duration-300 hover:scale-110"
//         >
//           🌿 Start Your Journey Today
//         </button>
//       </section>

//       {/* Footer */}
//       <footer className="py-6 text-center text-gray-500 text-sm">
//         © 2025 HealthMonitor — Your health, your data, your control.
//       </footer>
//     </div>
//   );
// };

// export default GetStart;
import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, TrendingUp, MessageCircle, Users, Smile } from "lucide-react";
import { motion } from "framer-motion";

const GetStart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 via-white to-indigo-50 text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 max-w-5xl relative">
        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-200 opacity-40 -z-10"></div>

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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed"
        >
          Track your health, share your feelings, and connect with others — a complete system for both physical and emotional wellness.
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
        <div className="absolute inset-0 blur-2xl bg-gradient-to-b from-transparent via-blue-50 to-white opacity-70 -z-10"></div>
        <h2 className="text-4xl font-bold mb-12 text-gray-900">
          Everything You Need to Stay Healthy 🌿
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Users className="h-7 w-7 text-purple-600" />,
              title: "Share Your Thoughts with the Community",
              text: "Express how you feel, support others, and connect with people who share similar goals in our open wellness community.",
              color: "from-purple-100 to-indigo-50",
            },
            {
              icon: <Smile className="h-7 w-7 text-green-600" />,
              title: "Track Mood Metrics",
              text: "Log your emotions daily, view monthly mood trends, and reflect on your mental wellness journey with easy-to-read graphs.",
              color: "from-green-100 to-emerald-50",
            },
            {
              icon: <MessageCircle className="h-7 w-7 text-blue-500" />,
              title: "AI Health Assistant",
              text: "Chat with your intelligent assistant for instant health advice, stress relief tips, and personalized recommendations.",
              color: "from-blue-100 to-cyan-50",
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
              <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.text}</p>
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
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20 px-6 text-center w-full shadow-inner"
      >
        <h2 className="text-4xl font-extrabold mb-4">Ready to Take Control of Your Health?</h2>
        <p className="text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of users building a healthier, happier lifestyle — track, reflect, and grow every single day.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-110"
        >
          🌈 Start Your Journey Today
        </button>
      </motion.section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm bg-white/60 backdrop-blur-md w-full">
        © 2025 <span className="font-semibold text-indigo-600">HealthMonitor</span> — Your health, your data, your control.
      </footer>
    </div>
  );
};

export default GetStart;
