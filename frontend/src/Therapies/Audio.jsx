
// import React from "react";

// function Audio() {
//   return (
//     <div className="min-h-screen bg-gray-50 px-6 pt-28">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">
//         Audio Therapy
//       </h1>

//       <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
//         <audio controls className="w-full">
//           <source
//             src="https://res.cloudinary.com/dbvtihfoh/video/upload/v1768401971/Parasympathetic_Nervous_System_Healing_Frequency_Music_-_Sound_Bath_Meditation_64_KBps_bu78rm.mp3"
//             type="audio/mpeg"
//           />
//           Your browser does not support the audio element.
//         </audio>
//       </div>
//     </div>
//   );
// }

// export default Audio;
import React from "react";

const audioTherapies = [
  {
    title: "Buddhist Sound Therapy",
    description:
      "Soothing mindful melodies inspired by Buddhist practices to reduce anxiety and stress.",
    category: "Mindfulness",
    url: "https://res.cloudinary.com/dbvtihfoh/video/upload/v1768831255/Buddhist_Sound_Therapy_for_Anxiety_and_Stress_Management_-_Mindful_Melodies_di2zys.mp3",
  },
  {
    title: "Bilateral Music Therapy (EMDR)",
    description:
      "Bilateral stimulation music designed to calm anxiety, PTSD, and nervousness.",
    category: "Stress Relief",
    url: "https://res.cloudinary.com/dbvtihfoh/video/upload/v1768831252/1_HR_Bilateral_Music_Therapy_-_Relieve_Stress_Anxiety_PTSD_Nervousness_-_EMDR_Brainspotting_-_Destined_Dynamics_1_a28nbt.mp3",
  },
  {
    title: "Parasympathetic Healing Frequency",
    description:
      "Deep sound bath meditation to activate the parasympathetic nervous system and promote healing.",
    category: "Deep Relaxation",
    url: "https://res.cloudinary.com/dbvtihfoh/video/upload/v1768401971/Parasympathetic_Nervous_System_Healing_Frequency_Music_-_Sound_Bath_Meditation_64_KBps_bu78rm.mp3",
  },
];

const Audio = () => {
  return (
    <div className="min-h-screen bg-[#052c2c] text-white px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-teal-200 mt-20 mb-12">
        Audio Therapy
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {audioTherapies.map((audio, index) => (
          <div
            key={index}
            className="bg-[#083c3c] rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <span className="inline-block text-xs px-3 py-1 mb-3 rounded-full bg-teal-900 text-teal-200">
              {audio.category}
            </span>

            <h2 className="text-xl font-semibold mb-2">
              {audio.title}
            </h2>

            <p className="text-gray-300 text-sm mb-5">
              {audio.description}
            </p>

            <audio
              controls
              preload="none"
              className="w-full rounded-lg"
            >
              <source src={audio.url} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Audio;
