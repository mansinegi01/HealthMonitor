// import React, { useState } from "react";
// import { Activity } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const Questions = ({ onCancel }) => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     weight: "",
//     heartRate: "",
//     systolic: "",
//     diastolic: "",
//     glucose: "",
//     waterIntake: "",
//     notes: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const res = await fetch("http://localhost:8000/api/health/sethealthProfile", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     const data = await res.json();

//   //     if (res.status === 201) navigate("/profile", { state: { user: data.user } });
//   //     if (res.status === 401) navigate("/login");
//   //     alert("please login first")

//   //     // Reset form after submission
//   //     setFormData({
//   //       weight: "",
//   //       heartRate: "",
//   //       systolic: "",
//   //       diastolic: "",
//   //       glucose: "",
//   //       waterIntake: "",
//   //       notes: "",
//   //     });
//   //   } catch (error) {
//   //     console.error("❌ Error:", error);
//   //     alert("❌ Failed to save data.");
//   //   }
//   // };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const token = localStorage.getItem("token"); // ✅ get token

//     const res = await fetch("http://localhost:8000/api/health/sethealthProfile", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`, // ✅ send token
//       },
//       credentials: "include",
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert("✅ Health data saved successfully!");
//       navigate("/profile", { state: { user: data.user } });
//     } else if (res.status === 401) {
//       alert("⚠️ Please log in first");
//       navigate("/login");
//     }
//   } catch (error) {
//     console.error("❌ Error:", error);
//     alert("❌ Failed to save data.");
//   }
// };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex justify-center items-center px-4 py-8 text-black">
//       <div className="bg-white w-full max-w-2xl rounded-2xl shadow-md border border-gray-100 p-8">
//         <div className="flex items-center mb-6">
//           <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-2 rounded-full">
//             <Activity className="text-white w-6 h-6" />
//           </div>
//           <div className="ml-3">
//             <h2 className="text-2xl font-bold text-gray-900">Record Health Data</h2>
//             <p className="text-gray-600 text-sm">Track your daily health metrics</p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {[
//               { name: "weight", label: "Weight (kg)", placeholder: "e.g. 70.5" },
//               { name: "heartRate", label: "Heart Rate (bpm)", placeholder: "e.g. 72" },
//               { name: "systolic", label: "Blood Pressure (Systolic)", placeholder: "e.g. 120" },
//               { name: "diastolic", label: "Blood Pressure (Diastolic)", placeholder: "e.g. 80" },
//               { name: "glucose", label: "Glucose (mg/dL)", placeholder: "e.g. 100" },
//               { name: "waterIntake", label: "Water Intake (L)", placeholder: "e.g. 2.5" },
//             ].map((field) => (
//               <div key={field.name}>
//                 <label className="block text-gray-800 font-medium mb-1">{field.label}</label>
//                 <input
//                   type="number"
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   placeholder={field.placeholder}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
//                 />
//               </div>
//             ))}
//           </div>

//           <div>
//             <label className="block text-gray-800 font-medium mb-1">Notes (optional)</label>
//             <textarea
//               name="notes"
//               value={formData.notes}
//               onChange={handleChange}
//               rows="3"
//               placeholder="Any additional observations..."
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
//             ></textarea>
//           </div>

//           <div className="flex justify-between items-center pt-4">
//             <button
//               type="submit"
//               className="px-6 py-3 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
//             >
//               Save Health Data
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Questions;
import React, { useState } from "react";
import { Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Questions = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Physical
    weight: "",
    height: "",
    heartRate: "",
    systolic: "",
    diastolic: "",
    glucose: "",

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
      weight: formData.weight,
      height: formData.height,
      heartRate: formData.heartRate,
      bloodPressure: {
        systolic: formData.systolic,
        diastolic: formData.diastolic,
      },
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
      const res = await fetch("http://localhost:8000/api/health/addOrUpdate", {
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
          {/* PHYSICAL HEALTH */}
          <Section title="Physical Health">
            <Input name="weight" label="Weight (kg)" value={formData.weight} onChange={handleChange} className="text-black"/>
            <Input name="height" label="Height (cm)" value={formData.height} onChange={handleChange} />
            <Input name="heartRate" label="Heart Rate (bpm)" value={formData.heartRate} onChange={handleChange} />
            <Input name="systolic" label="Blood Pressure – Systolic" value={formData.systolic} onChange={handleChange} />
            <Input name="diastolic" label="Blood Pressure – Diastolic" value={formData.diastolic} onChange={handleChange} />
            <Input name="glucose" label="Glucose (mg/dL)" value={formData.glucose} onChange={handleChange} />
          </Section>

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
