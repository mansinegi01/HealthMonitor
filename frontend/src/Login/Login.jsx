
// // import React, { useState, useContext, useEffect } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import { AuthContext } from "../Context/AuthContext";

// // /* 🧸 Cartoon Buddy Component - Upgraded for Realism */
// // function CartoonBuddy({ coverEyes }) {
// //   const [eyePos, setEyePos] = useState({ x: 0, y: 0 });

// //    useEffect(() => {
// //     if (coverEyes) return;

// //     const handleMouseMove = (e) => {
// //       const x = (e.clientX / window.innerWidth - 0.5) * 6;
// //       const y = (e.clientY / window.innerHeight - 0.5) * 6;
// //       setEyePos({ x, y });
// //     };

// //     window.addEventListener("mousemove", handleMouseMove);
// //     return () => window.removeEventListener("mousemove", handleMouseMove);
// //   }, [coverEyes]);


// //   return (
// //     <div className="relative flex justify-center mb-10 mt-4 scale-110">
// //       <div className="relative w-32 h-32">
        
// //         {/* HEAD */}
// //         <div className="relative w-28 h-28 mx-auto bg-[#7c4a2d] rounded-full shadow-2xl flex items-center justify-center">
          
// //           {/* EARS */}
// //           <div className="absolute -left-5 top-8 w-9 h-9 bg-[#7c4a2d] rounded-full">
// //             <div className="absolute inset-1.5 bg-[#eac8a3] rounded-full shadow-inner" />
// //           </div>
// //           <div className="absolute -right-5 top-8 w-9 h-9 bg-[#7c4a2d] rounded-full">
// //             <div className="absolute inset-1.5 bg-[#eac8a3] rounded-full shadow-inner" />
// //           </div>

// //           {/* FACE AREA */}
// //           <div className="relative w-20 h-20 bg-[#eac8a3] rounded-full overflow-hidden flex flex-col items-center pt-4">
            
// //             {/* EYES CONTAINER */}
// //             <div className="flex gap-4">
// //               {[1, 2].map((_, i) => (
// //                 <div key={i} className="relative w-6 h-6 bg-white rounded-full overflow-hidden border border-[#5a2e1a]/20 shadow-inner">
// //                   {/* EYELID (Closes when covering eyes) */}
// //                   <div 
// //                     className={`absolute inset-0 bg-[#eac8a3] z-20 transition-transform duration-300 origin-top ${coverEyes ? 'scale-y-100' : 'scale-y-0'}`}
// //                   />
                  
// //                   {/* REALISTIC EYE (Iris + Pupil + Reflection) */}
// //                   <div 
// //                     className="absolute w-4 h-4 bg-[#4e2c1c] rounded-full transition-transform duration-75 flex items-center justify-center"
// //                     style={{
// //                       transform: coverEyes 
// //                         ? "translate(0, 0)" 
// //                         : `translate(${eyePos.x}px, ${eyePos.y}px)`
// //                     }}
// //                   >
// //                     {/* Pupil */}
// //                     <div className="w-2 h-2 bg-black rounded-full" />
// //                     {/* Reflection Sparkle */}
// //                     <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-70" />
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* SMILE */}
// //             <div className={`mt-5 w-8 h-4 border-b-[3px] border-[#5a2e1a] rounded-full transition-all ${coverEyes ? 'opacity-40' : 'opacity-100'}`} />
// //           </div>

// //           {/* HANDS (Logic updated to cover eyes precisely) */}
// //           <motion.div
// //             className="absolute z-30 w-10 h-10 bg-[#7c4a2d] rounded-2xl border-t-2 border-[#5a2e1a]/10 shadow-lg"
// //             animate={{
// //               left: coverEyes ? "18px" : "-10px",
// //               top: coverEyes ? "24px" : "80px",
// //               rotate: coverEyes ? 35 : 0,
// //               opacity: coverEyes ? 1 : 0.3
// //             }}
// //             transition={{ type: "spring", stiffness: 200, damping: 20 }}
// //           />
// //           <motion.div
// //             className="absolute z-30 w-10 h-10 bg-[#7c4a2d] rounded-2xl border-t-2 border-[#5a2e1a]/10 shadow-lg"
// //             animate={{
// //               right: coverEyes ? "18px" : "-10px",
// //               top: coverEyes ? "24px" : "80px",
// //               rotate: coverEyes ? -35 : 0,
// //               opacity: coverEyes ? 1 : 0.3
// //             }}
// //             transition={{ type: "spring", stiffness: 200, damping: 20 }}
// //           />
// //         </div>

