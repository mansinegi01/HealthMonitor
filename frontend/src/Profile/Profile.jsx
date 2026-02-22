
// // // import React from "react";
// // // import { Calendar, TrendingUp, Download } from "lucide-react";
// // // import { Link, useLocation } from "react-router-dom";

// // // const Profile = () => {
// // //   const location = useLocation();
// // //   const user = location.state?.user || {};

// // //   return (
// // //     // Background color updated to match the creamy-white in the image
// // //     <div className="min-h-screen bg-[#fbf7f4] py-16 font-sans">
// // //       <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
        
// // //         {/* HEADER - Centered Text */}
// // //         <div className="mb-10 ">
// // //           <h1 className="text-[28px] font-bold text-[#1a2b4b] tracking-tight">
// // //             Your Mood Journey
// // //           </h1>
// // //           <p className="text-[#6b7280] mt-1 text-base">
// // //             Track your emotional patterns over time
// // //           </p>
// // //         </div>

// // //         {/* SUMMARY CARDS - More compact grid */}
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
// // //           <SummaryCard
// // //             icon={<Calendar size={18} className="text-orange-400" />}
// // //             title="Days Tracked"
// // //             value="0"
// // //           />
// // //           <SummaryCard
// // //             icon={<TrendingUp size={18} className="text-emerald-600" />}
// // //             title="Top Mood"
// // //             value="—"
// // //           />
// // //           <SummaryCard
// // //             icon={<Download size={18} className="text-[#1a2b4b]" />}
// // //             title="Report"
// // //             value="15 days left"
// // //             isLast={true}
// // //           />
// // //         </div>

// // //         {/* MAIN CARD - Larger padding and specific border radius */}
// // //         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 w-full mb-10 min-h-[400px] flex flex-col">
// // //           <h2 className="text-lg font-bold text-[#1a2b4b] mb-6">
// // //             Mood Timeline
// // //           </h2>

// // //           <div className="flex-1 flex flex-col items-center justify-center text-[#6b7280] gap-2">
// // //             <p className="text-base">No mood data yet. Start tracking! 🌱</p>
// // //           </div>
// // //         </div>

// // //         {/* UNLOCK SECTION - Centered Button */}
// // //         <div className="text-center w-full">
// // //           <Link
// // //             to="/question"
// // //             state={{ user }}
// // //             className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#eeeae5] text-[#4b5563] rounded-2xl font-semibold text-sm hover:bg-[#e5e0da] transition-all"
// // //           >
// // //             <Download size={16} />
// // //             Track 15 more days to unlock
// // //           </Link>

