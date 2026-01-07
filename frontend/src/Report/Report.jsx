import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showPrompt, setShowPrompt] = useState(true);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch(
        "http://localhost:8000/api/health/daily-checkin",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setLogs(data.logs || []);
    };
    fetchLogs();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-6 pb-20">

      {/* ===== POPUP ===== */}
      {showPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-6">
              How was your day today?
            </h2>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => navigate("/daily-checkin")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                How was today?
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="px-6 py-2 text-gray-600"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== TODAY SUMMARY ===== */}
      {logs.length > 0 && (
        <div className="bg-white p-6 rounded-xl border mb-10">
          <h3 className="text-lg font-semibold mb-3">
            Today’s Health Summary
          </h3>
          <p>Sleep: {logs[0].sleepHours || "N/A"} hrs</p>
          <p>Stress: {logs[0].stressLevel || "N/A"}</p>
          <p>Energy: {logs[0].energyLevel || "N/A"}</p>
          <p>Focus: {logs[0].focusLevel || "N/A"}</p>
        </div>
      )}

      {/* ===== GENERATE REPORT ===== */}
      <div className="text-center mt-20">
        <button
          onClick={() => navigate("/final-report")}
          className="px-8 py-4 bg-green-600 text-white rounded-xl"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default Report;
