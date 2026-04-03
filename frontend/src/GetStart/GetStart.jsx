
// // // import React from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import {
// // //   Heart,
// // //   MessageCircle,
// // //   Users,
// // //   Smile,
// // //   Activity,
// // //   PlayCircle,
// // // } from "lucide-react";
// // // import { motion } from "framer-motion";

// // // const GetStart = () => {
// // //   const navigate = useNavigate();

// // //   return (
// // //     <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-100 via-white to-indigo-50 text-gray-900 overflow-hidden relative">
// // //       {/* Floating Gradient Circles */}
// // //       <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 opacity-20 blur-3xl rounded-full animate-pulse"></div>
// // //       <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-300 opacity-25 blur-3xl rounded-full animate-pulse"></div>

// // //       {/* Hero Section */}
// // //       <section className="text-center py-24 px-4 max-w-5xl relative z-10">
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 1 }}
// // //           className="flex justify-center mb-8"
// // //         >
// // //           <div className="h-20 w-20 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
// // //             <Heart className="h-10 w-10 text-white" />
// // //           </div>
// // //         </motion.div>

// // //         <motion.h1
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ delay: 0.3, duration: 0.8 }}
// // //           className="text-5xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent"
// // //         >
// // //           Your Personal Health Companion
// // //         </motion.h1>

// // //         <h2 className="text-green-600">
// // //           MindNest – a cozy place for your thoughts
// // //         </h2>

// // //         <motion.p
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ delay: 0.5, duration: 0.8 }}
// // //           className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed"
// // //         >
// // //           Track your health, express your emotions, and rejuvenate your mind
// // //           with therapy, workouts, and a supportive community.
// // //         </motion.p>

// // //         <motion.div
// // //           className="flex flex-col sm:flex-row justify-center gap-4"
// // //           initial={{ opacity: 0, scale: 0.95 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //           transition={{ delay: 0.7, duration: 0.6 }}
// // //         >
// // //           <button
// // //             onClick={() => navigate("/signup")}
// // //             className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-110"
// // //           >
// // //             🚀 Get Started Free
// // //           </button>
// // //           <button
// // //             onClick={() => navigate("/login")}
// // //             className="border border-gray-400 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 hover:shadow-md transform transition-all duration-300 hover:scale-105"
// // //           >
// // //             🔑 Sign In
// // //           </button>
// // //         </motion.div>
// // //       </section>

// // //       {/* Features Section (Column Layout) */}
// // //       <section className="py-20 px-6 bg-transparent w-full text-center relative">
// // //         <h2 className="text-4xl font-bold mb-12 text-gray-900">
// // //           Everything You Need to Stay Healthy 🌿
// // //         </h2>

// // //         <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full">
// // //           {[
// // //             {
// // //               icon: <Users className="h-7 w-7 text-purple-600" />,
// // //               title: "Share Your Thoughts",
// // //               text: "Connect with a supportive community where you can express emotions freely and find encouragement.",
// // //               color: "from-purple-100 to-indigo-50",
// // //             },
// // //             {
// // //               icon: <Smile className="h-7 w-7 text-green-600" />,
// // //               title: "Write Wellness Notes",
// // //               text: "Write about your day according to your mood.",
// // //               color: "from-green-100 to-emerald-50",
// // //             },
// // //             {
// // //               icon: <MessageCircle className="h-7 w-7 text-blue-500" />,
// // //               title: "AI Health Assistant",
// // //               text: "Chat with our intelligent assistant for quick stress-relief tips and health advice.",
// // //               color: "from-blue-100 to-cyan-50",
// // //             },
// // //             {
// // //               icon: <Activity className="h-7 w-7 text-pink-600" />,
// // //               title: "Take Therapies",
// // //               text: "Access guided therapy sessions and relaxation exercises to calm your mind and body.",
// // //               color: "from-pink-100 to-rose-50",
// // //             },
// // //             {
// // //               icon: <PlayCircle className="h-7 w-7 text-orange-500" />,
// // //               title: "Workout Videos",
// // //               text: "Stay fit with easy workout routines designed to boost both your mood and physical health.",
// // //               color: "from-orange-100 to-amber-50",
// // //             },
// // //           ].map((card, index) => (
// // //             <motion.div
// // //               key={index}
// // //               initial={{ opacity: 0, y: 40 }}
// // //               whileInView={{ opacity: 1, y: 0 }}
// // //               transition={{ delay: index * 0.2, duration: 0.8 }}
// // //               viewport={{ once: true }}
// // //               className={`p-8 rounded-3xl shadow-xl bg-gradient-to-br ${card.color} 
// // //                 backdrop-blur-md hover:scale-105 transition-transform duration-300 
// // //                 border border-gray-100 h-full`}
// // //             >
// // //               <div className="flex justify-center mb-5">
// // //                 <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center shadow-inner">
// // //                   {card.icon}
// // //                 </div>
// // //               </div>
// // //               <h3 className="text-xl font-semibold mb-2 text-gray-800">
// // //                 {card.title}
// // //               </h3>
// // //               <p className="text-gray-600 text-sm leading-relaxed">
// // //                 {card.text}
// // //               </p>
// // //             </motion.div>
// // //           ))}
// // //         </div>
// // //       </section>

