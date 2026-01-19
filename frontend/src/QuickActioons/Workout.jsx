import React from "react";

const workouts = [
  {
    title: "10 Min Home Chest Workout",
    type: "Cloudinary",
    level: "Beginner–Intermediate",
    duration: "10 Minutes",
    url: "https://res.cloudinary.com/dbvtihfoh/video/upload/v1768835611/10_MIN_HOME_CHEST_WORKOUT_NO_EQUIPMENT_BODYWEIGHT_WORKOUT_-_Fraser_Wilson_360p_h264_1_asfqja.mp4",
  },
  {
    title: "20 Minute Complete Abs Workout",
    type: "Cloudinary",
    level: "Intermediate",
    duration: "20 Minutes",
    url: "https://res.cloudinary.com/dbvtihfoh/video/upload/v1768835776/20_Minute_Complete_ABS_WORKOUT_Rowan_Row_-_Rowan_Row_360p_h264_hiczts.mp4",
  },
  {
    title: "Lower Back Pain Relief Exercises",
    type: "Cloudinary",
    level: "All Levels",
    duration: "25 Minutes",
    url: "https://res.cloudinary.com/dbvtihfoh/video/upload/v1768835298/25_Min_Lower_Back_Exercises_for_Lower_Back_Pain_Relief_Stretches_for_Lower_Back_Strengthening_Rehab_-_HASfit_240p_h264_ksybzj.mp4",
  },
  {
    title: "15 minutes Leg Exercise",
    type: "Cloudinary",
    level: "All Levels",
    duration: "15 Minutes",
    url: "https://res.cloudinary.com/dbvtihfoh/video/upload/v1768836037/15_Min_Intense_Leg_Workout_At_Home_No_Equipment_-_Oliver_Sjostrom_360p_h264_uqtxlb.mp4",
  },
  {
    title: "Cardio Exercise at Home",
    type: "Cloudinary",
    level: "All Levels",
    duration: "15 Minutes",
    url: "https://res.cloudinary.com/dbvtihfoh/video/upload/v1768836248/CARDIO_WORKOUT_AT_HOME_by_Cult_Fit_Cardio_Workout_For_Beginners_Home_Workout_Cult_Fit_CureFit_-_wearecult_360p_h264_xjhp3g.mp4",
  },
  
];

const Workout = () => {
  return (
    <div className="min-h-screen bg-[#052c2c] text-white px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-teal-200 mt-20 mb-12">
        Workouts 
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {workouts.map((workout, index) => (
          <div
            key={index}
            className="bg-[#083c3c] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            {workout.type === "Cloudinary" ? (
              <video
                controls
                preload="metadata"
                className="w-full rounded-xl mb-4"
              >
                <source src={workout.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <a
                href={workout.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={workout.thumbnail}
                  alt={workout.title}
                  className="w-full h-44 object-cover rounded-xl mb-4 hover:opacity-90 transition"
                />
              </a>
            )}

            <div className="flex gap-2 text-xs mb-3">
              {workout.level && (
                <span className="px-3 py-1 rounded-full bg-teal-900 text-teal-200">
                  {workout.level}
                </span>
              )}
              {workout.duration && (
                <span className="px-3 py-1 rounded-full bg-teal-800 text-teal-100">
                  {workout.duration}
                </span>
              )}
            </div>

            <h2 className="text-lg font-semibold">
              {workout.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workout;
