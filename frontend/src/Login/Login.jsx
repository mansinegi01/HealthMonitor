
// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { AuthContext } from "../Context/AuthContext";

// /* 🧸 Cartoon Buddy Component - Upgraded for Realism */
// function CartoonBuddy({ coverEyes }) {
//   const [eyePos, setEyePos] = useState({ x: 0, y: 0 });

//    useEffect(() => {
//     if (coverEyes) return;

//     const handleMouseMove = (e) => {
//       const x = (e.clientX / window.innerWidth - 0.5) * 6;
//       const y = (e.clientY / window.innerHeight - 0.5) * 6;
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
//             <div className="absolute inset-1.5 bg-[#eac8a3] rounded-full shadow-inner" />
//           </div>
//           <div className="absolute -right-5 top-8 w-9 h-9 bg-[#7c4a2d] rounded-full">
//             <div className="absolute inset-1.5 bg-[#eac8a3] rounded-full shadow-inner" />
//           </div>

//           {/* FACE AREA */}
//           <div className="relative w-20 h-20 bg-[#eac8a3] rounded-full overflow-hidden flex flex-col items-center pt-4">
            
//             {/* EYES CONTAINER */}
//             <div className="flex gap-4">
//               {[1, 2].map((_, i) => (
//                 <div key={i} className="relative w-6 h-6 bg-white rounded-full overflow-hidden border border-[#5a2e1a]/20 shadow-inner">
//                   {/* EYELID (Closes when covering eyes) */}
//                   <div 
//                     className={`absolute inset-0 bg-[#eac8a3] z-20 transition-transform duration-300 origin-top ${coverEyes ? 'scale-y-100' : 'scale-y-0'}`}
//                   />
                  
//                   {/* REALISTIC EYE (Iris + Pupil + Reflection) */}
//                   <div 
//                     className="absolute w-4 h-4 bg-[#4e2c1c] rounded-full transition-transform duration-75 flex items-center justify-center"
//                     style={{
//                       transform: coverEyes 
//                         ? "translate(0, 0)" 
//                         : `translate(${eyePos.x}px, ${eyePos.y}px)`
//                     }}
//                   >
//                     {/* Pupil */}
//                     <div className="w-2 h-2 bg-black rounded-full" />
//                     {/* Reflection Sparkle */}
//                     <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-70" />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* SMILE */}
//             <div className={`mt-5 w-8 h-4 border-b-[3px] border-[#5a2e1a] rounded-full transition-all ${coverEyes ? 'opacity-40' : 'opacity-100'}`} />
//           </div>

//           {/* HANDS (Logic updated to cover eyes precisely) */}
//           <motion.div
//             className="absolute z-30 w-10 h-10 bg-[#7c4a2d] rounded-2xl border-t-2 border-[#5a2e1a]/10 shadow-lg"
//             animate={{
//               left: coverEyes ? "18px" : "-10px",
//               top: coverEyes ? "24px" : "80px",
//               rotate: coverEyes ? 35 : 0,
//               opacity: coverEyes ? 1 : 0.3
//             }}
//             transition={{ type: "spring", stiffness: 200, damping: 20 }}
//           />
//           <motion.div
//             className="absolute z-30 w-10 h-10 bg-[#7c4a2d] rounded-2xl border-t-2 border-[#5a2e1a]/10 shadow-lg"
//             animate={{
//               right: coverEyes ? "18px" : "-10px",
//               top: coverEyes ? "24px" : "80px",
//               rotate: coverEyes ? -35 : 0,
//               opacity: coverEyes ? 1 : 0.3
//             }}
//             transition={{ type: "spring", stiffness: 200, damping: 20 }}
//           />
//         </div>

//         {/* BODY (Small base) */}
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
//       const response = await fetch("http://localhost:8000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();
//       if (response.status === 200) {
//         setUser(data.user);
//         setToken(data.token);
//         navigate("/home");
//       } else {
//         alert(data.message || "Invalid credentials");
//       }
//     } catch (error) {
//       console.log("Login error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-10 font-sans selection:bg-indigo-500 selection:text-white">
//       {/* Background glow */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
//         <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
//       </div>

