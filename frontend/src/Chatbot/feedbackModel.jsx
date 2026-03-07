// import React, { useState } from "react";

// export default function FeedbackModal({ sessionId, onClose }) {
//   const [form, setForm] = useState({
//     empathyScore: 3,
//     helpfulnessScore: 3,
//     comfortScore: 3,
//     naturalnessScore: 3,
//     wouldReuse: true
//   });

//   const handleSubmit = async () => {
//     await fetch("http://localhost:8000/api/feedback", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         sessionId,
//         ...form
//       })
//     });

//     alert("Thank you for your feedback 💙");
//     onClose();
//   };


//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6">

//         <h3 className="text-lg font-semibold text-slate-700 mb-4">
//           Rate Your Experience
//         </h3>

//         {["empathyScore","helpfulnessScore","comfortScore","naturalnessScore"].map((field) => (
//           <div key={field} className="mb-3">
//             <label className="text-sm text-slate-500 capitalize">
//               {field.replace("Score","")}
//             </label>
//             <input
//               type="range"
//               min="1"
//               max="5"
//               value={form[field]}
//               onChange={(e) =>
//                 setForm({ ...form, [field]: Number(e.target.value) })
//               }
//               className="w-full"
//             />
//           </div>
//         ))}

//         <div className="flex justify-end gap-3 mt-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 text-sm bg-teal-500 text-white rounded-lg hover:bg-teal-600"
//           >
//             Submit
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";

export default function FeedbackModal({ sessionId, onClose }) {

  const [form, setForm] = useState({

    empathyScore: 3,
    helpfulnessScore: 3,
    comfortScore: 3,
    naturalnessScore: 3,

    satisfactionScore: 4,

    sentimentLabel: "neutral",

    topicCategory: "",

    feedbackText: "",

    issueResolved: true,

    firstTimeUser: false,

    wouldReuse: true
  });


  const handleSubmit = async () => {

    try {

      const response = await fetch("http://localhost:8000/api/feedback", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          sessionId,
          ...form
        })

      });

      const data = await response.json();

      alert("Thank you for your feedback 💙");

      onClose();

    } catch (error) {

      console.error("Feedback Error:", error);

      alert("Failed to submit feedback");

    }

  };


  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[420px] rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">

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
              onChange={(e)=>
                setForm({
                  ...form,
                  [field]: Number(e.target.value)
                })
              }
              className="w-full"
            />

          </div>

        ))}


        <div className="mb-3">

          <label className="text-sm text-slate-500">
            Satisfaction Score
          </label>

          <input
            type="range"
            min="1"
            max="5"
            value={form.satisfactionScore}
            onChange={(e)=>
              setForm({
                ...form,
                satisfactionScore:Number(e.target.value)
              })
            }
            className="w-full"
          />

        </div>


        <div className="mb-3">

          <label className="text-sm text-slate-500">
            Topic Category
          </label>

          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Anxiety, Stress, Work, etc"
            value={form.topicCategory}
            onChange={(e)=>
              setForm({
                ...form,
                topicCategory:e.target.value
              })
            }
          />

        </div>


        <div className="mb-3">

          <label className="text-sm text-slate-500">
            Sentiment
          </label>

          <select
            className="w-full border rounded p-2"
            value={form.sentimentLabel}
            onChange={(e)=>
              setForm({
                ...form,
                sentimentLabel:e.target.value
              })
            }
          >
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>

        </div>


        <div className="flex gap-4 mt-3">

          <label className="flex items-center gap-2 text-sm">

            <input
              type="checkbox"
              checked={form.issueResolved}
              onChange={(e)=>
                setForm({
                  ...form,
                  issueResolved:e.target.checked
                })
              }
            />

            Issue Resolved

          </label>


          <label className="flex items-center gap-2 text-sm">

            <input
              type="checkbox"
              checked={form.firstTimeUser}
              onChange={(e)=>
                setForm({
                  ...form,
                  firstTimeUser:e.target.checked
                })
              }
            />

            First Time User

          </label>

        </div>


        <textarea
          className="w-full border rounded p-2 mt-4"
          rows="3"
          placeholder="Write your feedback..."
          value={form.feedbackText}
          onChange={(e)=>
            setForm({
              ...form,
              feedbackText:e.target.value
            })
          }
        />


        <div className="flex justify-end gap-3 mt-5">

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