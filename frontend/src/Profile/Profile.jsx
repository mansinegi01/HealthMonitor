
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Calendar,
//   TrendingUp,
//   Download,
//   Lock,
//   RotateCcw
// } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid
// } from "recharts";

// const Profile = () => {
//   const [stats, setStats] = useState({
//     daysTracked: 0,
//     topMood: "—",
//     reportUnlocked: false
//   });

//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const moodValueMap = {
//     sad: 1,
//     anxious: 2,
//     tired: 3,
//     neutral: 4,
//     good: 5,
//     happy: 6,
//     excited: 7
//   };

//   const moodLabelMap = {
//     1: "Sad 😢",
//     2: "Anxious 😟",
//     3: "Tired 😴",
//     4: "Neutral 😐",
//     5: "Good 🙂",
//     6: "Happy 😊",
//     7: "Excited 🤩"
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const [statsRes, historyRes] = await Promise.all([
//           axios.get("http://localhost:8000/api/mood/stats", {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           axios.get("http://localhost:8000/api/mood/history", {
//             headers: { Authorization: `Bearer ${token}` }
//           })
//         ]);

//         setStats(statsRes.data);
//         setHistory(historyRes.data);

//       } catch (error) {
//         console.error("Error fetching profile data", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handles clearing the tracking numbers locally and on the server
//   const handleResetProgress = async () => {
//     const confirmReset = window.confirm(
//       "Are you sure you want to reset your mood tracking progress back to 0 days?"
//     );
//     if (!confirmReset) return;

//     try {
//       const token = localStorage.getItem("token");
      
//       // OPTIONAL: Call backend API endpoint if your server supports a wipe/reset route
//       // await axios.post("http://localhost:8000/api/mood/reset", {}, {
//       //   headers: { Authorization: `Bearer ${token}` }
//       // });

//       // Update UI state instantly to 0 tracked days
//       setStats((prev) => ({
//         ...prev,
//         daysTracked: 0,
//         reportUnlocked: false
//       }));
//       setHistory([]); // Clears history array to match reset values

//     } catch (error) {
//       console.error("Error resetting tracking progress", error);
//     }
//   };

//   const formattedData = history.map((item) => ({
//     date: item.date,
//     value: moodValueMap[item.mood]
//   }));

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
//             value={
//               stats.reportUnlocked
//                 ? "Ready"
//                 : `${daysLeft} days left`
//             }
//           />
//         </div>

//         {/* MOOD TIMELINE GRAPH */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full mb-10">
//           <h2 className="text-lg font-bold text-[#1a2b4b] mb-6">
//             Mood Timeline
//           </h2>
//           {formattedData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={320}>
//               <LineChart
//                 data={formattedData}
//                 margin={{ top: 20, right: 20, left: 60, bottom: 20 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis
//                   dataKey="date"
//                   tick={{ fontSize: 12 }}
//                   tickFormatter={(date) =>
//                     new Date(date).toLocaleDateString("en-IN", {
//                       day: "numeric",
//                       month: "short"
//                     })
//                   }
//                 />
//                 <YAxis
//                   domain={[1, 7]}
//                   ticks={[1,2,3,4,5,6,7]}
//                   width={80}
//                   tick={{ fontSize: 12 }}
//                   tickFormatter={(value) => moodLabelMap[value]}
//                 />
//                 <Tooltip
//                   formatter={(value) => moodLabelMap[value]}
//                   labelFormatter={(label) => new Date(label).toDateString()}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#6366f1"
//                   strokeWidth={3}
//                   dot={{ r: 6 }}
//                   activeDot={{ r: 8 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-[#6b7280] py-10 text-center">
//               No mood data yet. Start tracking! 🌱
//             </p>
//           )}
//         </div>

//         {/* ACTION BUTTONS BUTTONS */}
//         <div className="text-center w-full">
//           <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            
//             {stats.reportUnlocked ? (
//               <button
//                 onClick={async () => {
//                   const token = localStorage.getItem("token");
//                   try {
//                     const response = await axios.get(
//                       "http://localhost:8000/api/mood/report",
//                       {
//                         headers: { Authorization: `Bearer ${token}` },
//                         responseType: "blob"
//                       }
//                     );

//                     const url = window.URL.createObjectURL(new Blob([response.data]));
//                     const link = document.createElement("a");
//                     link.href = url;
//                     link.setAttribute("download", "mood-report.pdf");
//                     document.body.appendChild(link);
//                     link.click();
//                   } catch (err) {
//                     console.error("Download failed", err);
//                   }
//                 }}
//                 className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a2b4b] text-white rounded-2xl font-bold hover:bg-black transition-all"
//               >
//                 <Download size={16} />
//                 Download Wellness Report
//               </button>
//             ) : (
//               <button
//                 disabled
//                 className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#eeeae5] text-[#9ca3af] rounded-2xl font-bold cursor-not-allowed"
//               >
//                 <Lock size={16} />
//                 Track {daysLeft} more days to unlock
//               </button>
//             )}

//             {/* RESET BUTTON */}
//             <button
//               onClick={handleResetProgress}
//               className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-red-200 text-red-500 rounded-2xl font-bold hover:bg-red-50 hover:border-red-300 transition-all"
//             >
//               <RotateCcw size={16} />
//               Reset Progress
//             </button>
//           </div>

//           <p className="text-[11px] text-[#9ca3af] mt-4 max-w-sm mx-auto">
//             Your personalized wellness report unlocks after 14 days of tracking.
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
  Lock,
  RotateCcw
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

  const handleResetProgress = async () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your mood tracking progress back to 0 days?"
    );
    if (!confirmReset) return;

    try {
      const token = localStorage.getItem("token");
      
      // Optional backend sync placeholder:
      // await axios.post("http://localhost:8000/api/mood/reset", {}, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });

      setStats((prev) => ({
        ...prev,
        daysTracked: 0,
        reportUnlocked: false
      }));
      setHistory([]); 

    } catch (error) {
      console.error("Error resetting tracking progress", error);
    }
  };

  const formattedData = history.map((item) => ({
    date: item.date,
    value: moodValueMap[item.mood]
  }));

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#fbf7f4] flex items-center justify-center">
        <p className="text-[#6b7280] font-medium">Loading profile...</p>
      </div>
    );
  }

  const daysLeft = Math.max(0, 14 - stats.daysTracked);

  return (
    /* Changed min-h-screen directly to overflow-y-auto style layout wrapper */
    <div className="w-full min-h-screen overflow-y-auto bg-[#fbf7f4] py-12 md:py-16 font-sans">
      {/* Removed items-center flex layouts that pin content within strict non-scrolling frames */}
      <div className="max-w-3xl mx-auto px-6">

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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8">
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-6 w-full mb-10">
          <h2 className="text-lg font-bold text-[#1a2b4b] mb-6">
            Mood Timeline
          </h2>
          {formattedData.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <div className="min-w-[500px] h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={formattedData}
                    margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 12, fill: "#888888" }}
                      tickFormatter={(date) =>
                        new Date(date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short"
                        })
                      }
                    />
                    <YAxis
                      domain={[1, 7]}
                      ticks={[1, 2, 3, 4, 5, 6, 7]}
                      width={80}
                      tick={{ fontSize: 12, fill: "#888888" }}
                      tickFormatter={(value) => moodLabelMap[value]}
                    />
                    <Tooltip
                      formatter={(value) => moodLabelMap[value]}
                      labelFormatter={(label) => new Date(label).toDateString()}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <p className="text-[#6b7280] py-16 text-center">
              No mood data yet. Start tracking! 🌱
            </p>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="text-center w-full pb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            
            {stats.reportUnlocked ? (
              <button
                onClick={async () => {
                  const token = localStorage.getItem("token");
                  try {
                    const response = await axios.get(
                      "http://localhost:8000/api/mood/report",
                      {
                        headers: { Authorization: `Bearer ${token}` },
                        responseType: "blob"
                      }
                    );

                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", "mood-report.pdf");
                    document.body.appendChild(link);
                    link.click();
                  } catch (err) {
                    console.error("Download failed", err);
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1a2b4b] text-white rounded-2xl font-bold hover:bg-black transition-all shadow-sm"
              >
                <Download size={16} />
                Download Wellness Report
              </button>
            ) : (
              <button
                disabled
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#eeeae5] text-[#9ca3af] rounded-2xl font-bold cursor-not-allowed"
              >
                <Lock size={16} />
                Track {daysLeft} more days to unlock
              </button>
            )}

            {/* RESET BUTTON */}
            <button
              onClick={handleResetProgress}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-red-100 text-red-500 rounded-2xl font-bold hover:bg-red-50 hover:border-red-300 transition-all"
            >
              <RotateCcw size={16} />
              Reset Progress
            </button>
          </div>

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
      <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider">
        {title}
      </p>
    </div>
    <p className="text-3xl font-bold text-[#1a2b4b] mt-auto capitalize">
      {value}
    </p>
  </div>
);

export default Profile;