// //         {/* BODY (Small base) */}
// //         <div className="absolute top-[104px] left-1/2 -translate-x-1/2 w-14 h-8 bg-[#7c4a2d] rounded-b-full shadow-lg" />
// //       </div>
// //     </div>
// //   );
// // }

// // function Login() {
// //   const [formData, setFormData] = useState({ email: "", password: "" });
// //   const [coverEyes, setCoverEyes] = useState(false);
// //   const navigate = useNavigate();
// //   const { setUser, setToken } = useContext(AuthContext);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await fetch("http://localhost:8000/api/login", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         credentials: "include",
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await response.json();
// //       if (response.status === 200) {
// //         setUser(data.user);
// //         setToken(data.token);
// //         navigate("/home");
// //       } else {
// //         alert(data.message || "Invalid credentials");
// //       }
// //     } catch (error) {
// //       console.log("Login error:", error);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-10 font-sans selection:bg-indigo-500 selection:text-white">
// //       {/* Background glow */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //         <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
// //         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
// //       </div>

// //       <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" style={{ perspective: "1200px" }}>
// //         {/* LEFT SIDE: FORM */}
// //         <motion.div 
// //           initial={{ opacity: 0, x: -50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           className="bg-[#0f0f13]/80 backdrop-blur-xl p-8 md:p-16 flex flex-col justify-center border-r border-white/5"
// //         >
// //           {/* Animated Monkey Buddy */}
// //           <CartoonBuddy coverEyes={coverEyes} />

// //           <div className="mb-10 text-center md:text-left">
// //             <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Welcome Back</h2>
// //             <p className="text-gray-400">Please enter your details to continue.</p>
// //           </div>

// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div>
// //               <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 required
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 placeholder="name@company.com"
// //                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 required
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 onFocus={() => setCoverEyes(true)}
// //                 onBlur={() => setCoverEyes(false)}
// //                 placeholder="••••••••"
// //                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
// //               />
// //             </div>

// //             <motion.button
// //               whileHover={{ scale: 1.02 }}
// //               whileTap={{ scale: 0.98 }}
// //               type="submit"
// //               className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
// //             >
// //               Sign In
// //             </motion.button>
// //           </form>

// //           <p className="mt-8 text-center text-gray-500">
// //             Don’t have an account? <Link to="/signup" className="text-white hover:text-indigo-400 font-semibold underline decoration-indigo-500">Create account</Link>
// //           </p>
// //         </motion.div>

// //         {/* RIGHT SIDE: MOTIVATIONAL */}
// //         <motion.div 
// //           initial={{ opacity: 0, x: 50 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           className="relative hidden lg:flex flex-col justify-center items-center p-16 bg-gradient-to-br from-indigo-900/40 to-black"
// //         >
// //           <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
// //           <div className="relative z-10 text-center">
// //             <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-gray-500 mb-6">
// //               "Your mind is a garden. Your thoughts are the seeds."
// //             </h3>
// //             <p className="text-lg text-gray-400 italic">— Start your journey today.</p>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Login;
// import React, {
//   useState,
//   useContext,
//   useEffect,
//   useRef
// } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { AuthContext } from "../Context/AuthContext";

// /* 🐵 Monkey Cartoon Buddy (Correct Eye Tracking) */
// function CartoonBuddy({ coverEyes }) {
//   const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
//   const faceRef = useRef(null);

//   useEffect(() => {
//     if (coverEyes) return;

//     const handleMouseMove = (e) => {
//       if (!faceRef.current) return;

