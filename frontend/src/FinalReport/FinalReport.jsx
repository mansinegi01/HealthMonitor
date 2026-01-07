import React, { useEffect, useState } from "react";

const FinalReport = () => {
  const token = localStorage.getItem("token");
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      const res = await fetch(
        "http://localhost:8000/api/health/generate-report",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setReport(data);
    };
    fetchReport();
  }, [token]);

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Generating report...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-6">
      <h1 className="text-2xl font-semibold mb-6">
        Your Wellness Report
      </h1>

      <div className="bg-white p-6 rounded-xl border space-y-2">
        <p>Average Stress: {report.averages.stress}</p>
        <p>Average Energy: {report.averages.energy}</p>
        <p>Average Focus: {report.averages.focus}</p>
        <p>Average Sleep Quality: {report.averages.sleep}</p>
      </div>
    </div>
  );
};

export default FinalReport;
