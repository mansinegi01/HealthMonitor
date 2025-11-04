
// // import React from "react";
// // import { motion } from "framer-motion";
// // import { Link, useNavigate } from "react-router-dom";

// // function GetStart() {
// //   const navigate = useNavigate();

// //   return (
// //     <div className="relative">
     
// //       {/* Body / Hero Section */}
// //       <main className="">
// //         {/* Hero Banner */}
// //         <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen flex flex-col justify-center items-center">
// //           <h2 className="text-5xl font-bold mb-6 text-center">
// //             Welcome to Health Monitor
// //           </h2>
// //           <p className="text-lg mb-8 text-center max-w-xl">
// //             Track your health, monitor your progress, and stay motivated with our
// //             all-in-one health tracking platform.
// //           </p>
// //           <Link
// //             to="/signup"
// //             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-white transition-all duration-300"
// //           >
// //             Get Started
// //           </Link>

// //           {/* Floating shapes for motion */}
// //           <motion.div
// //             className="absolute w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-30 top-10 left-10 animate-pulse"
// //             animate={{ x: [0, 200, 0], y: [0, 100, 0] }}
// //             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //           ></motion.div>
// //           <motion.div
// //             className="absolute w-72 h-72 bg-purple-600 rounded-full blur-[120px] opacity-30 bottom-10 right-10 animate-pulse"
// //             animate={{ x: [0, -200, 0], y: [0, -100, 0] }}
// //             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //           ></motion.div>
// //         </section>

// //         {/* Features / Content Section */}
// //         <section className="py-20 bg-gray-100 text-gray-800">
// //           <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
// //             <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-all duration-300">
// //               <h3 className="text-2xl font-semibold mb-4">Track Fitness</h3>
// //               <p>Monitor your workouts and see your progress over time.</p>
// //             </div>
// //             <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-all duration-300">
// //               <h3 className="text-2xl font-semibold mb-4">Health Metrics</h3>
// //               <p>Keep track of your vital health stats in one place.</p>
// //             </div>
// //             <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition-all duration-300">
// //               <h3 className="text-2xl font-semibold mb-4">Stay Motivated</h3>
// //               <p>Get insights and reminders to stay on top of your health goals.</p>
// //             </div>
// //           </div>
// //         </section>
// //       </main>
// //     </div>
// //   );
// // }

// // export default GetStart;
// import React from "react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";
// import { Activity, Heart, TrendingUp, MessageCircle, LogIn, UserPlus } from "lucide-react";
// import { supabase } from "@/integrations/supabase/client";

//  function GetStart() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   supabase.auth.getSession().then(({ data: { session } }) => {
//   //     if (session) {
//   //       navigate("/dashboard");
//   //     } else {
//   //       setLoading(false);
//   //     }
//   //   });
//   // }, [navigate]);
//   useEffect(() => {
//   if (!supabase) {
//     console.error("Supabase client not initialized");
//     setLoading(false);
//     return;
//   }

//   supabase.auth.getSession().then(({ data: { session } }) => {
//     if (session) {
//       navigate("/dashboard");
//     } else {
//       setLoading(false);
//     }
//   });
// }, [navigate]);


//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-hero">
//         <div className="container mx-auto px-4 py-20">
//           <div className="text-center max-w-3xl mx-auto">
//             <div className="flex justify-center mb-6">
//               <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow animate-scale-in">
//                 <Activity className="h-8 w-8 text-primary-foreground" />
//               </div>
//             </div>
            
//             <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
//               Your Personal Health Companion
//             </h1>
            
//             <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in">
//               Track your health metrics, visualize trends, and get personalized insights with our intelligent health monitoring system.
//             </p>
            
//             <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
//               <Button 
//                 size="lg" 
//                 className="bg-gradient-primary shadow-glow hover:scale-105 transition-transform"
//                 onClick={() => navigate("/signup")}
//               >
//                 <UserPlus className="mr-2 h-5 w-5" />
//                 Get Started Free
//               </Button>
//               <Button 
//                 size="lg" 
//                 variant="outline"
//                 onClick={() => navigate("/login")}
//               >
//                 <LogIn className="mr-2 h-5 w-5" />
//                 Sign In
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="container mx-auto px-4 py-16">
//         <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
//           Everything You Need to Stay Healthy
//         </h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <Card className="shadow-card hover:shadow-glow transition-shadow">
//             <CardContent className="pt-6">
//               <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
//                 <Heart className="h-6 w-6 text-primary-foreground" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2 text-foreground">Track Vital Metrics</h3>
//               <p className="text-muted-foreground">
//                 Monitor weight, blood pressure, glucose levels, heart rate, and more. All your health data in one place.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="shadow-card hover:shadow-glow transition-shadow">
//             <CardContent className="pt-6">
//               <div className="h-12 w-12 rounded-full bg-gradient-secondary flex items-center justify-center mb-4">
//                 <TrendingUp className="h-6 w-6 text-secondary-foreground" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2 text-foreground">Visualize Trends</h3>
//               <p className="text-muted-foreground">
//                 Beautiful charts and graphs help you understand your health patterns and progress over time.
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="shadow-card hover:shadow-glow transition-shadow">
//             <CardContent className="pt-6">
//               <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
//                 <MessageCircle className="h-6 w-6 text-primary-foreground" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2 text-foreground">Health Assistant</h3>
//               <p className="text-muted-foreground">
//                 Get instant health tips and answers to your questions from our intelligent chatbot assistant.
//               </p>
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-gradient-primary py-16">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-3xl font-bold text-primary-foreground mb-4">
//             Ready to Take Control of Your Health?
//           </h2>
//           <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
//             Join thousands of users who are already tracking their health and making better decisions every day.
//           </p>
//           <Button 
//             size="lg" 
//             variant="secondary"
//             className="shadow-lg hover:scale-105 transition-transform"
//             onClick={() => navigate("/auth")}
//           >
//             <UserPlus className="mr-2 h-5 w-5" />
//             Start Your Journey Today
//           </Button>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="border-t border-border py-8">
//         <div className="container mx-auto px-4 text-center text-muted-foreground">
//           <p>&copy; 2025 HealthMonitor. Your health, your data, your control.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default GetStart;
import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, TrendingUp, MessageCircle } from "lucide-react";

const GetStart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 max-w-4xl">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
            <Heart className="h-8 w-8 text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Your Personal Health Companion
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Track your health metrics, visualize trends, and get personalized
          insights with our intelligent health monitoring system.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transform transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
          >
            🚀 Get Started Free
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border border-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100"
          >
            🔑 Sign In
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white w-full text-center">
        <h2 className="text-3xl font-bold mb-12">
          Everything You Need to Stay Healthy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Heart className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Vital Metrics</h3>
            <p className="text-gray-600">
              Monitor weight, blood pressure, glucose levels, heart rate, and
              more — all in one place.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Visualize Trends</h3>
            <p className="text-gray-600">
              Beautiful charts and graphs help you understand your health
              patterns and progress over time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Health Assistant</h3>
            <p className="text-gray-600">
              Get instant health tips and answers from our smart chatbot
              assistant.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-6 text-center w-full">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Take Control of Your Health?
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already tracking their health and
          making better decisions every day.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform transition-transform duration-300 hover:scale-110"
        >
          🌿 Start Your Journey Today
        </button>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © 2025 HealthMonitor — Your health, your data, your control.
      </footer>
    </div>
  );
};

export default GetStart;