//       const rect = faceRef.current.getBoundingClientRect();
//       const centerX = rect.left + rect.width / 2;
//       const centerY = rect.top + rect.height / 2;

//       const dx = e.clientX - centerX;
//       const dy = e.clientY - centerY;

//       const maxMove = 4; // limit movement
//       const x = Math.max(-maxMove, Math.min(maxMove, dx / 15));
//       const y = Math.max(-maxMove, Math.min(maxMove, dy / 15));

//       setEyePos({ x, y });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, [coverEyes]);

//   return (
//     <div className="relative flex justify-center mb-10 mt-4 scale-110">
//       <div className="relative w-32 h-32">

//         {/* HEAD */}
//         <div className="relative w-28 h-28 mx-auto bg-[#7c4a2d] rounded-full shadow-2xl flex items-center justify-center">

//           {/* EARS */}
//           <div className="absolute -left-5 top-8 w-9 h-9 bg-[#7c4a2d] rounded-full">
//             <div className="absolute inset-1.5 bg-[#eac8a3] rounded-full" />
//           </div>
//           <div className="absolute -right-5 top-8 w-9 h-9 bg-[#7c4a2d] rounded-full">
//             <div className="absolute inset-1.5 bg-[#eac8a3] rounded-full" />
//           </div>

//           {/* FACE */}
//           <div
//             ref={faceRef}
//             className="relative w-20 h-20 bg-[#eac8a3] rounded-full flex flex-col items-center pt-4"
//           >
//             {/* EYES */}
//             <div className="flex gap-4">
//               {[0, 1].map((i) => (
//                 <div
//                   key={i}
//                   className="relative w-6 h-6 bg-white rounded-full overflow-hidden shadow-inner"
//                 >
//                   {/* Eyelid */}
//                   <div
//                     className={`absolute inset-0 bg-[#eac8a3] z-20 transition-transform duration-300 origin-top ${
//                       coverEyes ? "scale-y-100" : "scale-y-0"
//                     }`}
//                   />

//                   {/* Eye */}
//                   <div
//                     className="absolute w-4 h-4 bg-[#4e2c1c] rounded-full flex items-center justify-center transition-transform duration-75"
//                     style={{
//                       transform: coverEyes
//                         ? "translate(0,0)"
//                         : `translate(${eyePos.x}px, ${eyePos.y}px)`
//                     }}
//                   >
//                     <div className="w-2 h-2 bg-black rounded-full" />
//                     <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-70" />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* SMILE */}
//             <div className="mt-5 w-8 h-4 border-b-[3px] border-[#5a2e1a] rounded-full" />
//           </div>

//           {/* HANDS (MOVE UP TO COVER EYES) */}
//           <motion.div
//             className="absolute z-30 w-10 h-10 bg-[#7c4a2d] rounded-2xl shadow-lg"
//             animate={{
//               left: coverEyes ? "18px" : "-10px",
//               top: coverEyes ? "24px" : "80px",
//               rotate: coverEyes ? 35 : 0,
//               opacity: coverEyes ? 1 : 0.4
//             }}
//             transition={{ type: "spring", stiffness: 200, damping: 18 }}
//           />
//           <motion.div
//             className="absolute z-30 w-10 h-10 bg-[#7c4a2d] rounded-2xl shadow-lg"
//             animate={{
//               right: coverEyes ? "18px" : "-10px",
//               top: coverEyes ? "24px" : "80px",
//               rotate: coverEyes ? -35 : 0,
//               opacity: coverEyes ? 1 : 0.4
//             }}
//             transition={{ type: "spring", stiffness: 200, damping: 18 }}
//           />
//         </div>

//         {/* BODY */}
//         <div className="absolute top-[104px] left-1/2 -translate-x-1/2 w-14 h-8 bg-[#7c4a2d] rounded-b-full shadow-lg" />
//       </div>
//     </div>
//   );
// }

// function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [coverEyes, setCoverEyes] = useState(false);

