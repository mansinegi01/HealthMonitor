// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// function Signup() {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:8000/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user),
//       });

//       const data = await response.json();
//       if (response.status === 201) navigate("/question");
//       else if (response.status === 409) navigate("/login");
//     } catch (error) {
//       console.log("Signup error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-10 font-sans selection:bg-blue-500 selection:text-white">
//       {/* 🌌 Background Glows */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
//         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
//       </div>

//       <div 
//         className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-[32px] shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/10"
//         style={{ perspective: "1200px" }}
//       >
        
//         {/* --- LEFT SIDE: DECORATIVE / MOTIVATIONAL --- */}
//         <motion.div 
//           initial={{ opacity: 0, x: -50, rotateY: 15 }}
//           animate={{ opacity: 1, x: 0, rotateY: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="relative hidden lg:flex flex-col justify-center items-center p-16 bg-gradient-to-tl from-indigo-900/40 to-black overflow-hidden border-r border-white/5"
//         >
//           {/* 3D Orbitals */}
//           <div className="absolute w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_40s_linear_infinite]" />
//           <div className="absolute w-[350px] h-[350px] border border-white/10 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
          
//           <div className="relative z-10 text-center">
//             <motion.div
//               animate={{ y: [0, -20, 0] }}
//               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//             >
//               <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
//                 Your New Chapter
//               </span>
//               <h3 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-indigo-500 leading-tight mb-6">
//                 Redefine <br /> Yourself.
//               </h3>
//               <p className="text-xl text-gray-400 font-light max-w-sm mx-auto leading-relaxed">
//                 "The secret of getting ahead is getting started."
//               </p>
//             </motion.div>
//           </div>

//           {/* Floating UI element */}
//           <motion.div 
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.5, duration: 1 }}
//             className="absolute top-12 left-12 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl"
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
//               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Live Wellness Sync</span>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* --- RIGHT SIDE: SIGNUP FORM --- */}
//         <motion.div 
//           initial={{ opacity: 0, x: 50, rotateY: -15 }}
//           animate={{ opacity: 1, x: 0, rotateY: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           className="bg-[#0f0f13]/95 backdrop-blur-3xl p-8 md:p-16 flex flex-col justify-center z-10"
//         >
//           <div className="mb-8">
//             <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
//               Create Account
//             </h2>
//             <p className="text-gray-400">Join a community dedicated to mental clarity.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="group">
//               <label className="block text-sm font-medium text-gray-500 mb-2 group-focus-within:text-blue-400 transition-colors">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 required
//                 value={user.name}
//                 onChange={handleChange}
//                 placeholder="Enter your name"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all shadow-inner"
//               />
//             </div>

//             <div className="group">
//               <label className="block text-sm font-medium text-gray-500 mb-2 group-focus-within:text-indigo-400 transition-colors">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 value={user.email}
//                 onChange={handleChange}
//                 placeholder="name@example.com"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all shadow-inner"
//               />
//             </div>

//             <div className="group">
//               <label className="block text-sm font-medium text-gray-500 mb-2 group-focus-within:text-purple-400 transition-colors">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 required
//                 value={user.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all shadow-inner"
//               />
//             </div>

//             <div className="pt-4">
//               <motion.button
//                 whileHover={{ scale: 1.02, translateY: -2 }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl shadow-[0_10px_30px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-2"
//               >
//                 Get Started
//               </motion.button>
//             </div>
//           </form>

