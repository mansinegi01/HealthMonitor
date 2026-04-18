import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DailyCheckin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sleepHours: "",
    sleepQuality: "",
    stressLevel: "",
    energyLevel: "",
    focusLevel: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      sleepHours: Number(formData.sleepHours),
      sleepQuality: Number(formData.sleepQuality),
      stressLevel: Number(formData.stressLevel),
      energyLevel: Number(formData.energyLevel),
      focusLevel: Number(formData.focusLevel),
    };

    await fetch("http://localhost:8000/api/health/checkin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    navigate("/report");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="sleepHours" placeholder="Sleep Hours" onChange={handleChange} />
      <input name="sleepQuality" placeholder="Sleep Quality" onChange={handleChange} />
      <input name="stressLevel" placeholder="Stress Level" onChange={handleChange} />
      <input name="energyLevel" placeholder="Energy Level" onChange={handleChange} />
      <input name="focusLevel" placeholder="Focus Level" onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default DailyCheckin;