//   const navigate = useNavigate();
//   const { setUser, setToken } = useContext(AuthContext);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:8000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();
//       if (res.status === 200) {
//         setUser(data.user);
//         setToken(data.token);
//         navigate("/home");
//       } else {
//         alert(data.message || "Invalid credentials");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-10">
//       <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">

//         {/* LEFT */}
//         <div className="bg-[#0f0f13]/80 backdrop-blur-xl p-8 md:p-16 flex flex-col justify-center">
//           <CartoonBuddy coverEyes={coverEyes} />

//           <h2 className="text-4xl font-extrabold text-white mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-gray-400 mb-8">
//             Please enter your details to continue.
//           </p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <input
//               type="email"
//               name="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="name@company.com"
//               className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
//             />

//             <input
//               type="password"
//               name="password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               onFocus={() => setCoverEyes(true)}
//               onBlur={() => setCoverEyes(false)}
//               placeholder="••••••••"
//               className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
//             />

//             <button
//               type="submit"
//               className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl"
//             >
//               Sign In
//             </button>
//           </form>

//           <p className="mt-8 text-center text-gray-500">
//             Don’t have an account?{" "}
//             <Link to="/signup" className="text-white underline">
//               Create account
//             </Link>
//           </p>
//         </div>

//         {/* RIGHT */}
//         <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-900/40 to-black p-16">
//           <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-gray-500 text-center">
//             "Your mind is a garden.  
//             Your thoughts are the seeds."
//           </h3>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";

