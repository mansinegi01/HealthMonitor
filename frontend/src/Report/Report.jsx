
// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";

// // const Report = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const token = localStorage.getItem("token");

// //   const [showPrompt, setShowPrompt] = useState(
// //     !location.state?.fromCheckin
// //   );
// //   const [logs, setLogs] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchLogs = async () => {
// //   try {
// //     const res = await fetch("http://localhost:8000/api/health/daily-checkin", {
// //       headers: { Authorization: `Bearer ${token}` },
// //     });
    
// //     if (!res.ok) throw new Error("Unauthorized or Server Error");

// //     const data = await res.json();
// //     setLogs(data.logs || []);
// //     // ... rest of logic
// //   } catch (err) {
// //     console.error("Failed to fetch logs", err);
// //     // If token is expired, redirect to login
// //     if (err.message.includes("Unauthorized")) navigate("/login");
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// //     fetchLogs();
// //   }, [token]);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-6 pt-24 pb-20">

// //       {/* ===== POPUP ===== */}
// //       {showPrompt && (
// //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
// //           <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
// //             <h2 className="text-2xl font-semibold mb-2">
// //               How was today?
// //             </h2>
// //             <p className="text-gray-500 mb-6">
// //               A quick check-in helps track your well-being.
// //             </p>

// //             <div className="flex justify-center gap-4">
// //               <button
// //                 onClick={() => navigate("/daily-checkin")}
// //                 className="px-6 py-3 bg-blue-600 text-white rounded-xl"
// //               >
// //                 Start Check-in
// //               </button>

// //               <button
// //                 onClick={() => setShowPrompt(false)}
// //                 className="px-6 py-3 text-gray-600"
// //               >
// //                 Skip
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ===== HEADER ===== */}
// //       <div className="max-w-4xl mx-auto text-center mb-12">
// //         <h1 className="text-3xl font-bold text-gray-800">
// //           Health Report
// //         </h1>
// //         <p className="text-gray-500">
// //           Overview of your daily well-being
// //         </p>
// //       </div>

// //       {/* ===== SUMMARY ===== */}
// //       <div className="max-w-4xl mx-auto">
// //         {loading ? (
// //           <p className="text-center text-gray-500">Loading...</p>
// //         ) : logs.length > 0 ? (
// //           <div className="bg-white p-8 rounded-2xl shadow border">
// //             <h3 className="text-xl font-semibold mb-6">
// //               Today’s Summary
// //             </h3>

// //             <div className="grid sm:grid-cols-2 gap-6 text-gray-700">
// //               <div className="flex justify-between">
// //                 <span>Sleep Hours</span>
// //                 <strong>{logs[0].sleepHours ?? "N/A"}</strong>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span>Energy</span>
// //                 <strong>{logs[0].energyLevel ?? "N/A"}</strong>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span>Stress</span>
// //                 <strong>{logs[0].stressLevel ?? "N/A"}</strong>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span>Focus</span>
// //                 <strong>{logs[0].focusLevel ?? "N/A"}</strong>
// //               </div>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="bg-white p-8 rounded-2xl shadow text-center">
// //             No check-in available.
// //           </div>
// //         )}
// //       </div>

// //       {/* ===== GENERATE REPORT ===== */}
// //       <div className="text-center mt-20">
// //         <button
// //           onClick={() => navigate("/final-report")}
// //           className="px-10 py-4 bg-green-600 text-white rounded-2xl text-lg shadow-lg"
// //         >
// //           Generate Full Report
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

//   // export default Report;
//   import React, { useEffect, useState } from "react";
//   import { useNavigate, useLocation } from "react-router-dom";

//   // 🔹 ADDED: chart imports
//   import { Pie } from "react-chartjs-2";
//   import {
//     Chart as ChartJS,
//     ArcElement,
//     Tooltip,
//     Legend,
//   } from "chart.js";

//   ChartJS.register(ArcElement, Tooltip, Legend);

//   const Report = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const token = localStorage.getItem("token");

//     const [showPrompt, setShowPrompt] = useState(
//       !location.state?.fromCheckin
//     );
//     const [logs, setLogs] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // 🔹 ADDED: mood state
//     const [moodSummary, setMoodSummary] = useState([]);

//     useEffect(() => {
//       const fetchLogs = async () => {
//         try {
//           const res = await fetch(
//             "http://localhost:8000/api/health/daily-checkin",
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );

//           if (!res.ok) throw new Error("Unauthorized or Server Error");

//           const data = await res.json();
//           setLogs(data.logs || []);

//           // 🔹 ADDED: fetch mood summary
//           const payload = JSON.parse(atob(token.split(".")[1]));
//           const userId = payload.id;

//           const today = new Date();
//           const year = today.getFullYear();
//           const month = today.getMonth() + 1;

//           const moodRes = await fetch(
//             `http://localhost:8000/api/mood/summary/${userId}/${year}/${month}`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );

//           const moodData = await moodRes.json();
//           setMoodSummary(moodData);
//         } catch (err) {
//           console.error("Failed to fetch logs", err);
//           if (err.message.includes("Unauthorized")) navigate("/login");
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchLogs();
//     }, [token, navigate]);

//     // 🔹 ADDED: chart data
//     const moodChartData = {
//       labels: moodSummary.map((m) => m._id),
//       datasets: [
//         {
//           data: moodSummary.map((m) => m.count),
//           backgroundColor: [
//             "#22c55e", // happy
//             "#ef4444", // sad
//             "#eab308", // neutral
//             "#3b82f6", // anxious
//             "#a855f7", // stressed
//           ],
//         },
//       ],
//     };

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-6 pt-24 pb-20">