// // //       {/* CTA Section */}
// // //       <motion.section
// // //         initial={{ opacity: 0, y: 30 }}
// // //         whileInView={{ opacity: 1, y: 0 }}
// // //         transition={{ duration: 0.8 }}
// // //         viewport={{ once: true }}
// // //         className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24 px-6 text-center w-full shadow-inner mt-10"
// // //       >
// // //         <h2 className="text-4xl font-extrabold mb-4">
// // //           Ready to Take Control of Your Health?
// // //         </h2>
// // //         <p className="text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
// // //           Join thousands on their journey to a healthier, happier lifestyle —
// // //           track your progress, take therapies, and grow every day.
// // //         </p>
// // //         <button
// // //           onClick={() => navigate("/signup")}
// // //           className="bg-white text-indigo-700 px-10 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-110"
// // //         >
// // //           🌈 Start Your Journey Today
// // //         </button>
// // //       </motion.section>

// // //       {/* Footer */}
// // //       <footer className="py-6 text-center text-gray-500 text-sm bg-white/60 backdrop-blur-md w-full">
// // //         © 2025{" "}
// // //         <span className="font-semibold text-indigo-600">HealthMonitor</span> —{" "}
// // //         Your health, your data, your control.
// // //       </footer>
// // //     </div>
// // //   );
// // // };

// // // export default GetStart;
// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Heart,
// //   MessageCircle,
// //   Users,
// //   Smile,
// //   Activity,
// //   PlayCircle,
// //   ArrowRight,
// //   CheckCircle2
// // } from "lucide-react";
// // import { motion } from "framer-motion";

// // const GetStart = () => {
// //   const navigate = useNavigate();

// //   const features = [
// //     {
// //       icon: <Users className="h-6 w-6 text-white" />,
// //       title: "Community Circle",
// //       text: "Connect with a supportive community. Share your journey freely and find encouragement.",
// //       bg: "bg-purple-500",
// //       border: "border-purple-200",
// //       shadow: "shadow-purple-500/20",
// //     },
// //     {
// //       icon: <Smile className="h-6 w-6 text-white" />,
// //       title: "Mood Journaling",
// //       text: "Track your emotional patterns. Write about your day according to your mood.",
// //       bg: "bg-emerald-500",
// //       border: "border-emerald-200",
// //       shadow: "shadow-emerald-500/20",
// //     },
// //     {
// //       icon: <MessageCircle className="h-6 w-6 text-white" />,
// //       title: "AI Health Assistant",
// //       text: "Chat with our intelligent AI for instant stress-relief tips and health guidance.",
// //       bg: "bg-blue-500",
// //       border: "border-blue-200",
// //       shadow: "shadow-blue-500/20",
// //     },
// //     {
// //       icon: <Activity className="h-6 w-6 text-white" />,
// //       title: "Therapy Sessions",
// //       text: "Access guided therapy and relaxation exercises to calm your mind.",
// //       bg: "bg-pink-500",
// //       border: "border-pink-200",
// //       shadow: "shadow-pink-500/20",
// //     },
// //     {
// //       icon: <PlayCircle className="h-6 w-6 text-white" />,
// //       title: "Curated Workouts",
// //       text: "Stay physically active with routines designed to boost mood and energy.",
// //       bg: "bg-orange-500",
// //       border: "border-orange-200",
// //       shadow: "shadow-orange-500/20",
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen flex flex-col items-center bg-[#F8FAFC] text-slate-800 overflow-hidden relative selection:bg-indigo-500 selection:text-white font-sans">
      
// //       {/* 🎨 Animated Background Mesh */}
// //       <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
// //         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-300/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
// //         <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-300/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDelay: '2s' }} />
// //         <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-300/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse" style={{ animationDelay: '4s' }} />
// //       </div>

// //       {/* Hero Section */}
// //       <section className="relative z-10 pt-32 pb-20 px-4 max-w-5xl text-center">
        
// //         {/* Floating Badge */}
// //         <motion.div
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8 }}
// //           className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 shadow-sm mb-8 backdrop-blur-md"
// //         >
// //           <span className="relative flex h-3 w-3">
// //             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
// //             <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
// //           </span>
// //           <span className="text-sm font-semibold text-slate-600 tracking-wide">#1 Mental Health Companion</span>
// //         </motion.div>