/* 🐵 Enhanced Animated Monkey Buddy with Improved Eye Tracking */
function CartoonBuddy({ coverEyes }) {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const eyesContainerRef = useRef(null);

  useEffect(() => {
    if (coverEyes) return;

    const handleMouseMove = (e) => {
      if (!eyesContainerRef.current) return;

      const rect = eyesContainerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate angle and distance from center
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize and scale for proper eye movement
      const maxDistance = 150;
      const scale = Math.min(1, distance / maxDistance);
      
      // More accurate eye movement within pupil bounds
      const angle = Math.atan2(dy, dx);
      const moveAmount = 3.5; // Maximum pixels to move within eye
      
      const x = Math.cos(angle) * moveAmount * scale;
      const y = Math.sin(angle) * moveAmount * scale;

      setEyePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [coverEyes]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: -20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.1 }}
      className="flex justify-center mb-10"
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
          <div className="relative w-20 h-20 bg-[#eac8a3] rounded-full flex flex-col items-center pt-3 shadow-inner border-2 border-[#d4b89f]/40">
            
            {/* EYES CONTAINER - Reference for tracking */}
            <div
              ref={eyesContainerRef}
              className="flex gap-5"
            >
              {/* LEFT EYE */}
              <div className="relative w-5 h-5 bg-white rounded-full overflow-hidden shadow-lg border-2 border-[#ddd6ce]">
                {/* Eyelid - closes on password focus */}
                <div
                  className={`absolute inset-0 bg-[#eac8a3] z-20 transition-all duration-300 origin-top ${
                    coverEyes ? "scale-y-100" : "scale-y-0"
                  }`}
                />

                {/* Iris & Pupil */}
                <div
                  className="absolute w-4 h-4 bg-gradient-to-br from-[#8b6f47] to-[#6b5a3f] rounded-full flex items-center justify-center transition-all duration-75 ease-out"
                  style={{
                    transform: coverEyes
                      ? "translate(0, 0)"
                      : `translate(${eyePos.x}px, ${eyePos.y}px)`,
                    left: "50%",
                    top: "50%",
                    marginLeft: "-8px",
                    marginTop: "-8px"
                  }}
                >
                  {/* Pupil */}
                  <div className="w-2 h-2 bg-black rounded-full" />
                  {/* Shine/Reflection */}
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full opacity-90" />
                </div>
              </div>

              {/* RIGHT EYE */}
              <div className="relative w-5 h-5 bg-white rounded-full overflow-hidden shadow-lg border-2 border-[#ddd6ce]">
                {/* Eyelid */}
                <div
                  className={`absolute inset-0 bg-[#eac8a3] z-20 transition-all duration-300 origin-top ${
                    coverEyes ? "scale-y-100" : "scale-y-0"
                  }`}
                />

                {/* Iris & Pupil */}
                <div
                  className="absolute w-4 h-4 bg-gradient-to-br from-[#8b6f47] to-[#6b5a3f] rounded-full flex items-center justify-center transition-all duration-75 ease-out"
                  style={{
                    transform: coverEyes
                      ? "translate(0, 0)"
                      : `translate(${eyePos.x}px, ${eyePos.y}px)`,
                    left: "50%",
                    top: "50%",
                    marginLeft: "-8px",
                    marginTop: "-8px"
                  }}
                >
                  {/* Pupil */}
                  <div className="w-2 h-2 bg-black rounded-full" />
                  {/* Shine/Reflection */}
                  <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-white rounded-full opacity-90" />
                </div>
              </div>
            </div>

            {/* SMILE */}
            <div className="mt-5 w-9 h-5 border-b-[3px] border-[#5a2e1a] rounded-full relative">
              {/* Smile curve effect */}
              <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#5a2e1a]/30 rounded-full" />
            </div>
          </div>

          {/* HANDS - Move to cover eyes when password is focused */}
          <motion.div
            className="absolute z-30 w-11 h-11 bg-gradient-to-b from-[#a0644e] to-[#7c4a2d] rounded-2xl shadow-lg border border-[#5a2e1a]/20"
            animate={{
              left: coverEyes ? "30px" : "-12px",
              top: coverEyes ? "35px" : "95px",
              rotate: coverEyes ? 25 : 0,
              opacity: coverEyes ? 1 : 0.2
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
          <motion.div
            className="absolute z-30 w-11 h-11 bg-gradient-to-b from-[#a0644e] to-[#7c4a2d] rounded-2xl shadow-lg border border-[#5a2e1a]/20"
            animate={{
              right: coverEyes ? "30px" : "-12px",
              top: coverEyes ? "35px" : "95px",
              rotate: coverEyes ? -25 : 0,
              opacity: coverEyes ? 1 : 0.2
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />
        </div>

        {/* BODY */}
        <motion.div 
          animate={{ y: coverEyes ? 0 : 4 }}
          transition={{ duration: 0.3 }}
          className="absolute top-[110px] left-1/2 -translate-x-1/2 w-12 h-5 bg-gradient-to-b from-[#a0644e] to-[#7c4a2d] rounded-b-3xl shadow-lg border-b-2 border-[#5a2e1a]/20"
        />
      </div>
    </motion.div>
  );
}

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [coverEyes, setCoverEyes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.status === 200) {
        setUser(data.user);
        setToken(data.token);
        navigate("/home");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
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

      {/* Main Login Container */}
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
              className="flex flex-col items-center mb-10"
            >
              {/* Logo Badge */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg cursor-pointer transform transition-all"
              >
                <span className="text-3xl">🌿</span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-3 bg-gradient-to-r from-gray-900 via-orange-700 to-gray-800 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-center text-gray-600 text-lg font-medium">
                Your wellness space awaits
              </p>
            </motion.div>

            {/* Animated Buddy */}
            <CartoonBuddy coverEyes={coverEyes} />

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-5 mt-8">
              
              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="relative w-full px-5 py-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md font-medium"
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
                transition={{ delay: 0.25 }}
              >
                <label className="block text-sm font-bold text-gray-800 mb-3">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-all duration-300" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setCoverEyes(true)}
                    onBlur={() => setCoverEyes(false)}
                    placeholder="••••••••"
                    className="relative w-full px-5 py-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 focus:border-orange-400 focus:outline-none transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md font-medium"
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

              {/* Sign In Button */}
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
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>Sign In</span>
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

            {/* Sign Up Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-gray-700 font-medium"
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text hover:from-orange-600 hover:to-red-600 transition-all underline decoration-2 underline-offset-2"
              >
                Create one
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
                💝 <span className="text-orange-600">Your mind is a garden.</span> Let's nurture it together.
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
          🔒 Secure login • 🛡️ No spam • ❤️ Your privacy matters
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Login;