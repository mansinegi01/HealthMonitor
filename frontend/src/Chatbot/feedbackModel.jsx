import React, { useState } from "react";

export default function FeedbackModal({ sessionId, onClose }) {
  const [form, setForm] = useState({
    empathyScore: 3,
    helpfulnessScore: 3,
    comfortScore: 3,
    naturalnessScore: 3,
    wouldReuse: true
  });

  const handleSubmit = async () => {
    await fetch("http://localhost:8000/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        ...form
      })
    });

    alert("Thank you for your feedback 💙");
    onClose();
  };


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6">

        <h3 className="text-lg font-semibold text-slate-700 mb-4">
          Rate Your Experience
        </h3>

        {["empathyScore","helpfulnessScore","comfortScore","naturalnessScore"].map((field) => (
          <div key={field} className="mb-3">
            <label className="text-sm text-slate-500 capitalize">
              {field.replace("Score","")}
            </label>
            <input
              type="range"
              min="1"
              max="5"
              value={form[field]}
              onChange={(e) =>
                setForm({ ...form, [field]: Number(e.target.value) })
              }
              className="w-full"
            />
          </div>
        ))}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}