// // //           <p className="text-[11px] text-[#9ca3af] mt-4 max-w-sm mx-auto leading-relaxed">
// // //             Your health report with insights & precautions will be available after 15 days of tracking
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const SummaryCard = ({ icon, title, value }) => (
// // //   <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-32">
// // //     <div className="flex items-center gap-3 mb-4">
// // //       <div className="p-2 rounded-xl bg-orange-50/50">
// // //         {icon}
// // //       </div>
// // //       <p className="text-xs font-medium text-[#9ca3af] uppercase tracking-wider">{title}</p>
// // //     </div>
// // //     <p className="text-3xl font-bold text-[#1a2b4b] mt-auto">{value}</p>
// // //   </div>
// // // );

// // // export default Profile;
// // import React, { useState, useEffect } from "react";
// // import { Calendar, TrendingUp, Download, Lock } from "lucide-react";
// // import axios from "axios";

// // const Profile = () => {
// //   const [moodHistory, setMoodHistory] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const res = await axios.get("http://localhost:8000/api/mood/user-history", {
// //           headers: { Authorization: `Bearer ${token}` }
// //         });
// //         setMoodHistory(res.data); // Expecting an array of mood logs
// //       } catch (err) {
// //         console.error("Error fetching mood history", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, []);

// //   // --- STATS LOGIC ---
// //   const daysTracked = moodHistory.length;
// //   const daysLeft = Math.max(0, 14 - daysTracked);
// //   const canDownload = daysTracked >= 14;

// //   const getTopMood = () => {
// //     if (daysTracked === 0) return "—";
// //     const counts = moodHistory.reduce((acc, curr) => {
// //       acc[curr.mood] = (acc[curr.mood] || 0) + 1;
// //       return acc;
// //     }, {});
// //     return Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b));
// //   };

// //   if (loading) return <div className="min-h-screen bg-[#fbf7f4] flex items-center justify-center">Loading...</div>;

// //   return (
// //     <div className="min-h-screen bg-[#fbf7f4] py-16 font-sans">
// //       <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">
        
// //         {/* HEADER */}
// //         <div className="mb-10 text-center">
// //           <h1 className="text-[28px] font-bold text-[#1a2b4b] tracking-tight">Your Mood Journey</h1>
// //           <p className="text-[#6b7280] mt-1 text-base">Track your emotional patterns over time</p>
// //         </div>

// //         {/* SUMMARY CARDS */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-6">
// //           <SummaryCard 
// //             icon={<Calendar size={18} className="text-orange-400" />} 
// //             title="Days Tracked" 
// //             value={daysTracked} 
// //           />
// //           <SummaryCard 
// //             icon={<TrendingUp size={18} className="text-emerald-600" />} 
// //             title="Top Mood" 
// //             value={getTopMood()} 
// //           />
// //           <SummaryCard 
// //             icon={<Download size={18} className="text-[#1a2b4b]" />} 
// //             title="Report Status" 
// //             value={canDownload ? "Ready" : `${daysLeft} days left`} 
// //           />
// //         </div>

// //         {/* MAIN CHART AREA */}
// //         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 w-full mb-10 min-h-[350px] flex flex-col items-center justify-center">
// //           <h2 className="text-lg font-bold text-[#1a2b4b] mb-6 self-start">Mood Timeline</h2>
// //           {daysTracked > 0 ? (
// //             <div className="w-full h-full flex items-end justify-around gap-2 px-4">
// //               {/* Simple Visual Representation of mood history */}
// //               {moodHistory.slice(-14).map((item, idx) => (
// //                 <div key={idx} className="flex flex-col items-center gap-2">
// //                   <div className="w-8 bg-indigo-100 rounded-t-lg transition-all" style={{ height: `${(idx + 1) * 15}px` }} />
// //                   <span className="text-[10px] text-gray-400 uppercase">{item.mood.substring(0,3)}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <p className="text-[#6b7280]">No mood data yet. Start tracking! 🌱</p>
// //           )}
// //         </div>

// //         {/* ACTION BUTTON */}
// //         <div className="text-center w-full">
// //           {canDownload ? (
// //             <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a2b4b] text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">
// //               <Download size={16} />
// //               Download Wellness Report
// //             </button>
// //           ) : (
// //             <button disabled className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#eeeae5] text-[#9ca3af] rounded-2xl font-bold text-sm cursor-not-allowed">
// //               <Lock size={16} />
// //               Track {daysLeft} more days to unlock
// //             </button>
// //           )}
// //           <p className="text-[11px] text-[#9ca3af] mt-4 max-w-sm mx-auto">
// //             Your comprehensive health report with personalized insights will be available after 14 days of activity.
// //           </p>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // const SummaryCard = ({ icon, title, value }) => (
// //   <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-32">
// //     <div className="flex items-center gap-3 mb-4">
// //       <div className="p-2 rounded-xl bg-gray-50">{icon}</div>
// //       <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">{title}</p>
// //     </div>
// //     <p className="text-3xl font-bold text-[#1a2b4b] mt-auto capitalize">{value}</p>
// //   </div>
// // );

// // export default Profile;
// import React, { useState, useEffect } from "react";
// import { Calendar, TrendingUp, Download, Lock } from "lucide-react";
// import axios from "axios";

// const Profile = () => {
//   const [stats, setStats] = useState({
//     daysTracked: 0,
//     topMood: "—",
//     reportUnlocked: false
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           "http://localhost:8000/api/mood/stats",
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );

//         setStats(res.data);

