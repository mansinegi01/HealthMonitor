import React from "react";

const yogaTherapies = [
  {
    title: "Mental Health Break – Yoga with Adriene",
    duration: "Short Session",
    level: "Beginner Friendly",
    description:
      "A gentle yoga break designed to calm the mind and reduce mental fatigue.",
    url: "https://res.cloudinary.com/dbvtihfoh/video/upload/v1768832178/Mental_Health_Break_-_Yoga_With_Adriene_240p_h264_1_esszaf.mp4",
  },
  {
    title: "30 Minute Relaxing Yoga for Mental Health",
    duration: "30 Minutes",
    level: "All Levels",
    description:
      "Slow seated yoga flow to relax the nervous system and improve emotional balance.",
    url: "https://res.cloudinary.com/dbvtihfoh/video/upload/v1768834334/30_Minute_Relaxing_Yoga_For_Mental_Health_All_Levels_-_Slow_Seated_Flow_-_Jess_Yoga_360p_h264_hoqopc.mp4",
  },
];

function Yoga() {
  return (
    <div className="min-h-screen bg-[#052c2c] text-white px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-teal-200 mt-20 mb-12">
        Yoga Therapy
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {yogaTherapies.map((yoga, index) => (
          <div
            key={index}
            className="bg-[#083c3c] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <video
              controls
              preload="metadata"
              className="w-full rounded-xl mb-4"
            >
              <source src={yoga.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="flex gap-3 text-xs mb-3">
              <span className="px-3 py-1 rounded-full bg-teal-900 text-teal-200">
                {yoga.level}
              </span>
              <span className="px-3 py-1 rounded-full bg-teal-800 text-teal-100">
                {yoga.duration}
              </span>
            </div>

            <h2 className="text-xl font-semibold mb-2">
              {yoga.title}
            </h2>

            <p className="text-gray-300 text-sm">
              {yoga.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Yoga;
