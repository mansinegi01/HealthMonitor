// // // import React, { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const Report = () => {
// // //   const navigate = useNavigate();
// // //   const token = localStorage.getItem("token");

// // //   const [showPrompt, setShowPrompt] = useState(true);
// // //   const [logs, setLogs] = useState([]);

// // //   useEffect(() => {
// // //     const fetchLogs = async () => {
// // //       const res = await fetch(
// // //         "http://localhost:8000/api/health/daily-checkin",
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );
// // //       const data = await res.json();
// // //       setLogs(data.logs || []);
// // //     };
// // //     fetchLogs();
// // //   }, [token]);

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 pt-28 px-6 pb-20">

// // //       {/* ===== POPUP ===== */}
// // //       {showPrompt && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
// // //           <div className="bg-white p-8 rounded-xl shadow-lg text-center">
// // //             <h2 className="text-xl font-semibold mb-6">
// // //               How was your day today?
// // //             </h2>
// // //             <div className="flex justify-center gap-6">
// // //               <button
// // //                 onClick={() => navigate("/daily-checkin")}
// // //                 className="px-6 py-2 bg-blue-600 text-white rounded-lg"
// // //               >
// // //                 How was today?
// // //               </button>
// // //               <button
// // //                 onClick={() => setShowPrompt(false)}
// // //                 className="px-6 py-2 text-gray-600"
// // //               >
// // //                 Skip
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* ===== TODAY SUMMARY ===== */}
// // //       {logs.length > 0 && (
// // //         <div className="bg-white p-6 rounded-xl border mb-10">
// // //           <h3 className="text-lg font-semibold mb-3">
// // //             Today’s Health Summary
// // //           </h3>
// // //           <p>Sleep: {logs[0].sleepHours || "N/A"} hrs</p>
// // //           <p>Stress: {logs[0].stressLevel || "N/A"}</p>
// // //           <p>Energy: {logs[0].energyLevel || "N/A"}</p>
// // //           <p>Focus: {logs[0].focusLevel || "N/A"}</p>
// // //         </div>
// // //       )}

// // //       {/* ===== GENERATE REPORT ===== */}
// // //       <div className="text-center mt-20">
// // //         <button
// // //           onClick={() => navigate("/final-report")}
// // //           className="px-8 py-4 bg-green-600 text-white rounded-xl"
// // //         >
// // //           Generate Report
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Report;
// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const Report = () => {
// //   const navigate = useNavigate();
// //   const token = localStorage.getItem("token");

// //   const [showPrompt, setShowPrompt] = useState(true);
// //   const [logs, setLogs] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchLogs = async () => {
// //       try {
// //         const res = await fetch(
// //           "http://localhost:8000/api/health/daily-checkin",
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           }
// //         );

// //         const data = await res.json();
// //         setLogs(data.logs || []);
// //       } catch (err) {
// //         console.error("Failed to fetch logs", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchLogs();
// //   }, [token]);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-6 pt-28 pb-20">

// //       {/* ================= MODAL ================= */}
// //       {showPrompt && (
// //         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
// //           <div className="bg-white w-[90%] max-w-md p-8 rounded-2xl shadow-2xl text-center animate-fadeIn">

// //             <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
// //               🧠
// //             </div>

// //             <h2 className="text-2xl font-semibold text-gray-800 mb-2">
// //               How was your day?
// //             </h2>
// //             <p className="text-gray-500 mb-6">
// //               A quick daily check-in helps track your mental well-being.
// //             </p>

// //             <div className="flex justify-center gap-4">
// //               <button
// //                 onClick={() => navigate("/daily-checkin")}
// //                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl font-medium shadow"
// //               >
// //                 Start Check-in
// //               </button>

// //               <button
// //                 onClick={() => setShowPrompt(false)}
// //                 className="px-6 py-3 text-gray-500 hover:text-gray-700 transition"
// //               >
// //                 Skip
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ================= HEADER ================= */}
// //       <div className="max-w-4xl mx-auto text-center mb-14">
// //         <h1 className="text-3xl font-bold text-gray-800 mb-2">
// //           Health Report
// //         </h1>
// //         <p className="text-gray-500">
// //           Overview of your daily mental and physical well-being
// //         </p>
// //       </div>

// //       {/* ================= TODAY SUMMARY ================= */}
// //       <div className="max-w-4xl mx-auto">
// //         {loading ? (
// //           <div className="text-center text-gray-500">Loading data...</div>
// //         ) : logs.length > 0 ? (
// //           <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
// //             <h3 className="text-xl font-semibold text-gray-800 mb-6">
// //               Today’s Summary
// //             </h3>

