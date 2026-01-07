import React, { useState } from "react";
import { Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  
    // Lifestyle & Mental
    sleepHours: "",
    sleepQuality: "",
    stressLevel: "",
    energyLevel: "",
    focusLevel: "",
    activityLevel: "",
    waterIntake: "",
    screenTimeHours: "",
    socialInteractionLevel: "",

    // Reflection
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      
      glucose: formData.glucose,

      sleepHours: formData.sleepHours,
      sleepQuality: formData.sleepQuality,
      stressLevel: formData.stressLevel,
      energyLevel: formData.energyLevel,
      focusLevel: formData.focusLevel,
      activityLevel: formData.activityLevel,
      waterIntake: formData.waterIntake,
      screenTimeHours: formData.screenTimeHours,
      socialInteractionLevel: formData.socialInteractionLevel,

      notes: formData.notes,
    };

    try {
      const res = await fetch("http://localhost:8000/api/health/daily-checkin", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        navigate("/profile");
      } else {
        console.error("Failed to save health data");
      }
    } catch (error) {
      console.error("Error saving health data:", error);
    }
  };

  return (
    <div className="min-h-screen text-black from-blue-50  px-6 py-12">
      <div className="max-w-3xl mx-auto text-black bg-white p-8 rounded-2xl shadow-md">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800">
            Health & Wellness Check-In
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
        

          {/* MENTAL & LIFESTYLE */}
          <Section title="Mental & Lifestyle Health">
            <Input name="sleepHours" label="Sleep Hours (avg)" value={formData.sleepHours} onChange={handleChange} className="text-sm text-gray-700 font-medium" />
            <Select name="sleepQuality" label="Sleep Quality (1–5)" options={[1,2,3,4,5]} onChange={handleChange} className="text-sm text-gray-700 font-medium" />
            <Select name="stressLevel" label="Stress Level (1–5)" options={[1,2,3,4,5]} onChange={handleChange} className="text-sm text-gray-700 font-medium" />
            <Select name="energyLevel" label="Energy Level (1–5)" options={[1,2,3,4,5]} onChange={handleChange} className="text-sm text-gray-700 font-medium" />
            <Select name="focusLevel" label="Focus Level (1–5)" options={[1,2,3,4,5]} onChange={handleChange} className="text-sm text-gray-700 font-medium" />

            <Select
              name="activityLevel"
              label="Physical Activity Level"
              options={["none", "low", "moderate", "high"]}
              onChange={handleChange}
            />

            <Input name="waterIntake" label="Water Intake (liters/day)" value={formData.waterIntake} onChange={handleChange} />
            <Input name="screenTimeHours" label="Screen Time (hours/day)" value={formData.screenTimeHours} onChange={handleChange} />

            <Select
              name="socialInteractionLevel"
              label="Social Interaction Level"
              options={["low", "medium", "high"]}
              onChange={handleChange}
            />
          </Section>

          {/* NOTES */}
          <Section title="Personal Notes">
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Anything you'd like to reflect on..."
              className="w-full p-3 border rounded-xl"
            />
          </Section>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl shadow hover:scale-105 transition"
            >
              Save Health Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ----------------- Reusable Components ----------------- */

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      {...props}
      type="number"
      className="w-full p-2 border rounded-xl"
    />
  </div>
);

const Select = ({ label, name, options, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      {label}
    </label>
    <select
      name={name}
      onChange={onChange}
      className="w-full p-2 border rounded-xl"
    >
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Questions;