//       } catch (err) {
//         console.error("Failed to fetch stats", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#fbf7f4] flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   const daysLeft = Math.max(0, 14 - stats.daysTracked);

//   return (
//     <div className="min-h-screen bg-[#fbf7f4] py-16 font-sans">
//       <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">

//         {/* HEADER */}
//         <div className="mb-10 text-center">
//           <h1 className="text-[28px] font-bold text-[#1a2b4b]">
//             Your Mood Journey
//           </h1>
//           <p className="text-[#6b7280] mt-1">
//             Track your emotional patterns over time
//           </p>
//         </div>

//         {/* SUMMARY CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
//           <SummaryCard
//             icon={<Calendar size={18} className="text-orange-400" />}
//             title="Days Tracked"
//             value={stats.daysTracked}
//           />
//           <SummaryCard
//             icon={<TrendingUp size={18} className="text-emerald-600" />}
//             title="Top Mood"
//             value={stats.topMood}
//           />
//           <SummaryCard
//             icon={<Download size={18} className="text-[#1a2b4b]" />}
//             title="Report Status"
//             value={stats.reportUnlocked ? "Ready" : `${daysLeft} days left`}
//           />
//         </div>

//         {/* MAIN SECTION */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 w-full mb-10 min-h-[300px] flex items-center justify-center">
//           {stats.daysTracked === 0 ? (
//             <p className="text-[#6b7280]">
//               No mood data yet. Start tracking! 🌱
//             </p>
//           ) : (
//             <p className="text-[#1a2b4b] font-semibold">
//               You've tracked your mood for {stats.daysTracked} days.
//             </p>
//           )}
//         </div>

//         {/* REPORT BUTTON */}
//         <div className="text-center w-full">
//           {stats.reportUnlocked ? (
//             <button
//               onClick={async () => {
//                 const token = localStorage.getItem("token");
//                 await axios.get(
//                   "http://localhost:8000/api/mood/report",
//                   {
//                     headers: { Authorization: `Bearer ${token}` }
//                   }
//                 );
//                 alert("Report Generated!");
//               }}
//               className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a2b4b] text-white rounded-2xl font-bold hover:bg-black transition-all"
//             >
//               <Download size={16} />
//               Download Wellness Report
//             </button>
//           ) : (
//             <button
//               disabled
//               className="inline-flex items-center gap-2 px-8 py-4 bg-[#eeeae5] text-[#9ca3af] rounded-2xl font-bold cursor-not-allowed"
//             >
//               <Lock size={16} />
//               Track {daysLeft} more days to unlock
//             </button>
//           )}

//           <p className="text-[11px] text-[#9ca3af] mt-4 max-w-sm mx-auto">
//             Your personalized report unlocks after 14 days of tracking.
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// const SummaryCard = ({ icon, title, value }) => (
//   <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-32">
//     <div className="flex items-center gap-3 mb-4">
//       <div className="p-2 rounded-xl bg-gray-50">
//         {icon}
//       </div>
//       <p className="text-xs font-semibold text-[#9ca3af] uppercase">
//         {title}
//       </p>
//     </div>
//     <p className="text-3xl font-bold text-[#1a2b4b] mt-auto capitalize">
//       {value}
//     </p>
//   </div>
// );

