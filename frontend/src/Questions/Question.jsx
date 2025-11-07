import React, { useState } from "react";
import { Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Questions = ({ onCancel }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    weight: "",
    heartRate: "",
    systolic: "",
    diastolic: "",
    glucose: "",
    waterIntake: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/health/sethealthProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 201) navigate("/profile", { state: { user: data.user } });

      // Reset form after submission
      setFormData({
        weight: "",
        heartRate: "",
        systolic: "",
        diastolic: "",
        glucose: "",
        waterIntake: "",
        notes: "",
      });
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Failed to save data.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex justify-center items-center px-4 py-8 text-black">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-md border border-gray-100 p-8">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-full">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div className="ml-3">
            <h2 className="text-2xl font-bold text-gray-900">Record Health Data</h2>
            <p className="text-gray-600 text-sm">Track your daily health metrics</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "weight", label: "Weight (kg)", placeholder: "e.g. 70.5" },
              { name: "heartRate", label: "Heart Rate (bpm)", placeholder: "e.g. 72" },
              { name: "systolic", label: "Blood Pressure (Systolic)", placeholder: "e.g. 120" },
              { name: "diastolic", label: "Blood Pressure (Diastolic)", placeholder: "e.g. 80" },
              { name: "glucose", label: "Glucose (mg/dL)", placeholder: "e.g. 100" },
              { name: "waterIntake", label: "Water Intake (L)", placeholder: "e.g. 2.5" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-gray-800 font-medium mb-1">{field.label}</label>
                <input
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-gray-800 font-medium mb-1">Notes (optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Any additional observations..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
            ></textarea>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              className="px-6 py-3 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Save Health Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Questions;
