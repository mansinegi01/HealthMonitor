import React, { useState } from "react";

function Question() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    activity: "",
    sleep: "",
    diet: "",
    waterIntake: "",
    conditions: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Health Tracking Data:", formData);
    alert("Health data saved successfully!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          🩺 Health Tracking Questions
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg text-black"
            required
          />

          <div className="grid grid-cols-2 gap-4 text-black">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              required
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border p-2 rounded-lg text-black"
              required
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 text-black">
            
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              className="border p-2 rounded-lg"
              required
            />

            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              className="border p-2 rounded-lg text-black"
              required
            />
          </div>

          <select
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg text-black"
            required
          >
            <option value="">Activity Level</option>
            <option value="sedentary">Sedentary (little exercise)</option>
            <option value="light">Lightly Active (1–3 days/week)</option>
            <option value="moderate">Moderately Active (3–5 days/week)</option>
            <option value="active">Active (6–7 days/week)</option>
          </select>

          <input
            type="number"
            name="sleep"
            placeholder="Average Sleep (hours)"
            value={formData.sleep}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg text-black"
          />

          <select
            name="diet"
            value={formData.diet}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg text-black"
          >
            <option value="">Diet Type</option>
            <option value="balanced">Balanced</option>
            <option value="high-protein">High Protein</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="fast-food">Mostly Fast Food</option>
          </select>

          <input
            type="number"
            name="waterIntake"
            placeholder="Water Intake (litres/day)"
            value={formData.waterIntake}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg text-black"
          />

          <textarea
            name="conditions"
            placeholder="Any existing health conditions (e.g., diabetes, BP, etc.)"
            value={formData.conditions}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg text-black"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-black"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default Question;