// export default Profile;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  TrendingUp,
  Download,
  Lock
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const Profile = () => {
  const [stats, setStats] = useState({
    daysTracked: 0,
    topMood: "—",
    reportUnlocked: false
  });

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const moodValueMap = {
    sad: 1,
    anxious: 2,
    tired: 3,
    neutral: 4,
    good: 5,
    happy: 6,
    excited: 7
  };

  const moodLabelMap = {
    1: "Sad 😢",
    2: "Anxious 😟",
    3: "Tired 😴",
    4: "Neutral 😐",
    5: "Good 🙂",
    6: "Happy 😊",
    7: "Excited 🤩"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [statsRes, historyRes] = await Promise.all([
          axios.get("http://localhost:8000/api/mood/stats", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:8000/api/mood/history", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setStats(statsRes.data);
        setHistory(historyRes.data);

      } catch (error) {
        console.error("Error fetching profile data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formattedData = history.map((item) => ({
    date: item.date,
    value: moodValueMap[item.mood]
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf7f4] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const daysLeft = Math.max(0, 14 - stats.daysTracked);

  return (
    <div className="min-h-screen bg-[#fbf7f4] py-16 font-sans">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-[28px] font-bold text-[#1a2b4b]">
            Your Mood Journey
          </h1>
          <p className="text-[#6b7280] mt-1">
            Track your emotional patterns over time
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-8">
          <SummaryCard
            icon={<Calendar size={18} className="text-orange-400" />}
            title="Days Tracked"
            value={stats.daysTracked}
          />
          <SummaryCard
            icon={<TrendingUp size={18} className="text-emerald-600" />}
            title="Top Mood"
            value={stats.topMood}
          />
          <SummaryCard
            icon={<Download size={18} className="text-[#1a2b4b]" />}
            title="Report Status"
            value={
              stats.reportUnlocked
                ? "Ready"
                : `${daysLeft} days left`
            }
          />
        </div>

        {/* MOOD TIMELINE GRAPH */}
        {/* <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 w-full mb-10">
          <h2 className="text-lg font-bold text-[#1a2b4b] mb-6">
            Mood Timeline
          </h2>

          {formattedData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis
                  domain={[1, 7]}
                  ticks={[1,2,3,4,5,6,7]}
                  tickFormatter={(value) => moodLabelMap[value]}
                />
                <Tooltip
                  formatter={(value) => moodLabelMap[value]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-[#6b7280]">
              No mood data yet. Start tracking! 🌱
            </p>
          )}
        </div> */}
        <ResponsiveContainer width="100%" height={320}>
  <LineChart
    data={formattedData}
    margin={{ top: 20, right: 20, left: 60, bottom: 20 }}
  >
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis
      dataKey="date"
      tick={{ fontSize: 12 }}
      tickFormatter={(date) =>
        new Date(date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short"
        })
      }
    />

    <YAxis
      domain={[1, 7]}
      ticks={[1,2,3,4,5,6,7]}
      width={80}
      tick={{ fontSize: 12 }}
      tickFormatter={(value) => moodLabelMap[value]}
    />

    <Tooltip
      formatter={(value) => moodLabelMap[value]}
      labelFormatter={(label) =>
        new Date(label).toDateString()
      }
    />

    <Line
      type="monotone"
      dataKey="value"
      stroke="#6366f1"
      strokeWidth={3}
      dot={{ r: 6 }}
      activeDot={{ r: 8 }}
    />
  </LineChart>
</ResponsiveContainer>

        {/* REPORT BUTTON */}
        <div className="text-center w-full">
          {stats.reportUnlocked ? (
            <button
              onClick={async () => {
                const token = localStorage.getItem("token");
                await axios.get(
                  "http://localhost:8000/api/mood/report",
                  {
                    headers: { Authorization: `Bearer ${token}` }
                  }
                );
                alert("Report Generated Successfully!");
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a2b4b] text-white rounded-2xl font-bold hover:bg-black transition-all"
            >
              <Download size={16} />
              Download Wellness Report
            </button>
          ) : (
            <button
              disabled
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#eeeae5] text-[#9ca3af] rounded-2xl font-bold cursor-not-allowed"
            >
              <Lock size={16} />
              Track {daysLeft} more days to unlock
            </button>
          )}

          <p className="text-[11px] text-[#9ca3af] mt-4 max-w-sm mx-auto">
            Your personalized wellness report unlocks after 14 days of tracking.
          </p>
        </div>

      </div>
    </div>
  );
};

const SummaryCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col h-32">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-xl bg-gray-50">
        {icon}
      </div>
      <p className="text-xs font-semibold text-[#9ca3af] uppercase">
        {title}
      </p>
    </div>
    <p className="text-3xl font-bold text-[#1a2b4b] mt-auto capitalize">
      {value}
    </p>
  </div>
);

export default Profile;