// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const DailyCheckin = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     sleepHours: "",
//     sleepQuality: "",
//     stressLevel: "",
//     energyLevel: "",
//     focusLevel: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   console.log("Submit clicked");
//   console.log("Before fetch");

//   try {
//     const res = await fetch("http://localhost:8000/api/health/daily-checkin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include", // ✅ important
//       body: JSON.stringify(payload),
//     });

//     console.log("After fetch");

//   } catch (err) {
//     console.error("Fetch error:", err);
//   }
// };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="sleepHours" placeholder="Sleep Hours" onChange={handleChange} />
//       <input name="sleepQuality" placeholder="Sleep Quality" onChange={handleChange} />
//       <input name="stressLevel" placeholder="Stress Level" onChange={handleChange} />
//       <input name="energyLevel" placeholder="Energy Level" onChange={handleChange} />
//       <input name="focusLevel" placeholder="Focus Level" onChange={handleChange} />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default DailyCheckin;

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

    console.log("Submit clicked");

    // ✅ DEFINE PAYLOAD HERE
    const payload = {
      sleepHours: Number(formData.sleepHours),
      sleepQuality: Number(formData.sleepQuality),
      stressLevel: Number(formData.stressLevel),
      energyLevel: Number(formData.energyLevel),
      focusLevel: Number(formData.focusLevel),
    };

    console.log("Payload:", payload);

    try {
      // const res = await fetch("http://localhost:8000/api/health/daily-checkin", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },

      //   // ✅ Use this (based on your backend)
      //   credentials: "include",

      //   body: JSON.stringify(payload),
      // });
      const res = await fetch("http://localhost:8000/api/health/daily-checkin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",   // 🔥 MUST
      body: JSON.stringify(payload),
    });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const err = await res.text();
        console.error("Error:", err);
        alert("Failed to submit");
        return;
      }

      console.log("Success ✅");

      navigate("/reports");

    } catch (err) {
      console.error("Fetch error:", err);
    }
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