//       <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10" style={{ perspective: "1200px" }}>
//         {/* LEFT SIDE: FORM */}
//         <motion.div 
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-[#0f0f13]/80 backdrop-blur-xl p-8 md:p-16 flex flex-col justify-center border-r border-white/5"
//         >
//           {/* Animated Monkey Buddy */}
//           <CartoonBuddy coverEyes={coverEyes} />

//           <div className="mb-10 text-center md:text-left">
//             <h2 className="text-4xl font-extrabold text-white mb-2 tracking-tight">Welcome Back</h2>
//             <p className="text-gray-400">Please enter your details to continue.</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="name@company.com"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 onFocus={() => setCoverEyes(true)}
//                 onBlur={() => setCoverEyes(false)}
//                 placeholder="••••••••"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
//               />
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
//             >
//               Sign In
//             </motion.button>
//           </form>

//           <p className="mt-8 text-center text-gray-500">
//             Don’t have an account? <Link to="/signup" className="text-white hover:text-indigo-400 font-semibold underline decoration-indigo-500">Create account</Link>
//           </p>
//         </motion.div>

//         {/* RIGHT SIDE: MOTIVATIONAL */}
//         <motion.div 
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="relative hidden lg:flex flex-col justify-center items-center p-16 bg-gradient-to-br from-indigo-900/40 to-black"
//         >
//           <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
//           <div className="relative z-10 text-center">
//             <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-gray-500 mb-6">
//               "Your mind is a garden. Your thoughts are the seeds."
//             </h3>
//             <p className="text-lg text-gray-400 italic">— Start your journey today.</p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, {
  useState,
  useContext,
  useEffect,
  useRef
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";

/* 🐵 Monkey Cartoon Buddy (Correct Eye Tracking) */
function CartoonBuddy({ coverEyes }) {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const faceRef = useRef(null);

  useEffect(() => {
    if (coverEyes) return;

    const handleMouseMove = (e) => {
      if (!faceRef.current) return;

      const rect = faceRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const maxMove = 4; // limit movement
      const x = Math.max(-maxMove, Math.min(maxMove, dx / 15));
      const y = Math.max(-maxMove, Math.min(maxMove, dy / 15));

      setEyePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [coverEyes]);

  return (
    <div className="relative flex justify-center mb-10 mt-4 scale-110">
      <div className="relative w-32 h-32">

        {/* HEAD */}
        <div className="relative w-28 h-28 mx-auto bg-[#7c4a2d] rounded-full shadow-2xl flex items-center justify-center">

          {/* EARS */}
          <div className="absolute -left-5 top-8 w-9 h-9 bg-[#7c4a2d] rounded-full">
            <div className="absolute inset-1.5 bg-[#eac8a3] rounded-full" />
          </div>
          <div className="absolute -right-5 top-8 w-9 h-9 bg-[#7c4a2d] rounded-full">
            <div className="absolute inset-1.5 bg-[#eac8a3] rounded-full" />
          </div>

          {/* FACE */}
          <div
            ref={faceRef}
            className="relative w-20 h-20 bg-[#eac8a3] rounded-full flex flex-col items-center pt-4"
          >
            {/* EYES */}
            <div className="flex gap-4">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="relative w-6 h-6 bg-white rounded-full overflow-hidden shadow-inner"
                >
                  {/* Eyelid */}
                  <div
                    className={`absolute inset-0 bg-[#eac8a3] z-20 transition-transform duration-300 origin-top ${
                      coverEyes ? "scale-y-100" : "scale-y-0"
                    }`}
                  />

                  {/* Eye */}
                  <div
                    className="absolute w-4 h-4 bg-[#4e2c1c] rounded-full flex items-center justify-center transition-transform duration-75"
                    style={{
                      transform: coverEyes
                        ? "translate(0,0)"
                        : `translate(${eyePos.x}px, ${eyePos.y}px)`
                    }}
                  >
                    <div className="w-2 h-2 bg-black rounded-full" />
                    <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white rounded-full opacity-70" />
                  </div>
                </div>
              ))}
            </div>

            {/* SMILE */}
            <div className="mt-5 w-8 h-4 border-b-[3px] border-[#5a2e1a] rounded-full" />
          </div>

          {/* HANDS (MOVE UP TO COVER EYES) */}
          <motion.div
            className="absolute z-30 w-10 h-10 bg-[#7c4a2d] rounded-2xl shadow-lg"
            animate={{
              left: coverEyes ? "18px" : "-10px",
              top: coverEyes ? "24px" : "80px",
              rotate: coverEyes ? 35 : 0,
              opacity: coverEyes ? 1 : 0.4
            }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          />
          <motion.div
            className="absolute z-30 w-10 h-10 bg-[#7c4a2d] rounded-2xl shadow-lg"
            animate={{
              right: coverEyes ? "18px" : "-10px",
              top: coverEyes ? "24px" : "80px",
              rotate: coverEyes ? -35 : 0,
              opacity: coverEyes ? 1 : 0.4
            }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          />
        </div>

        {/* BODY */}
        <div className="absolute top-[104px] left-1/2 -translate-x-1/2 w-14 h-8 bg-[#7c4a2d] rounded-b-full shadow-lg" />
      </div>
    </div>
  );
}

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [coverEyes, setCoverEyes] = useState(false);

  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-10">
      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">

        {/* LEFT */}
        <div className="bg-[#0f0f13]/80 backdrop-blur-xl p-8 md:p-16 flex flex-col justify-center">
          <CartoonBuddy coverEyes={coverEyes} />

          <h2 className="text-4xl font-extrabold text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400 mb-8">
            Please enter your details to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
            />

            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setCoverEyes(true)}
              onBlur={() => setCoverEyes(false)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-white underline">
              Create account
            </Link>
          </p>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-900/40 to-black p-16">
          <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-gray-500 text-center">
            "Your mind is a garden.  
            Your thoughts are the seeds."
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
