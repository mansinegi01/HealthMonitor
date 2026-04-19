
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
  const [moodSummary, setMoodSummary] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        /* ================= HEALTH LOGS ================= */
        const healthRes = await fetch(
          "http://localhost:8000/api/health/daily-checkin",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (healthRes.ok) {
          const healthData = await healthRes.json();
          if (mounted) setLogs(healthData.logs || []);
        }

        /* ================= FINAL REPORT ================= */
        const reportRes = await fetch(
          "http://localhost:8000/api/health/report",
          {
            credentials: "include", // since backend uses cookies
          }
        );

        if (reportRes.ok) {
          const reportData = await reportRes.json();

          if (mounted) {
            setLogs(reportData.logs || []);
          }
        }
      } catch (err) {
        console.error("Failed to fetch report data:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [token]);

  /* ================= CHART DATA ================= */
  const moodChartData = {
    labels: moodSummary.map((m) => m._id),
    datasets: [
      {
        data: moodSummary.map((m) => m.count),
        backgroundColor: moodSummary.map((m) => {
          switch (m._id) {
            case "happy": return "#22c55e";
            case "sad": return "#ef4444";
            case "anxious": return "#3b82f6";
            case "excited": return "#f97316";
            case "good": return "#84cc16";
            case "tired": return "#64748b";
            default: return "#a855f7";
          }
        }),
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
      {!loading && moodSummary.length > 0 && (
        <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-6">
            Mood Distribution (This Month)
          </h3>
          <div className="max-w-sm mx-auto">
            <Pie data={moodChartData} />
          </div>
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