// //         {/* Main Title */}
// //         <motion.h1
// //           initial={{ opacity: 0, y: 30 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 0.2, duration: 0.8 }}
// //           className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
// //         >
// //           <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-indigo-800 to-slate-800">
// //             MindNest
// //           </span>
// //         </motion.h1>

// //         <motion.h2
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 0.4, duration: 0.8 }}
// //           className="text-2xl md:text-3xl font-medium text-slate-500 mb-8"
// //         >
// //           A cozy place for your <span className="text-indigo-600 font-bold decoration-wavy underline decoration-indigo-300 underline-offset-4">thoughts</span> & <span className="text-purple-600 font-bold decoration-wavy underline decoration-purple-300 underline-offset-4">healing</span>.
// //         </motion.h2>

// //         <motion.p
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 0.5, duration: 0.8 }}
// //           className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed"
// //         >
// //           Experience a holistic approach to wellness. Track your health, express emotions, 
// //           and rejuvenate with AI-driven insights and community support.
// //         </motion.p>

// //         {/* Action Buttons */}
// //         <motion.div
// //           className="flex flex-col sm:flex-row justify-center gap-5"
// //           initial={{ opacity: 0, scale: 0.9 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           transition={{ delay: 0.6, duration: 0.5 }}
// //         >
// //           <button
// //             onClick={() => navigate("/signup")}
// //             className="group relative px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:bg-indigo-700 transition-all transform hover:-translate-y-1 overflow-hidden"
// //           >
// //             <span className="relative z-10 flex items-center gap-2">
// //               Get Started Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
// //             </span>
// //             <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
// //           </button>
          
// //           <button
// //             onClick={() => navigate("/login")}
// //             className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold shadow-sm hover:shadow-md hover:border-indigo-200 hover:text-indigo-600 transition-all transform hover:-translate-y-1"
// //           >
// //             Existing Member? Sign In
// //           </button>
// //         </motion.div>
// //       </section>

// //       {/* Features Column Section */}
// //       <section className="relative z-10 w-full max-w-4xl px-6 pb-32">
// //         <motion.div 
// //           initial={{ opacity: 0 }} 
// //           whileInView={{ opacity: 1 }} 
// //           viewport={{ once: true }}
// //           className="text-center mb-16"
// //         >
// //           <h3 className="text-sm font-bold text-indigo-500 uppercase tracking-widest mb-3">Features</h3>
// //           <h2 className="text-4xl font-bold text-slate-800">Everything you need to thrive 🌿</h2>
// //         </motion.div>

// //         <div className="flex flex-col gap-6">
// //           {features.map((item, index) => (
// //             <motion.div
// //               key={index}
// //               initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
// //               whileInView={{ opacity: 1, x: 0 }}
// //               transition={{ duration: 0.6, delay: index * 0.1 }}
// //               viewport={{ once: true, margin: "-50px" }}
// //               whileHover={{ scale: 1.02 }}
// //               className="group relative bg-white/70 backdrop-blur-xl border border-white/60 p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all flex items-center gap-6"
// //             >
// //               {/* Icon Box */}
// //               <div className={`shrink-0 h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg ${item.bg} ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
// //                 {item.icon}
// //               </div>

// //               {/* Text Content */}
// //               <div className="flex-1">
// //                 <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
// //                   {item.title}
// //                 </h3>
// //                 <p className="text-slate-500 font-medium leading-relaxed">
// //                   {item.text}
// //                 </p>
// //               </div>

