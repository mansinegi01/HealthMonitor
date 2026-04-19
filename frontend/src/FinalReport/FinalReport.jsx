// import React, { useEffect, useState } from "react";

// const Report = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/health/report", {
//           method: "GET",

//           // 👉 Use ONE of the below based on your auth system

//           // ✅ If using JWT
//           headers: {
//             "Authorization": `Bearer ${localStorage.getItem("token")}`
//           },

//           // ✅ If using cookies instead, COMMENT above and use:
//           // credentials: "include",
//         });

//         console.log("Status:", res.status);

//         if (!res.ok) {
//           throw new Error("Unauthorized or Failed to fetch report");
//         }

//         const result = await res.json();
//         console.log("Report Data:", result);

//         setData(result);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load report. Please login again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, []);

//   // ✅ Loading state
//   if (loading) return <p>Loading report...</p>;

//   // ✅ Error state
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   // ✅ Safety check
//   if (!data || !data.averages) return <p>No data available</p>;

//   return (
//     // <div style={{ padding: "20px" }}>
//     <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 pt-7 pb-20">
//       <h2>📊 Weekly Health Report</h2>

//       {/* ✅ Averages Section */}
//       <div style={{ marginBottom: "20px" }}>
//         <h3>Averages</h3>
//         <p>😵 Stress: {data.averages.stress}</p>
//         <p>⚡ Energy: {data.averages.energy}</p>
//         <p>🎯 Focus: {data.averages.focus}</p>
//         <p>😴 Sleep Quality: {data.averages.sleep}</p>
//       </div>

//       {/* ✅ Total Entries */}
//       <p>Total Entries: {data.totalEntries}</p>

//       {/* ✅ Logs Section */}
//       <h3>📅 Daily Logs</h3>

//       {data.logs.length === 0 ? (
//         <p>No logs found</p>
//       ) : (
//         data.logs.map((log, i) => (
//           <div
//             key={i}
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               marginBottom: "10px",
//               borderRadius: "8px",
//             }}
//           >
//             <p><strong>Date:</strong> {new Date(log.createdAt).toLocaleDateString()}</p>
//             <p>😵 Stress: {log.stressLevel}</p>
//             <p>⚡ Energy: {log.energyLevel}</p>
//             <p>🎯 Focus: {log.focusLevel}</p>
//             <p>😴 Sleep: {log.sleepQuality}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Report;

import React, { useEffect, useState } from "react";

const Report = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/health/report", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          // OR use this if cookies:
          // credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch report");

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Failed to load report");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading)
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center text-white">
        Loading report...
      </div>
    );

  if (error)
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center text-red-400">
        {error}
      </div>
    );

  if (!data || !data.averages)
    return (
      <div className="h-[calc(100vh-80px)] flex items-center justify-center text-gray-400">
        No data available
      </div>
    );

  return (
    <div className="h-[calc(100vh-80px)] overflow-y-auto px-6 pt-8 pb-20 bg-gradient-to-br from-[#0f172a] to-[#020617] text-white">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold mb-2">Weekly Health Report</h1>
      <p className="text-gray-400 mb-8">
        Total Entries: {data.totalEntries || 0}
      </p>

      {/* ================= METRIC CARDS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Stress", value: data?.averages?.stress, color: "text-red-400" },
          { label: "Energy", value: data?.averages?.energy, color: "text-orange-400" },
          { label: "Focus", value: data?.averages?.focus, color: "text-teal-400" },
          { label: "Sleep", value: data?.averages?.sleep, color: "text-blue-400" },
        ].map((metric, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center shadow-lg hover:scale-105 transition"
          >
            <p className="text-gray-400 text-sm mb-2">{metric.label}</p>

            <p className={`text-3xl font-semibold ${metric.color}`}>
              {Number(metric.value ?? 0).toFixed(1)}
            </p>
          </div>
        ))}
      </div>

      {/* ================= DAILY LOGS ================= */}
      <h2 className="text-xl font-semibold mb-6">Daily Logs</h2>

      {data.logs.length === 0 ? (
        <p className="text-gray-400">No logs available</p>
      ) : (
        <div className="space-y-5">
          {data.logs.map((log, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow"
            >
              <p className="text-sm text-gray-400 mb-4">
                {new Date(log.createdAt).toLocaleDateString()}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Stress", value: log?.stressLevel, color: "text-red-400" },
                  { label: "Energy", value: log?.energyLevel, color: "text-orange-400" },
                  { label: "Focus", value: log?.focusLevel, color: "text-teal-400" },
                  { label: "Sleep", value: log?.sleepQuality, color: "text-blue-400" },
                ].map((metric, idx) => (
                  <div key={idx}>
                    <p className="text-gray-400 text-sm">{metric.label}</p>

                    <p className={`text-lg font-medium ${metric.color}`}>
                      {metric.value ?? 0}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Report;