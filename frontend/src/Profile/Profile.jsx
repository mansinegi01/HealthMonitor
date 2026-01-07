
// import React, { useState, useEffect } from "react";
// import { Heart, Droplets, Activity, Lock } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";

// const Profile = () => {
//   const location = useLocation();
//   const user = location.state?.user;

//   const [healthData, setHealthData] = useState({
//     weight: "N/A",
//     heartRate: "N/A",
//     bloodPressure: "N/A/N/A",
//     glucose: "N/A",
//   });
// useEffect(() => {
//   const fetchHealth = async () => {
//     try {
//       const res = await fetch("http://localhost:8000/api/health/gethealthProfile", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token")}`,
//         },
//         credentials: "include",
//       });

//       const data = await res.json();
//       console.log("✅ Health Data Response:", data);

//       if (res.ok && data.health) {
//         const h = data.health;
//         setHealthData({
//           weight: h.weight || "N/A",
//           heartRate: h.heartRate || "N/A",
//           bloodPressure: `${h.systolic || "N/A"}/${h.diastolic || "N/A"}`,
//           glucose: h.glucose || "N/A",
//         });
//       } else {
//         console.warn("⚠️ No health data found or invalid response");
//       }
//     } catch (error) {
//       console.error("❌ Error fetching health data:", error);
//     }
//   };

//   fetchHealth();
// }, []);


//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white mt-10 px-8 py-12">
//       <h1 className="text-3xl font-bold text-gray-800 mb-2">
//         {user?.name || "Guest"}
//       </h1>
//       <p className="text-gray-600 mb-8">Track your health metrics over time</p>

//       {/* Health Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         {/* Weight */}
//         <div className="p-6 rounded-2xl shadow-sm bg-white border border-gray-100 transition-transform hover:scale-105">
//           <div className="flex justify-between items-center mb-3">
//             <p className="text-sm font-semibold text-gray-600">Weight</p>
//             <Lock className="w-5 h-5 text-blue-400" />
//           </div>
//           <p className="text-2xl font-bold text-gray-800">
//             {healthData.weight} <span className="text-sm font-medium">kg</span>
//           </p>
//         </div>

//         {/* Heart Rate */}
//         <div className="p-6 rounded-2xl shadow-sm bg-white border border-gray-100 transition-transform hover:scale-105">
//           <div className="flex justify-between items-center mb-3">
//             <p className="text-sm font-semibold text-gray-600">Heart Rate</p>
//             <Heart className="w-5 h-5 text-green-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-800">
//             {healthData.heartRate} <span className="text-sm font-medium">bpm</span>
//           </p>
//         </div>

//         {/* Blood Pressure */}
//         <div className="p-6 rounded-2xl shadow-sm bg-white border border-gray-100 transition-transform hover:scale-105">
//           <div className="flex justify-between items-center mb-3">
//             <p className="text-sm font-semibold text-gray-600">Blood Pressure</p>
//             <Activity className="w-5 h-5 text-red-400" />
//           </div>
//           <p className="text-2xl font-bold text-gray-800">{healthData.bloodPressure}</p>
//         </div>

//         {/* Glucose */}
//         <div className="p-6 rounded-2xl shadow-sm bg-white border border-gray-100 transition-transform hover:scale-105">
//           <div className="flex justify-between items-center mb-3">
//             <p className="text-sm font-semibold text-gray-600">Glucose</p>
//             <Droplets className="w-5 h-5 text-purple-500" />
//           </div>
//           <p className="text-2xl font-bold text-gray-800">
//             {healthData.glucose} <span className="text-sm font-medium">mg/dL</span>
//           </p>
//         </div>
//       </div>