// //               {/* Checkmark Decoration */}
// //               <div className="hidden md:block text-slate-300 group-hover:text-indigo-500 transition-colors">
// //                 <CheckCircle2 size={24} />
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* Big CTA */}
// //       <motion.section
// //         initial={{ opacity: 0, scale: 0.95 }}
// //         whileInView={{ opacity: 1, scale: 1 }}
// //         viewport={{ once: true }}
// //         transition={{ duration: 0.8 }}
// //         className="relative z-10 w-full max-w-5xl px-6 mb-20"
// //       >
// //         <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
// //           {/* Background Glows inside CTA */}
// //           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/30 via-slate-900 to-slate-900" />
          
// //           <div className="relative z-10">
// //             <Heart className="h-16 w-16 text-rose-500 mx-auto mb-8 animate-pulse" fill="currentColor" />
// //             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
// //               Start prioritizing yourself.
// //             </h2>
// //             <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
// //               Join thousands who have found their safe space with MindNest. 
// //               It's free to start, and the benefits last a lifetime.
// //             </p>
// //             <button
// //               onClick={() => navigate("/signup")}
// //               className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
// //             >
// //               Create Free Account
// //             </button>
// //           </div>
// //         </div>
// //       </motion.section>

// //       {/* Footer */}
// //       <footer className="w-full py-8 text-center text-slate-400 text-sm relative z-10">
// //         <p>© 2025 <span className="text-indigo-600 font-bold">HealthMonitor</span>. All rights reserved.</p>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default GetStart;
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Heart,
//   MessageCircle,
//   Users,
//   Smile,
//   Activity,
//   PlayCircle,
//   ArrowRight,
//   CheckCircle2
// } from "lucide-react";
// import { motion } from "framer-motion";

// const GetStart = () => {
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: <Users className="h-6 w-6 text-white" />,
//       title: "Community Circle",
//       text: "Connect with a supportive community. Share your journey freely and find encouragement.",
//       bg: "bg-purple-500",
//       shadow: "shadow-purple-500/20",
//     },
//     {
//       icon: <Smile className="h-6 w-6 text-white" />,
//       title: "Mood Journaling",
//       text: "Track your emotional patterns. Write about your day according to your mood.",
//       bg: "bg-emerald-500",
//       shadow: "shadow-emerald-500/20",
//     },
//     {
//       icon: <MessageCircle className="h-6 w-6 text-white" />,
//       title: "AI Health Assistant",
//       text: "Chat with our intelligent AI for instant stress-relief tips and health guidance.",
//       bg: "bg-blue-500",
//       shadow: "shadow-blue-500/20",
//     },
//     {
//       icon: <Activity className="h-6 w-6 text-white" />,
//       title: "Therapy Sessions",
//       text: "Access guided therapy and relaxation exercises to calm your mind.",
//       bg: "bg-pink-500",
//       shadow: "shadow-pink-500/20",
//     },
//     {
//       icon: <PlayCircle className="h-6 w-6 text-white" />,
//       title: "Curated Workouts",
//       text: "Stay physically active with routines designed to boost mood and energy.",
//       bg: "bg-orange-500",
//       shadow: "shadow-orange-500/20",
//     },
//   ];

//   return (
//     <div className="relative min-h-screen text-slate-800 overflow-hidden font-sans">

//       {/* 🌄 Background Image */}
//       <div
//         className="fixed inset-0 z-0 bg-cover bg-center"
//         style={{
//   backgroundImage: `url("https://cdn.pixabay.com/photo/2021/04/06/12/31/monk-6113501_1280.png")`
// }}

//       />

//       {/* 🌫 Dark + Gradient Overlay */}
//       <div className="fixed inset-0 z-0 bg-gradient-to-br from-white/90 via-white/80 to-indigo-100/70 backdrop-blur-[2px]" />

//       {/* 🎨 Animated Background Mesh (kept from your design) */}
//       <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-300/30 rounded-full blur-[120px] animate-pulse" />
//         <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-300/30 rounded-full blur-[120px] animate-pulse delay-2000" />
//         <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-300/30 rounded-full blur-[120px] animate-pulse delay-4000" />
//       </div>

//       {/* ================= HERO ================= */}
//       <section className="relative z-10 pt-32 pb-20 px-4 max-w-5xl mx-auto text-center">

