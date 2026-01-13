// // // import React, { useState } from "react";
// // // import { Activity } from "lucide-react";
// // // import { useNavigate } from "react-router-dom";

// // // const DailyCheckin = () => {
// // //   const navigate = useNavigate();

// // //   const [formData, setFormData] = useState({
// // //     sleepHours: "",
// // //     sleepQuality: "",
// // //     stressLevel: "",
// // //     energyLevel: "",
// // //     focusLevel: "",
// // //     activityLevel: "",
// // //     waterIntake: "",
// // //     screenTimeHours: "",
// // //     socialInteractionLevel: "",
// // //     notes: "",
// // //   });

// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       [name]: value, // value is always a string (correct)
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       const res = await fetch(
// // //         "http://localhost:8000/api/health/daily-checkin",
// // //         {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// // //           },
// // //           body: JSON.stringify(formData),
// // //         }
// // //       );

// // //       if (res.ok) {
// // //         navigate("/profile");
// // //       } else {
// // //         console.error("Failed to save health data");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error saving health data:", error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-white px-4 py-12">
// // //       <div className="w-full max-w-3xl bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-gray-100">

// // //         {/* Header */}
// // //         <div className="flex items-center gap-4 mb-10">
// // //           <div className="p-3 bg-blue-100 rounded-xl">
// // //             <Activity className="text-blue-600" />
// // //           </div>
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-gray-800">
// // //               Health & Wellness Check-In
// // //             </h1>
// // //             <p className="text-sm text-gray-500">
// // //               Take a minute to reflect on your day
// // //             </p>
// // //           </div>
// // //         </div>

// // //         {/* Form */}
// // //         <form onSubmit={handleSubmit} className="space-y-10">

// // //           {/* Mental & Lifestyle */}
// // //           <Section title="Mental & Lifestyle Health">
// // //             <Input
// // //               label="Sleep Hours (avg)"
// // //               name="sleepHours"
// // //               value={formData.sleepHours}
// // //               onChange={handleChange}
// // //             />

// // //             <Select
// // //               label="Sleep Quality (1–5)"
// // //               name="sleepQuality"
// // //               value={formData.sleepQuality}
// // //               options={["1", "2", "3", "4", "5"]}
// // //               onChange={handleChange}
// // //             />

// // //             <Select
// // //               label="Stress Level (1–5)"
// // //               name="stressLevel"
// // //               value={formData.stressLevel}
// // //               options={["1", "2", "3", "4", "5"]}
// // //               onChange={handleChange}
// // //             />

// // //             <Select
// // //               label="Energy Level (1–5)"
// // //               name="energyLevel"
// // //               value={formData.energyLevel}
// // //               options={["1", "2", "3", "4", "5"]}
// // //               onChange={handleChange}
// // //             />

// // //             <Select
// // //               label="Focus Level (1–5)"
// // //               name="focusLevel"
// // //               value={formData.focusLevel}
// // //               options={["1", "2", "3", "4", "5"]}
// // //               onChange={handleChange}
// // //             />

// // //             <Select
// // //               label="Physical Activity Level"
// // //               name="activityLevel"
// // //               value={formData.activityLevel}
// // //               options={["none", "low", "moderate", "high"]}
// // //               onChange={handleChange}
// // //             />

// // //             <Input
// // //               label="Water Intake (liters/day)"
// // //               name="waterIntake"
// // //               value={formData.waterIntake}
// // //               onChange={handleChange}
// // //             />

// // //             <Input
// // //               label="Screen Time (hours/day)"
// // //               name="screenTimeHours"
// // //               value={formData.screenTimeHours}
// // //               onChange={handleChange}
// // //             />

// // //             <Select
// // //               label="Social Interaction Level"
// // //               name="socialInteractionLevel"
// // //               value={formData.socialInteractionLevel}
// // //               options={["low", "medium", "high"]}
// // //               onChange={handleChange}
// // //             />
// // //           </Section>

// // //           {/* Notes */}
// // //           <Section title="Personal Reflection">
// // //             <div className="col-span-1 sm:col-span-2">
// // //               <textarea
// // //                 name="notes"
// // //                 value={formData.notes}
// // //                 onChange={handleChange}
// // //                 placeholder="Write a short reflection about your day..."
// // //                 className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
// // //                 rows={4}
// // //               />
// // //             </div>
// // //           </Section>

// // //           {/* Buttons */}
// // //           <div className="flex justify-end gap-4 pt-4">
// // //             <button
// // //               type="button"
// // //               onClick={() => navigate(-1)}
// // //               className="px-6 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100 transition"
// // //             >
// // //               Cancel
// // //             </button>

// // //             <button
// // //               type="submit"
// // //               className="px-8 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition"
// // //             >
// // //               Save Health Data
// // //             </button>
// // //           </div>

// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // /* ================= Reusable Components ================= */

// // // const Section = ({ title, children }) => (
// // //   <div>
// // //     <h2 className="text-lg font-semibold text-gray-700 mb-4">
// // //       {title}
// // //     </h2>
// // //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
// // //       {children}
// // //     </div>
// // //   </div>
// // // );

// // // const Input = ({ label, ...props }) => (
// // //   <div>
// // //     <label className="block text-sm font-medium text-gray-600 mb-1">
// // //       {label}
// // //     </label>
// // //     <input
// // //       {...props}
// // //       type="number"
// // //       className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
// // //     />
// // //   </div>
// // // );

// // // const Select = ({ label, name, value, options, onChange }) => (
// // //   <div>
// // //     <label className="block text-sm font-medium text-gray-600 mb-1">
// // //       {label}
// // //     </label>
// // //     <select
// // //       name={name}
// // //       value={value}
// // //       onChange={onChange}
// // //       className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
// // //     >
// // //       <option value="">Select</option>
// // //       {options.map((opt) => (
// // //         <option key={opt} value={opt}>
// // //           {opt}
// // //         </option>
// // //       ))}
// // //     </select>
// // //   </div>
// // // );

// // // export default DailyCheckin;
// // import React, { useState } from "react";
// // import { Activity } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // const DailyCheckin = () => {
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     sleepHours: "",
// //     sleepQuality: "",
// //     stressLevel: "",
// //     energyLevel: "",
// //     focusLevel: "",
// //     activityLevel: "",
// //     waterIntake: "",
// //     screenTimeHours: "",
// //     socialInteractionLevel: "",
// //     notes: "",
// //   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: value, // value is always a string (correct)
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await fetch(
// //         "http://localhost:8000/api/health/daily-checkin",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //           body: JSON.stringify(formData),
// //         }
// //       );

// //       if (res.ok) {
// //         navigate("/reports");
// //       } else {
// //         console.error("Failed to save health data");
// //       }
// //     } catch (error) {
// //       console.error("Error saving health data:", error);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-white px-4 py-12">
// //       <div className="w-full max-w-3xl bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-gray-100">

// //         {/* Header */}
// //         <div className="flex items-center gap-4 mb-10">
// //           <div className="p-3 bg-blue-100 rounded-xl">
// //             <Activity className="text-blue-600" />
// //           </div>
// //           <div>
// //             <h1 className="text-2xl font-bold text-gray-800">
// //               Health & Wellness Check-In
// //             </h1>
// //             <p className="text-sm text-gray-500">
// //               Take a minute to reflect on your day
// //             </p>
// //           </div>
// //         </div>

// //         {/* Form */}
// //         <form onSubmit={handleSubmit} className="space-y-10">

// //           {/* Mental & Lifestyle */}
// //           <Section title="Mental & Lifestyle Health">
// //             <Input
// //               label="Sleep Hours (avg)"
// //               name="sleepHours"
// //               value={formData.sleepHours}
// //               onChange={handleChange}
// //             />

// //             <Select
// //               label="Sleep Quality (1–5)"
// //               name="sleepQuality"
// //               value={formData.sleepQuality}
// //               options={["1", "2", "3", "4", "5"]}
// //               onChange={handleChange}
// //             />

// //             <Select
// //               label="Stress Level (1–5)"
// //               name="stressLevel"
// //               value={formData.stressLevel}
// //               options={["1", "2", "3", "4", "5"]}
// //               onChange={handleChange}
// //             />

// //             <Select
// //               label="Energy Level (1–5)"
// //               name="energyLevel"
// //               value={formData.energyLevel}
// //               options={["1", "2", "3", "4", "5"]}
// //               onChange={handleChange}
// //             />

// //             <Select
// //               label="Focus Level (1–5)"
// //               name="focusLevel"
// //               value={formData.focusLevel}
// //               options={["1", "2", "3", "4", "5"]}
// //               onChange={handleChange}
// //             />

// //             <Select
// //               label="Physical Activity Level"
// //               name="activityLevel"
// //               value={formData.activityLevel}
// //               options={["none", "low", "moderate", "high"]}
// //               onChange={handleChange}
// //             />

// //             <Input
// //               label="Water Intake (liters/day)"
// //               name="waterIntake"
// //               value={formData.waterIntake}
// //               onChange={handleChange}
// //             />

// //             <Input
// //               label="Screen Time (hours/day)"
// //               name="screenTimeHours"
// //               value={formData.screenTimeHours}
// //               onChange={handleChange}
// //             />

// //             <Select
// //               label="Social Interaction Level"
// //               name="socialInteractionLevel"
// //               value={formData.socialInteractionLevel}
// //               options={["low", "medium", "high"]}
// //               onChange={handleChange}
// //             />
// //           </Section>

// //           {/* Notes */}
// //           <Section title="Personal Reflection">
// //             <div className="col-span-1 sm:col-span-2">
// //               <textarea
// //                 name="notes"
// //                 value={formData.notes}
// //                 onChange={handleChange}
// //                 placeholder="Write a short reflection about your day..."
// //                 className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
// //                 rows={4}
// //               />
// //             </div>
// //           </Section>

// //           {/* Buttons */}
// //           <div className="flex justify-end gap-4 pt-4">
// //             <button
// //               type="button"
// //               onClick={() => navigate(-1)}
// //               className="px-6 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100 transition"
// //             >
// //               Cancel
// //             </button>

// //             <button
// //               type="submit"
// //               className="px-8 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition"
// //             >
// //               Save Health Data
// //             </button>
// //           </div>

// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // /* ================= Reusable Components ================= */

// // const Section = ({ title, children }) => (
// //   <div>
// //     <h2 className="text-lg font-semibold text-gray-700 mb-4">
// //       {title}
// //     </h2>
// //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
// //       {children}
// //     </div>
// //   </div>
// // );

// // const Input = ({ label, ...props }) => (
// //   <div>
// //     <label className="block text-sm font-medium text-gray-600 mb-1">
// //       {label}
// //     </label>
// //     <input
// //       {...props}
// //       type="number"
// //       className="w-full p-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
// //     />
// //   </div>
// // );

// // const Select = ({ label, name, value, options, onChange }) => (
// //   <div>
// //     <label className="block text-sm font-medium text-gray-600 mb-1">
// //       {label}
// //     </label>
// //     <select
// //       name={name}
// //       value={value}
// //       onChange={onChange}
// //       className="w-full p-3 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
// //     >
// //       <option value="" className="text-gray-500">Select</option>
// //       {options.map((opt) => (
// //         <option key={opt} value={opt} className="text-gray-900">
// //           {opt}
// //         </option>
// //       ))}
// //     </select>
// //   </div>
// // );
// // export default DailyCheckin;
// import React, { useState } from "react";
// import { Activity } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const DailyCheckin = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     sleepHours: "",
//     sleepQuality: "",
//     stressLevel: "",
//     energyLevel: "",
//     focusLevel: "",
//     activityLevel: "",
//     waterIntake: "",
//     screenTimeHours: "",
//     socialInteractionLevel: "",
//     notes: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       ...formData,
//       sleepHours: Number(formData.sleepHours),
//       sleepQuality: Number(formData.sleepQuality),
//       stressLevel: Number(formData.stressLevel),
//       energyLevel: Number(formData.energyLevel),
//       focusLevel: Number(formData.focusLevel),
//       waterIntake: Number(formData.waterIntake),
//       screenTimeHours: Number(formData.screenTimeHours),
//     };

//     try {
//       const res = await fetch("http://localhost:8000/api/health/daily-checkin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (res.status == 201) {
//         navigate("/reports", { state: { fromCheckin: true } });
//       }
//     } catch (error) {
//       console.error("Error saving health data:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-white px-4 py-12">
//       <div className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
//         <div className="flex items-center gap-4 mb-10">
//           <div className="p-3 bg-blue-100 rounded-xl">
//             <Activity className="text-blue-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               Health & Wellness Check-In
//             </h1>
//             <p className="text-sm text-gray-500">
//               Take a minute to reflect on your day
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-10">
//           <Section title="Mental & Lifestyle Health">
//             <Input label="Sleep Hours" name="sleepHours" value={formData.sleepHours} onChange={handleChange} />
//             <Select label="Sleep Quality (1–5)" name="sleepQuality" value={formData.sleepQuality} options={["1","2","3","4","5"]} onChange={handleChange} />
//             <Select label="Stress Level (1–5)" name="stressLevel" value={formData.stressLevel} options={["1","2","3","4","5"]} onChange={handleChange} />
//             <Select label="Energy Level (1–5)" name="energyLevel" value={formData.energyLevel} options={["1","2","3","4","5"]} onChange={handleChange} />
//             <Select label="Focus Level (1–5)" name="focusLevel" value={formData.focusLevel} options={["1","2","3","4","5"]} onChange={handleChange} />
//             <Select label="Activity Level" name="activityLevel" value={formData.activityLevel} options={["none","low","moderate","high"]} onChange={handleChange} />
//             <Input label="Water Intake (liters)" name="waterIntake" value={formData.waterIntake} onChange={handleChange} />
//             <Input label="Screen Time (hours)" name="screenTimeHours" value={formData.screenTimeHours} onChange={handleChange} />
//             <Select label="Social Interaction" name="socialInteractionLevel" value={formData.socialInteractionLevel} options={["low","medium","high"]} onChange={handleChange} />
//           </Section>

//           <Section title="Personal Reflection">
//             <textarea
//               name="notes"
//               value={formData.notes}
//               onChange={handleChange}
//               className="w-full p-4 border border-gray-300 rounded-xl text-gray-900 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
//               rows={4}
//               placeholder="Write a short reflection..."
//             />
//           </Section>

//           <div className="flex justify-end gap-4">
//             <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
//               Cancel
//             </button>
//             <button type="submit" className="px-8 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-md">
//               Save Health Data
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // --- Sub-components with explicit text coloring ---

// const Section = ({ title, children }) => (
//   <div className="w-full">
//     <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
//     <div className="grid sm:grid-cols-2 gap-5">{children}</div>
//   </div>
// );

// const Input = ({ label, ...props }) => (
//   <div className="flex flex-col">
//     <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
//     <input 
//       type="number" 
//       {...props} 
//       className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
//     />
//   </div>
// );

// const Select = ({ label, name, value, options, onChange }) => (
//   <div className="flex flex-col">
//     <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
//     <select 
//       name={name} 
//       value={value} 
//       onChange={onChange} 
//       className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//     >
//       <option value="" className="text-gray-400">Select</option>
//       {options.map((o) => (
//         <option key={o} value={o} className="text-gray-900">{o}</option>
//       ))}
//     </select>
//   </div>
// );

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
    activityLevel: "",
    waterIntake: "",
    screenTimeHours: "",
    socialInteractionLevel: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
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
      waterIntake: Number(formData.waterIntake),
      screenTimeHours: Number(formData.screenTimeHours),
    };

    try {
      const res = await fetch(
        "http://localhost:8000/api/health/daily-checkin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.status === 201) {
        navigate("/reports", { state: { fromCheckin: true } });
      }
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow max-w-3xl w-full space-y-6"
      >
        <h1 className="text-2xl font-bold">Daily Check-in</h1>

        Sleep hours : <input name="sleepHours" placeholder="Sleep Hours" type="number" onChange={handleChange} className="text-black" />
        <input name="sleepQuality" placeholder="Sleep Quality (1-5)" type="number" onChange={handleChange}  className="text-black" />
        <input name="stressLevel" placeholder="Stress Level (1-5)" type="number" onChange={handleChange}  className="text-black" />
        <input name="energyLevel" placeholder="Energy Level (1-5)" type="number" onChange={handleChange}  className="text-black" />
        <input name="focusLevel" placeholder="Focus Level (1-5)" type="number" onChange={handleChange}  className="text-black" />

        <select name="activityLevel" onChange={handleChange}  className="text-black">
          <option value=""  className="text-black">Activity Level</option>
          <option value="none"  className="text-black">None</option>
          <option value="low"  className="text-black">Low</option>
          <option value="moderate"  className="text-black">Moderate</option>
          <option value="high"  className="text-black">High</option>
        </select>

        <input name="waterIntake" placeholder="Water Intake (liters)" type="number" onChange={handleChange} />
        <input name="screenTimeHours" placeholder="Screen Time (hours)" type="number" onChange={handleChange} />

        <select name="socialInteractionLevel" onChange={handleChange}>
          <option value="">Social Interaction</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <textarea name="notes" placeholder="Notes" onChange={handleChange} />

        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Save & Go to Report
        </button>
      </form>
    </div>
  );
};

export default DailyCheckin;