// //             <div className="grid sm:grid-cols-2 gap-6 text-gray-700">
// //               <div className="flex justify-between">
// //                 <span>😴 Sleep Hours</span>
// //                 <strong>{logs[0].sleepHours || "N/A"} hrs</strong>
// //               </div>

// //               <div className="flex justify-between">
// //                 <span>⚡ Energy Level</span>
// //                 <strong>{logs[0].energyLevel || "N/A"}</strong>
// //               </div>

// //               <div className="flex justify-between">
// //                 <span>😟 Stress Level</span>
// //                 <strong>{logs[0].stressLevel || "N/A"}</strong>
// //               </div>

// //               <div className="flex justify-between">
// //                 <span>🎯 Focus Level</span>
// //                 <strong>{logs[0].focusLevel || "N/A"}</strong>
// //               </div>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="bg-white p-8 rounded-2xl shadow-md text-center text-gray-600">
// //             No check-in found for today.
// //           </div>
// //         )}
// //       </div>

// //       {/* ================= GENERATE REPORT ================= */}
// //       <div className="text-center mt-20">
// //         <button
// //           onClick={() => navigate("/final-report")}
// //           className="px-10 py-4 bg-green-600 hover:bg-green-700 transition text-white rounded-2xl text-lg font-semibold shadow-lg"
// //         >
// //           Generate Full Report
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Report;
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const Report = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const token = localStorage.getItem("token");

//   // ✅ Modal logic fixed
//   const [showPrompt, setShowPrompt] = useState(
//     !location.state?.fromCheckin
//   );

//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLogs = async () => {
//       try {
//         const res = await fetch(
//           "http://localhost:8000/api/health/daily-checkin",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const data = await res.json();
//         setLogs(data.logs || []);

//         // ✅ If data exists, don't show modal
//         if (data.logs?.length > 0) {
//           setShowPrompt(false);
//         }
//       } catch (err) {
//         console.error("Failed to fetch logs", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLogs();
//   }, [token]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-6 pt-28 pb-20">

//       {showPrompt && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-2xl text-center">
//             <h2 className="text-2xl font-semibold mb-2">How was your day?</h2>
//             <p className="mb-6">A quick daily check-in helps track well-being.</p>

//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => navigate("/daily-checkin")}
//                 className="px-6 py-3 bg-blue-600 text-white rounded-xl"
//               >
//                 Start Check-in
//               </button>
//               <button
//                 onClick={() => setShowPrompt(false)}
//                 className="px-6 py-3 text-gray-500"
//               >
//                 Skip
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="max-w-4xl mx-auto text-center mb-14">
//         <h1 className="text-3xl font-bold">Health Report</h1>
//         <p className="text-gray-500">Your daily wellness overview</p>
//       </div>

//       <div className="max-w-4xl mx-auto">
//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : logs.length > 0 ? (
//           <div className="bg-white p-8 rounded-2xl shadow">
//             <h3 className="text-xl font-semibold mb-6">Today’s Summary</h3>

//             <div className="grid sm:grid-cols-2 gap-6">
//               <div className="flex justify-between"><span>Sleep</span><strong>{logs[0].sleepHours} hrs</strong></div>
//               <div className="flex justify-between"><span>Energy</span><strong>{logs[0].energyLevel}</strong></div>
//               <div className="flex justify-between"><span>Stress</span><strong>{logs[0].stressLevel}</strong></div>
//               <div className="flex justify-between"><span>Focus</span><strong>{logs[0].focusLevel}</strong></div>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white p-8 rounded-2xl text-center">
//             No check-in found.
//           </div>
//         )}
//       </div>

//       <div className="text-center mt-20">
//         <button
//           onClick={() => navigate("/final-report")}
//           className="px-10 py-4 bg-green-600 text-white rounded-2xl"
//         >
//           Generate Full Report
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Report;
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [showPrompt, setShowPrompt] = useState(
    !location.state?.fromCheckin
  );
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/health/daily-checkin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (!res.ok) throw new Error("Unauthorized or Server Error");

    const data = await res.json();
    setLogs(data.logs || []);
    // ... rest of logic
  } catch (err) {
    console.error("Failed to fetch logs", err);
    // If token is expired, redirect to login
    if (err.message.includes("Unauthorized")) navigate("/login");
  } finally {
    setLoading(false);
  }
};

    fetchLogs();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-6 pt-24 pb-20">

      {/* ===== POPUP ===== */}
      {showPrompt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-2">
              How was today?
            </h2>
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
        <h1 className="text-3xl font-bold text-gray-800">
          Health Report
        </h1>
        <p className="text-gray-500">
          Overview of your daily well-being
        </p>
      </div>

      {/* ===== SUMMARY ===== */}
      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : logs.length > 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow border">
            <h3 className="text-xl font-semibold mb-6">
              Today’s Summary
            </h3>

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