//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border shadow mb-8 backdrop-blur-md"
//         >
//           <span className="relative flex h-3 w-3">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
//           </span>
//           <span className="text-sm font-semibold text-slate-600">
//             #1 Mental Health Companion
//           </span>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
//         >
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-indigo-800 to-slate-800">
//             MindNest
//           </span>
//         </motion.h1>

//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-2xl md:text-3xl font-medium text-slate-500 mb-8"
//         >
//           A cozy place for your{" "}
//           <span className="text-indigo-600 font-bold">thoughts</span> &{" "}
//           <span className="text-purple-600 font-bold">healing</span>.
//         </motion.h2>

//         <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
//           Experience a holistic approach to wellness. Track your health,
//           express emotions, and rejuvenate with AI-driven insights.
//         </p>

//         <div className="flex flex-col sm:flex-row justify-center gap-5">
//           <button
//             onClick={() => navigate("/signup")}
//             className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl hover:bg-indigo-700 transition"
//           >
//             Get Started Free <ArrowRight className="inline ml-2" size={18} />
//           </button>

//           <button
//             onClick={() => navigate("/login")}
//             className="px-8 py-4 bg-white text-slate-700 border rounded-2xl font-bold hover:text-indigo-600 transition"
//           >
//             Existing Member? Sign In
//           </button>
//         </div>
//       </section>

//       {/* ================= FEATURES ================= */}
//       <section className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-32">
//         <div className="flex flex-col gap-6">
//           {features.map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-lg flex gap-6"
//             >
//               <div className={`h-16 w-16 rounded-2xl flex items-center justify-center ${item.bg} ${item.shadow}`}>
//                 {item.icon}
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold mb-2">{item.title}</h3>
//                 <p className="text-slate-500">{item.text}</p>
//               </div>
//               <CheckCircle2 className="ml-auto text-indigo-400 hidden md:block" />
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* ================= CTA ================= */}
//       <section className="relative z-10 max-w-5xl mx-auto px-6 mb-20">
//         <div className="bg-slate-900 rounded-[3rem] p-16 text-center shadow-2xl">
//           <Heart className="h-16 w-16 text-rose-500 mx-auto mb-8 animate-pulse" />
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Start prioritizing yourself.
//           </h2>
//           <p className="text-slate-400 text-lg mb-10">
//             Join thousands who found their safe space with MindNest.
//           </p>
//           <button
//             onClick={() => navigate("/signup")}
//             className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold hover:bg-indigo-50 transition"
//           >
//             Create Free Account
//           </button>
//         </div>
//       </section>

//       <footer className="relative z-10 py-8 text-center text-slate-400 text-sm">
//         © 2025 <span className="text-indigo-600 font-bold">HealthMonitor</span>
//       </footer>
//     </div>
//   );
// };

// export default GetStart;
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { motion } from "framer-motion";