//         {/* ===== POPUP ===== */}
//         {showPrompt && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
//               <h2 className="text-2xl font-semibold mb-2">
//                 How was today?
//               </h2>
//               <p className="text-gray-500 mb-6">
//                 A quick check-in helps track your well-being.
//               </p>

//               <div className="flex justify-center gap-4">
//                 <button
//                   onClick={() => navigate("/daily-checkin")}
//                   className="px-6 py-3 bg-blue-600 text-white rounded-xl"
//                 >
//                   Start Check-in
//                 </button>

//                 <button
//                   onClick={() => setShowPrompt(false)}
//                   className="px-6 py-3 text-gray-600"
//                 >
//                   Skip
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ===== HEADER ===== */}
//         <div className="max-w-4xl mx-auto text-center mb-12">
//           <h1 className="text-3xl font-bold text-gray-800">
//             Health Report
//           </h1>
//           <p className="text-gray-500">
//             Overview of your daily well-being
//           </p>
//         </div>

//         {/* ===== SUMMARY ===== */}
//         <div className="max-w-4xl mx-auto">
//           {loading ? (
//             <p className="text-center text-gray-500">Loading...</p>
//           ) : logs.length > 0 ? (
//             <div className="bg-white p-8 rounded-2xl shadow border">
//               <h3 className="text-xl font-semibold mb-6">
//                 Today’s Summary
//               </h3>

//               <div className="grid sm:grid-cols-2 gap-6 text-gray-700">
//                 <div className="flex justify-between">
//                   <span>Sleep Hours</span>
//                   <strong>{logs[0].sleepHours ?? "N/A"}</strong>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Energy</span>
//                   <strong>{logs[0].energyLevel ?? "N/A"}</strong>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Stress</span>
//                   <strong>{logs[0].stressLevel ?? "N/A"}</strong>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Focus</span>
//                   <strong>{logs[0].focusLevel ?? "N/A"}</strong>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="bg-white p-8 rounded-2xl shadow text-center">
//               No check-in available.
//             </div>
//           )}
//         </div>

//         {/* 🔹 ADDED: MOOD GRAPH */}
//         {moodSummary.length > 0 && (
//           <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow">
//             <h3 className="text-xl font-semibold mb-6">
//               Mood Distribution (This Month)
//             </h3>
//             <Pie data={moodChartData} />
//           </div>
//         )}

//         {/* ===== GENERATE REPORT ===== */}
//         <div className="text-center mt-20">
//           <button
//             onClick={() => navigate("/final-report")}
//             className="px-10 py-4 bg-green-600 text-white rounded-2xl text-lg shadow-lg"
//           >
//             Generate Full Report
//           </button>
//         </div>
//       </div>
//     );
//   };

//   export default Report;
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Chart imports
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [showPrompt, setShowPrompt] = useState(
    !location.state?.fromCheckin
  );
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mood state
  const [moodSummary, setMoodSummary] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        /* ================= HEALTH LOGS ================= */
        const res = await fetch(
          "http://localhost:8000/api/health/daily-checkin",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setLogs(data.logs || []);

        /* ================= MOOD SUMMARY ================= */
        const payload = JSON.parse(atob(token.split(".")[1]));

        // ✅ FIX 1: correct userId
        const userId = payload._id || payload.id;

        if (!userId) {
          console.error("User ID missing in token");
          return;
        }

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;

        const moodRes = await fetch(
          `http://localhost:8000/api/mood/summary/${userId}/${year}/${month}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const moodData = await moodRes.json();

        // ✅ FIX 2: ensure array
        if (Array.isArray(moodData)) {
          setMoodSummary(moodData);
        } else {
          setMoodSummary([]);
        }
      } catch (err) {
        console.error("Failed to fetch report data", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  /* ================= CHART DATA ================= */
  const moodChartData = {
    labels: moodSummary.map((m) => m._id),
    datasets: [
      {
        data: moodSummary.map((m) => m.count),
        backgroundColor: [
          "#22c55e", // happy
          "#ef4444", // sad
          "#eab308", // neutral
          "#3b82f6", // anxious
          "#a855f7", // stressed
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-6 pt-24 pb-20">

      {/* ===== POPUP ===== */}
      {showPrompt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-2">How was today?</h2>
            <p className="text-gray-500 mb-6">
              A quick check-in helps track your well-being.
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/daily-checkin")}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl"
              >
                Start Check-in
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="px-6 py-3 text-gray-600"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== HEADER ===== */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">Health Report</h1>
        <p className="text-gray-500">Overview of your daily well-being</p>
      </div>

      {/* ===== SUMMARY ===== */}
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : logs.length > 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow border">
            <h3 className="text-xl font-semibold mb-6">Today’s Summary</h3>

            <div className="grid sm:grid-cols-2 gap-6 text-gray-700">
              <div className="flex justify-between">
                <span>Sleep Hours</span>
                <strong>{logs[0].sleepHours ?? "N/A"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Energy</span>
                <strong>{logs[0].energyLevel ?? "N/A"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Stress</span>
                <strong>{logs[0].stressLevel ?? "N/A"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Focus</span>
                <strong>{logs[0].focusLevel ?? "N/A"}</strong>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow text-center">
            No check-in available.
          </div>
        )}
      </div>

      {/* ===== MOOD GRAPH ===== */}
      {moodSummary.length > 0 && (
        <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-6">
            Mood Distribution (This Month)
          </h3>
          <Pie data={moodChartData} />
        </div>
      )}

      {/* ===== GENERATE REPORT ===== */}
      <div className="text-center mt-20">
        <button
          onClick={() => navigate("/final-report")}
          className="px-10 py-4 bg-green-600 text-white rounded-2xl text-lg shadow-lg"
        >
          Generate Full Report
        </button>
      </div>
    </div>
  );
};

export default Report;