//           <p className="mt-8 text-center text-gray-500 text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-white hover:text-blue-400 font-semibold underline underline-offset-4 decoration-blue-500 transition-colors">
//               Sign In
//             </Link>
//           </p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default Signup;
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* 🐵 Cute Growth Buddy - Celebrates signup progress */
function GrowthBuddy({ step }) {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const eyesContainerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!eyesContainerRef.current) return;

      const rect = eyesContainerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const maxDistance = 150;
      const scale = Math.min(1, distance / maxDistance);

      const angle = Math.atan2(dy, dx);
      const moveAmount = 3.5;

      const x = Math.cos(angle) * moveAmount * scale;
      const y = Math.sin(angle) * moveAmount * scale;

      setEyePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="flex justify-center mb-8"
    >
      <div className="relative w-32 h-32">
        {/* HEAD */}
        <div className="relative w-32 h-32 mx-auto bg-gradient-to-b from-[#a0644e] to-[#7c4a2d] rounded-full shadow-2xl flex items-center justify-center border-4 border-[#5a2e1a]/20 drop-shadow-lg">
          
          {/* EARS */}
          <div className="absolute -left-6 top-6 w-10 h-10 bg-gradient-to-b from-[#a0644e] to-[#7c4a2d] rounded-full shadow-lg border-2 border-[#5a2e1a]/20">
            <div className="absolute inset-2.5 bg-[#eac8a3] rounded-full shadow-inner" />
          </div>
          <div className="absolute -right-6 top-6 w-10 h-10 bg-gradient-to-b from-[#a0644e] to-[#7c4a2d] rounded-full shadow-lg border-2 border-[#5a2e1a]/20">
            <div className="absolute inset-2.5 bg-[#eac8a3] rounded-full shadow-inner" />
          </div>

          {/* FACE */}
          <div
            ref={eyesContainerRef}
            className="relative w-20 h-20 bg-[#eac8a3] rounded-full flex flex-col items-center pt-3 shadow-inner border-2 border-[#d4b89f]/40"
          >
            {/* EYES */}
            <div className="flex gap-3.5">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="relative w-5 h-5 bg-white rounded-full overflow-hidden shadow-md"
                >
                  {/* Iris & Pupil */}
                  <div
                    className="absolute w-3.5 h-3.5 bg-[#8b6f47] rounded-full flex items-center justify-center transition-all duration-75 ease-out"
                    style={{
                      transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
                      left: "50%",
                      top: "50%",
                      marginLeft: "-7px",
                      marginTop: "-7px"
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-white rounded-full opacity-80" />
                  </div>
                </div>
              ))}
            </div>

            {/* SMILE - Changes with step */}
            <motion.div
              animate={{ scaleX: 1 + step * 0.2 }}
              className="mt-3 w-7 h-3 border-b-[2.5px] border-[#5a2e1a] rounded-full"
            />

            {/* PROGRESSION INDICATOR - Stars for each step */}
            <div className="absolute -bottom-8 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ scale: i < step ? 1 : 0.6, opacity: i < step ? 1 : 0.3 }}
                  className="text-sm"
                >
                  {i < step ? "⭐" : "☆"}
                </motion.span>
              ))}
            </div>
          </div>

          {/* HANDS - Waving */}
          <motion.div
            animate={{ rotate: [0, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute z-30 w-9 h-9 bg-gradient-to-b from-[#a0644e] to-[#7c4a2d] rounded-2xl shadow-lg border border-[#5a2e1a]/20 -left-8"
          />
          <motion.div
            animate={{ rotate: [0, -20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="absolute z-30 w-9 h-9 bg-gradient-to-b from-[#a0644e] to-[#7c4a2d] rounded-2xl shadow-lg border border-[#5a2e1a]/20 -right-8"
          />
        </div>

        {/* BODY */}
        <div className="absolute top-[110px] left-1/2 -translate-x-1/2 w-12 h-5 bg-gradient-to-b from-[#a0644e] to-[#7c4a2d] rounded-b-3xl shadow-lg border-b-2 border-[#5a2e1a]/20" />
      </div>
    </motion.div>
  );
}

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setError("");

    // Update progress as user fills fields
    let steps = 1;
    if (value && name === "name") steps = Math.max(steps, 2);
    if (user.email && name === "email") steps = Math.max(steps, 2);
    if (user.password && name === "password") steps = Math.max(steps, 3);
    if (user.name && user.email && value && name === "password") steps = 3;
    setCurrentStep(steps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.status === 201) {
        setCurrentStep(3);
        setTimeout(() => navigate("/question"), 800);
      } else if (response.status === 409) {
        setError("Email already exists. Please login or use a different email.");
      } else {
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.log("Signup error:", error);
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fef7f1] via-[#faf7f3] to-[#f5ede5] flex items-center justify-center p-4 md:p-6 overflow-x-hidden pt-20 md:pt-12">
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-200/20 to-transparent rounded-full blur-3xl -z-10" />

      {/* Main Signup Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md md:max-w-lg"
      >
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 via-transparent to-purple-200/30 rounded-3xl blur-2xl" />

        {/* Main Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-white/80 backdrop-blur-sm overflow-hidden">
          
          {/* Top decoration */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-300/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-blue-300/20 to-transparent rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10">
            
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center mb-8"
            >
              {/* Logo Badge */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg cursor-pointer transform transition-all"
              >
                <span className="text-3xl">🌱</span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-3 bg-gradient-to-r from-gray-900 via-orange-700 to-gray-800 bg-clip-text text-transparent">
                Start Your Journey
              </h1>
              <p className="text-center text-gray-600 text-sm font-medium">
                Join thousands nurturing their mental wellness
              </p>
            </motion.div>

            {/* Growth Buddy */}
            <GrowthBuddy step={currentStep} />

            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex gap-2 mb-8 justify-center"
            >
              {[1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  animate={{
                    width: currentStep >= step ? 40 : 20,
                    backgroundColor: currentStep >= step ? "#fb923c" : "#e5e7eb"
                  }}
                  className="h-1.5 rounded-full transition-all"
                />
              ))}
            </motion.div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-bold text-gray-800 mb-2.5">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="relative w-full px-5 py-3.5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md font-medium"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
                    👤
                  </span>
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="block text-sm font-bold text-gray-800 mb-2.5">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={user.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="relative w-full px-5 py-3.5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md font-medium"
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xl">
                    ✉️
                  </span>
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-bold text-gray-800 mb-2.5">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={user.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="relative w-full px-5 py-3.5 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-xl hover:scale-110 transition-transform"
                  >
                    {showPassword ? "👁️" : "🔐"}
                  </button>
                </div>
              </motion.div>

              {/* Password Strength Indicator */}
              {user.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-xs font-semibold"
                >
                  <div className={`flex-1 h-1.5 rounded-full transition-colors ${
                    user.password.length >= 8 
                      ? "bg-green-400" 
                      : user.password.length >= 5 
                      ? "bg-yellow-400" 
                      : "bg-red-400"
                  }`} />
                  <span className={
                    user.password.length >= 8 
                      ? "text-green-600" 
                      : user.password.length >= 5 
                      ? "text-yellow-600" 
                      : "text-red-600"
                  }>
                    {user.password.length >= 8 ? "Strong" : user.password.length >= 5 ? "Medium" : "Weak"}
                  </span>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-red-50 border-2 border-red-200 text-red-700 text-sm font-bold flex items-center gap-3 backdrop-blur-sm"
                >
                  <span className="text-xl">⚠️</span>
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Sign Up Button */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(251, 146, 60, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="relative w-full mt-6 bg-gradient-to-r from-orange-400 via-orange-500 to-red-400 hover:from-orange-500 hover:via-orange-600 hover:to-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group overflow-hidden"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Create Account</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="my-6 flex items-center gap-4"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <span className="text-xs text-gray-400 font-bold px-2">OR</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </motion.div>

            {/* Sign In Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-gray-700 font-medium"
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text hover:from-orange-600 hover:to-red-600 transition-all underline decoration-2 underline-offset-2"
              >
                Sign In
              </Link>
            </motion.p>

            {/* Quote Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-100 backdrop-blur-sm group hover:shadow-lg transition-shadow"
            >
              <p className="text-center text-gray-700 font-bold text-sm leading-relaxed">
                🌱 <span className="text-orange-600">Growth starts with a single step.</span> Welcome!
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Security Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-xs mt-6 font-semibold tracking-wide"
        >
          🔒 Secure signup • 🛡️ Your data is protected • ❤️ Privacy first
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Signup;