/* ─── shared token helpers ─────────────────────────────────────────────────── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const slideIn = (i) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay: i * 0.08 },
});

/* ─── feature card data ─────────────────────────────────────────────────────── */
const CARDS = [
  {
    id: "wellness",
    icon: "📝",
    iconBg: "#f0fdf4", iconColor: "#16a34a",
    title: "Wellness Notes",
    desc: "Reflect on your emotions and document your soul's journey.",
    actions: [
      { label: "😊 Good",  bg: "#f0fdf4", color: "#16a34a" },
      { label: "😔 Low",   bg: "#fff1f2", color: "#e11d48" },
    ],
    span: 1,
  },
  {
    id: "therapy",
    icon: "🧠",
    iconBg: "#f5f3ff", iconColor: "#7c3aed",
    title: "Mind Therapy",
    desc: "Soothing frequencies and guided meditation for mental clarity.",
    actions: [{ label: "Enter Therapy Room", bg: "#f5f3ff", color: "#7c3aed" }],
    span: 1,
  },
  {
    id: "hub",
    icon: "⚡",
    iconBg: "#fff7ed", iconColor: "#ea580c",
    title: "Quick Hub",
    desc: "Access your metrics and relaxation minigames instantly.",
    actions: [
      { label: "🎮 Games",   bg: "#f8fafc", color: "#475569" },
      { label: "📊 Reports", bg: "#eff6ff", color: "#2563eb" },
    ],
    span: 1,
  },
  {
    id: "fitness",
    icon: "🏃",
    iconBg: "#fdf2f8", iconColor: "#be185d",
    title: "Fitness",
    desc: "Curated physical activities to strengthen both body and mind.",
    actions: [{ label: "Start Session", bg: "#fff1f2", color: "#be185d" }],
    span: 1,
  },
  {
    id: "ai",
    icon: "💬",
    iconBg: "#eff6ff", iconColor: "#2563eb",
    title: "AI Wellness Guide",
    desc: "Your personal AI companion for instant support and guidance.",
    actions: [{ label: "Start Chatting", bg: "#334155", color: "#fff" }],
    span: 1,
  },
  {
    id: "community",
    icon: "👥",
    iconBg: "#f0fdfa", iconColor: "#0f766e",
    title: "Community Circle",
    desc: "A safe haven to share and connect with fellow travelers.",
    actions: [{ label: "Explore Community", bg: "#f0fdfa", color: "#0f766e" }],
    span: 1,
  },
  {
    id: "mri",
    icon: "🔬",
    iconBg: "#fff1f2", iconColor: "#e11d48",
    title: "Brain Tumor Screening",
    desc: "Upload an MRI scan for AI-powered neurological screening. Awareness is the first step to care.",
    tag: "⚕️ Medical",
    actions: [{ label: "🧬 Upload MRI Scan", bg: "#9f1239", color: "#fff" }],
    disclaimer: "⚠️ For awareness only — not a medical diagnosis",
    span: 2,
    accent: { bg: "#fff9f5", border: "#fed7aa" },
  },
  {
    id: "engage",
    icon: "🎯",
    iconBg: "#fff7ed", iconColor: "#ea580c",
    title: "Engagement & Accountability",
    desc: "Track SMART goals, log daily gratitude, and monitor medication adherence — all in one place.",
    actions: [
      { label: "🎯 Goals",      bg: "#f0fdf4", color: "#16a34a" },
      { label: "✨ Gratitude",  bg: "#fff7ed", color: "#ea580c" },
      { label: "💊 Meds",       bg: "#fff1f2", color: "#be185d" },
    ],
    span: 2,
  },
];

/* ─── sub-components ────────────────────────────────────────────────────────── */
const CardBtn = ({ label, bg, color }) => (
  <button
    style={{
      padding: "8px 14px",
      borderRadius: 8,
      background: bg,
      color,
      border: "none",
      cursor: "pointer",
      fontFamily: "'Sora', sans-serif",
      fontSize: 12,
      fontWeight: 600,
    }}
  >
    {label}
  </button>
);

const FeatureCard = ({ card, index }) => (
  <motion.div
    {...slideIn(index)}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    style={{
      gridColumn: card.span === 2 ? "span 2" : "span 1",
      background: card.accent?.bg ?? "#ffffff",
      border: `1px solid ${card.accent?.border ?? "#efefef"}`,
      borderRadius: 18,
      padding: "22px 20px",
      cursor: "default",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {card.tag && (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          padding: "3px 10px",
          borderRadius: 999,
          fontSize: 11,
          fontWeight: 500,
          background: "#fff7ed",
          color: "#c2410c",
          marginBottom: 10,
          width: "fit-content",
          fontFamily: "'Sora', sans-serif",
        }}
      >
        {card.tag}
      </span>
    )}

    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
      <div
        style={{
          width: 44, height: 44, borderRadius: 12,
          background: card.iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, flexShrink: 0,
        }}
      >
        {card.icon}
      </div>
      <span
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 15, fontWeight: 600, color: "#1a1a1a",
        }}
      >
        {card.title}
      </span>
    </div>

    <p style={{ fontSize: 13, color: "#888", lineHeight: 1.65, marginBottom: 16, flex: 1 }}>
      {card.desc}
    </p>

    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      {card.actions.map((a) => (
        <CardBtn key={a.label} {...a} />
      ))}
      {card.disclaimer && (
        <span style={{ fontSize: 12, color: "#aaa", marginLeft: 4 }}>
          {card.disclaimer}
        </span>
      )}
    </div>
  </motion.div>
);