//       {/* Add / Update Data Section */}
//       <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
//         <Activity className="mx-auto w-10 h-10 text-gray-400 mb-4" />
//         <h2 className="text-lg font-semibold text-gray-700 mb-2">
//           {healthData.weight !== "N/A" ? "Your Health Data" : "No health data yet"}
//         </h2>
//         <p className="text-gray-500 mb-6">
//           {healthData.weight !== "N/A"
//             ? "You can update your data anytime."
//             : "Start tracking your health by adding your first entry."}
//         </p>
//         <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-xl shadow-md transition-transform transform hover:scale-105">
//           <Link to="/question" state={{ user }}>
//             Add / Update Health Data
//           </Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import {
  Heart,
  Droplets,
  Activity,
  Lock,
  Brain,
  Moon,
  BatteryCharging,
  Users,
  Smartphone,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const user = location.state?.user || {};

  const [healthData, setHealthData] = useState({
    weight: "N/A",
    height: "N/A",
    heartRate: "N/A",
    bloodPressure: "N/A / N/A",
    glucose: "N/A",

    sleepHours: "N/A",
    sleepQuality: "N/A",
    stressLevel: "N/A",
    energyLevel: "N/A",
    focusLevel: "N/A",
    activityLevel: "N/A",
    waterIntake: "N/A",
    screenTimeHours: "N/A",
    socialInteractionLevel: "N/A",
  });

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/health/gethealthProfile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
          }
        );

        const data = await res.json();

        if (res.ok && data.health) {
          const h = data.health;

          setHealthData({
            weight: h.weight ?? "N/A",
            height: h.height ?? "N/A",
            heartRate: h.heartRate ?? "N/A",
            bloodPressure: `${h.bloodPressure?.systolic ?? "N/A"} / ${
              h.bloodPressure?.diastolic ?? "N/A"
            }`,
            glucose: h.glucose ?? "N/A",

            sleepHours: h.sleepHours ?? "N/A",
            sleepQuality: h.sleepQuality ?? "N/A",
            stressLevel: h.stressLevel ?? "N/A",
            energyLevel: h.energyLevel ?? "N/A",
            focusLevel: h.focusLevel ?? "N/A",
            activityLevel: h.activityLevel ?? "N/A",
            waterIntake: h.waterIntake ?? "N/A",
            screenTimeHours: h.screenTimeHours ?? "N/A",
            socialInteractionLevel: h.socialInteractionLevel ?? "N/A",
          });
        }
      } catch (error) {
        console.error("❌ Error fetching health data:", error);
      }
    };

    fetchHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white mt-10 px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {user.name || "Guest"}
      </h1>
      <p className="text-gray-600 mb-8">
        Your physical & mental wellness overview
      </p>

      {/* PHYSICAL HEALTH */}
      <Section title="Physical Health">
        <Card title="Weight" value={`${healthData.weight} kg`} icon={<Lock />} />
        <Card title="Height" value={`${healthData.height} cm`} icon={<Activity />} />
        <Card
          title="Heart Rate"
          value={`${healthData.heartRate} bpm`}
          icon={<Heart className="text-green-500" />}
        />
        <Card
          title="Blood Pressure"
          value={healthData.bloodPressure}
          icon={<Activity className="text-red-400" />}
        />
        <Card
          title="Glucose"
          value={`${healthData.glucose} mg/dL`}
          icon={<Droplets className="text-purple-500" />}
        />
      </Section>

      {/* MENTAL & LIFESTYLE HEALTH */}
      <Section title="Mental & Lifestyle Health">
        <Card
          title="Sleep Hours"
          value={`${healthData.sleepHours} hrs`}
          icon={<Moon />}
        />
        <Card
          title="Sleep Quality"
          value={`${healthData.sleepQuality} / 5`}
          icon={<Moon />}
        />
        <Card
          title="Stress Level"
          value={`${healthData.stressLevel} / 5`}
          icon={<Brain />}
        />
        <Card
          title="Energy Level"
          value={`${healthData.energyLevel} / 5`}
          icon={<BatteryCharging />}
        />
        <Card
          title="Focus Level"
          value={`${healthData.focusLevel} / 5`}
          icon={<Brain />}
        />
        <Card
          title="Activity Level"
          value={healthData.activityLevel}
          icon={<Activity />}
        />
        <Card
          title="Water Intake"
          value={`${healthData.waterIntake} L`}
          icon={<Droplets />}
        />
        <Card
          title="Screen Time"
          value={`${healthData.screenTimeHours} hrs`}
          icon={<Smartphone />}
        />
        <Card
          title="Social Interaction"
          value={healthData.socialInteractionLevel}
          icon={<Users />}
        />
      </Section>

      {/* UPDATE BUTTON */}
      <div className="text-center py-16 bg-white rounded-2xl shadow-sm border">
        <Link
          to="/question"
          state={{ user }}
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl shadow-md hover:scale-105 transition"
        >
          Add / Update Health Data
        </Link>
      </div>
    </div>
  );
};

/* ---------- Reusable Components ---------- */

const Section = ({ title, children }) => (
  <>
    <h2 className="text-xl font-semibold text-gray-700 mb-4 mt-10">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
    </div>
  </>
);

const Card = ({ title, value, icon }) => (
  <div className="p-6 rounded-2xl bg-white border shadow-sm hover:scale-105 transition">
    <div className="flex justify-between items-center mb-2">
      <p className="text-sm font-semibold text-gray-600">{title}</p>
      {icon}
    </div>
    <p className="text-xl font-bold text-gray-800">{value}</p>
  </div>
);

export default Profile;
