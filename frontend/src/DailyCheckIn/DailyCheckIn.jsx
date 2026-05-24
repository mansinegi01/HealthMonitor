

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
//     e.preventDefault();

//     console.log("Submit clicked");

//     // ✅ DEFINE PAYLOAD HERE
//     const payload = {
//       sleepHours: Number(formData.sleepHours),
//       sleepQuality: Number(formData.sleepQuality),
//       stressLevel: Number(formData.stressLevel),
//       energyLevel: Number(formData.energyLevel),
//       focusLevel: Number(formData.focusLevel),
//     };

//     console.log("Payload:", payload);

//     try {
//       // const res = await fetch("http://localhost:8000/api/health/daily-checkin", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },

//       //   // ✅ Use this (based on your backend)
//       //   credentials: "include",

//       //   body: JSON.stringify(payload),
//       // });
//       const res = await fetch("http://localhost:8000/api/health/daily-checkin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",   // 🔥 MUST
//       body: JSON.stringify(payload),
//     });

//       console.log("Response status:", res.status);

//       if (!res.ok) {
//         const err = await res.text();
//         console.error("Error:", err);
//         alert("Failed to submit");
//         return;
//       }

//       console.log("Success ✅");

//       navigate("/reports");

//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

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
import {
  Moon,
  Smile,
  Activity,
  BatteryCharging,
  Brain,
} from "lucide-react";

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
      sleepHours: Number(formData.sleepHours),
      sleepQuality: Number(formData.sleepQuality),
      stressLevel: Number(formData.stressLevel),
      energyLevel: Number(formData.energyLevel),
      focusLevel: Number(formData.focusLevel),
    };

    try {
      const res = await fetch(
        "http://localhost:8000/api/health/daily-checkin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        console.error("Error:", err);
        alert("Failed to submit");
        return;
      }

      navigate("/reports");
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const inputFields = [
    {
      name: "sleepHours",
      placeholder: "Enter sleep hours",
      label: "Sleep Hours",
      icon: <Moon size={18} />,
    },
    {
      name: "sleepQuality",
      placeholder: "Rate 1-10",
      label: "Sleep Quality",
      icon: <Smile size={18} />,
    },
    {
      name: "stressLevel",
      placeholder: "Rate 1-10",
      label: "Stress Level",
      icon: <Activity size={18} />,
    },
    {
      name: "energyLevel",
      placeholder: "Rate 1-10",
      label: "Energy Level",
      icon: <BatteryCharging size={18} />,
    },
    {
      name: "focusLevel",
      placeholder: "Rate 1-10",
      label: "Focus Level",
      icon: <Brain size={18} />,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #667eea, #764ba2)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#fff",
          borderRadius: "20px",
          padding: "35px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#333",
          }}
        >
          Daily Mental Health Check-In
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            marginBottom: "30px",
          }}
        >
          Track your daily wellness and mood
        </p>

        <form onSubmit={handleSubmit}>
          {inputFields.map((field) => (
            <div key={field.name} style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#444",
                }}
              >
                {field.icon}
                {field.label}
              </label>

              <input
                type="number"
                min="1"
                max="10"
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  outline: "none",
                  fontSize: "15px",
                  transition: "0.3s",
                }}
                onFocus={(e) =>
                  (e.target.style.border =
                    "1px solid #667eea")
                }
                onBlur={(e) =>
                  (e.target.style.border =
                    "1px solid #ccc")
                }
              />
            </div>
          ))}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(to right, #667eea, #764ba2)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Submit Check-In
          </button>
        </form>
      </div>
    </div>
  );
};

export default DailyCheckin;