/* ─── main page ─────────────────────────────────────────────────────────────── */
const GetStart = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#faf8f5",
        fontFamily: "'DM Sans', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Google Font import — add to index.html for production */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          padding: "100px 24px 72px",
          textAlign: "center",
          background: "linear-gradient(160deg, #fff9f5 0%, #faf8f5 60%, #f0eefb 100%)",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        {[
          { top: -80, left: -80, color: "#fed7aa55" },
          { bottom: -60, right: -60, color: "#c7d2fe55" },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 300, height: 300, borderRadius: "50%",
              background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
              pointerEvents: "none",
              ...b,
            }}
          />
        ))}

        {/* Live badge */}
        <motion.div {...fade(0)} style={{ marginBottom: 28 }}>
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 16px", borderRadius: 999,
              background: "#fff", border: "1px solid #f0ebe4",
              fontSize: 12, fontWeight: 600, color: "#555",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            <span
              style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#22c55e", display: "inline-block",
              }}
            />
            #1 Mental Health Companion
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fade(0.15)}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "clamp(52px, 12vw, 84px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            color: "#1a1a1a",
            marginBottom: 10,
          }}
        >
          Mind
          <span
            style={{
              background: "linear-gradient(135deg, #f97316, #f59e0b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Nest
          </span>
        </motion.h1>

        <motion.p
          {...fade(0.25)}
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 18, fontWeight: 300, color: "#888",
            marginBottom: 16, letterSpacing: "-0.01em",
          }}
        >
          A cozy place for your{" "}
          <strong style={{ color: "#6366f1", fontWeight: 700 }}>thoughts</strong> &{" "}
          <strong style={{ color: "#a855f7", fontWeight: 700 }}>healing</strong>.
        </motion.p>

        <motion.p
          {...fade(0.35)}
          style={{
            fontSize: 15, color: "#777",
            maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.75,
          }}
        >
          Experience a holistic approach to wellness. Track your health, express
          emotions, and rejuvenate with AI-driven insights and community support.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fade(0.45)}
          style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
        >
          <button
            onClick={() => navigate("/signup")}
            style={{
              padding: "13px 28px", borderRadius: 12,
              background: "#f97316", color: "#fff", border: "none",
              fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14,
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
            }}
          >
            Get Started Free <ArrowRight size={16} />
          </button>

          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "13px 28px", borderRadius: 12,
              background: "#fff", color: "#555",
              border: "1px solid #e8e8e8",
              fontFamily: "'Sora', sans-serif", fontWeight: 500, fontSize: 14,
              cursor: "pointer",
            }}
          >
            Existing Member? Sign In
          </button>
        </motion.div>
      </section>

      {/* ── FEATURE CARDS ────────────────────────────────────────────────── */}
      <section style={{ padding: "48px 20px", maxWidth: 860, margin: "0 auto" }}>
        <p
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 11, fontWeight: 600,
            letterSpacing: "0.12em", color: "#f97316",
            textTransform: "uppercase", marginBottom: 8,
          }}
        >
          What's inside
        </p>
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 26, fontWeight: 700,
            color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: 24,
          }}
        >
          Everything you need to thrive 🌿
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 14,
          }}
        >
          {CARDS.map((card, i) => (
            <FeatureCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ margin: "0 20px 48px", position: "relative" }}
      >
        <div
          style={{
            background: "#1a1a1a",
            borderRadius: 24,
            padding: "52px 32px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute", top: -60, left: "50%",
              transform: "translateX(-50%)",
              width: 300, height: 200, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(249,115,22,0.18), transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <Heart
            size={40}
            fill="#f97316"
            color="#f97316"
            style={{ margin: "0 auto 20px", display: "block" }}
          />

          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 28, fontWeight: 700, color: "#fff",
              marginBottom: 12, letterSpacing: "-0.02em",
            }}
          >
            Start prioritizing yourself.
          </h2>

          <p style={{ fontSize: 14, color: "#888", marginBottom: 28, lineHeight: 1.75 }}>
            Join thousands who found their safe space with MindNest.
            <br />
            It's free to start, and the benefits last a lifetime.
          </p>

          <button
            onClick={() => navigate("/signup")}
            style={{
              padding: "14px 32px", borderRadius: 12,
              background: "#f97316", color: "#fff", border: "none",
              fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14,
              cursor: "pointer",
            }}
          >
            Create Free Account
          </button>
        </div>
      </motion.section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          padding: "24px",
          textAlign: "center",
          fontSize: 12,
          color: "#bbb",
          fontFamily: "'Sora', sans-serif",
        }}
      >
        © 2025{" "}
        <span style={{ color: "#f97316", fontWeight: 600 }}>MindNest</span>
        {" "}— Your health, your data, your control.
      </footer>
    </div>
  );
};

export default GetStart;