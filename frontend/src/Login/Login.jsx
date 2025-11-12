// // import React, { useState, useContext } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import two from "../assets/two.jpg";
// // import three from "../assets/three.jpg";
// // import { AuthContext } from "../Context/AuthContext";

// // function Login() {
// //   const [formData, setFormData] = useState({ email: "", password: "" });
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
// //     <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden text-gray-900">
// //       {/* 🌤 Floating background images */}
// //       <motion.img
// //         src={two}
// //         alt="Soft background"
// //         className="absolute w-44 h-44 opacity-40 top-20 left-10 rounded-3xl"
// //         animate={{ y: [0, 30, 0] }}
// //         transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
// //       />
// //       <motion.img
// //         src={three}
// //         alt="Soft waves"
// //         className="absolute w-48 h-48 opacity-40 bottom-10 right-10 rounded-full"
// //         animate={{ y: [0, -30, 0] }}
// //         transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
// //       />

// //       {/* ☁️ Soft glowing gradients */}
// //       <div className="absolute top-10 left-20 w-72 h-72 bg-blue-300 rounded-full blur-[140px] opacity-40 animate-pulse"></div>
// //       <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-300 rounded-full blur-[140px] opacity-40 animate-pulse"></div>

// //       {/* 🩵 Login Card */}
// //       <motion.form
// //         onSubmit={handleSubmit}
// //         initial={{ opacity: 0, y: 40 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ duration: 0.8 }}
// //         className="relative bg-white/90 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-10 w-11/12 md:w-1/2 lg:w-1/3"
// //       >
// //         <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6 tracking-wide">
// //           Welcome Back 🌞
// //         </h2>

// //         <p className="text-center text-gray-500 mb-6">
// //           Login to your Health Monitor account and continue your wellness journey.
// //         </p>

// //         {/* Email Field */}
// //         <div className="mb-4">
// //           <label htmlFor="email" className="block font-medium text-gray-700">
// //             Email address
// //           </label>
// //           <input
// //             type="email"
// //             name="email"
// //             id="email"
// //             required
// //             value={formData.email}
// //             onChange={handleChange}
// //             className="w-full mt-2 px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             placeholder="you@example.com"
// //           />
// //         </div>

// //         {/* Password Field */}
// //         <div className="mb-6">
// //           <label htmlFor="password" className="block font-medium text-gray-700">
// //             Password
// //           </label>
// //           <input
// //             type="password"
// //             name="password"
// //             id="password"
// //             required
// //             value={formData.password}
// //             onChange={handleChange}
// //             className="w-full mt-2 px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
// //             placeholder="••••••••"
// //           />
// //         </div>

// //         {/* Submit Button */}
// //         <motion.button
// //           whileHover={{ scale: 1.05 }}
// //           whileTap={{ scale: 0.97 }}
// //           type="submit"
// //           className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-lg transition-all duration-300"
// //         >
// //           Login
// //         </motion.button>

// //         {/* Links */}
// //         <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
// //           <Link to="#" className="hover:text-blue-500 font-medium">
// //             Forgot Password?
// //           </Link>
// //           <p>
// //             Don’t have an account?
// //             <Link
// //               to="/signup"
// //               className="text-blue-500 hover:underline font-medium ml-1"
// //             >
// //               Sign up
// //             </Link>
// //           </p>
// //         </div>
// //       </motion.form>
// //     </div>
// //   );
// // }

// // export default Login;
// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { AuthContext } from "../Context/AuthContext";

// // 🌿 Background image – you can replace with your own relaxing image
// import bg from "../assets/meditation.jpg"; 

// function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
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
//     <div
//       className="relative flex justify-center items-center min-h-screen text-gray-900 overflow-hidden"
//       style={{
//         backgroundImage: `url(${bg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* ☁️ Soft Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-blue-50/80 to-indigo-50/80 backdrop-blur-sm"></div>

//       {/* ✨ Gentle Animated Glow */}
//       <div className="absolute top-10 left-20 w-72 h-72 bg-blue-300 rounded-full blur-[140px] opacity-40 animate-pulse"></div>
//       <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-300 rounded-full blur-[140px] opacity-40 animate-pulse"></div>

//       {/* 🌙 Login Card */}
//       <motion.form
//         onSubmit={handleSubmit}
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="relative bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-10 w-11/12 md:w-1/2 lg:w-1/3 z-10"
//       >
//         <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6 tracking-wide">
//           Welcome Back 🌿
//         </h2>

//         <p className="text-center text-gray-500 mb-6 text-sm">
//           Log in to your <span className="font-medium text-indigo-600">HealthMonitor</span> account and continue your wellness journey.
//         </p>

//         {/* Email Field */}
//         <div className="mb-4">
//           <label htmlFor="email" className="block font-medium text-gray-700">
//             Email address
//           </label>
//           <input
//             type="email"
//             name="email"
//             id="email"
//             required
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="you@example.com"
//             className="w-full mt-2 px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//           />
//         </div>

//         {/* Password Field */}
//         <div className="mb-6">
//           <label htmlFor="password" className="block font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             id="password"
//             required
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="••••••••"
//             className="w-full mt-2 px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
//           />
//         </div>

//         {/* Submit Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.97 }}
//           type="submit"
//           className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-lg transition-all duration-300"
//         >
//           Login
//         </motion.button>

//         {/* Links */}
//         <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
//           <Link to="#" className="hover:text-blue-500 font-medium">
//             Forgot Password?
//           </Link>
//           <p>
//             Don’t have an account?
//             <Link
//               to="/signup"
//               className="text-blue-500 hover:underline font-medium ml-1"
//             >
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </motion.form>
//     </div>
//   );
// }

// export default Login;
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import bg from "../assets/meditation.jpg"; // Use your relaxing background image

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.status === 200) {
        setUser(data.user);
        setToken(data.token);
        navigate("/home");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen text-gray-900 overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 🌓 Slightly darker overlay to make content readable */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/70 to-white/40 backdrop-blur-[2px]"></div>

      {/* ✨ Gentle Animated Glow */}
      <div className="absolute top-10 left-20 w-72 h-72 bg-blue-400 rounded-full blur-[150px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-indigo-400 rounded-full blur-[150px] opacity-30 animate-pulse"></div>

      {/* 🌙 Login Card */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white/95 backdrop-blur-md border border-gray-100 rounded-3xl shadow-2xl p-10 w-11/12 md:w-1/2 lg:w-1/3 z-10"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6 tracking-wide">
          Welcome Back 🌼
        </h2>

        <p className="text-center text-gray-600 mb-6 text-sm">
          Continue your wellness journey with{" "}
          <span className="font-semibold text-indigo-600">HealthMonitor</span>.
        </p>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full mt-2 px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full mt-2 px-4 py-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-lg transition-all duration-300"
        >
          Login
        </motion.button>

        {/* Links */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <Link to="#" className="hover:text-indigo-500 font-medium">
            Forgot Password?
          </Link>
          <p>
            Don’t have an account?
            <Link
              to="/signup"
              className="text-indigo-600 hover:underline font-medium ml-1"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
}

export default Login;
