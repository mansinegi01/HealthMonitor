import React from "react";

const Workout = () => {
  const exercises = [
    {
      title: "Full Body Warm-up",
      videoUrl: "https://www.youtube.com/watch?v=UBMk30rjy0o",
      thumbnail: "https://img.youtube.com/vi/UBMk30rjy0o/hqdefault.jpg",
    },
    {
      title: "10 Min Abs Workout",
      videoUrl: "https://www.youtube.com/watch?v=1919eTCoESo",
      thumbnail: "https://img.youtube.com/vi/1919eTCoESo/hqdefault.jpg",
    },
    {
      title: "15 Min HIIT Cardio",
      videoUrl: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
      thumbnail: "https://img.youtube.com/vi/ml6cT4AZdqI/hqdefault.jpg",
    },
    {
      title: "Legs & Glutes Burn",
      videoUrl: "https://www.youtube.com/watch?v=2MoGxae-zyo",
      thumbnail: "https://img.youtube.com/vi/2MoGxae-zyo/hqdefault.jpg",
    },
    {
      title: "Arm Toning Workout",
      videoUrl: "https://www.youtube.com/watch?v=6y4yhyKGIgA",
      thumbnail: "https://img.youtube.com/vi/6y4yhyKGIgA/hqdefault.jpg",
    },
    {
      title: "No Equipment Full Body",
      videoUrl: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
      thumbnail: "https://img.youtube.com/vi/ml6cT4AZdqI/hqdefault.jpg",
    },
    {
      title: "Lower Body Stretch",
      videoUrl: "https://www.youtube.com/watch?v=9Qh3IuZ8LzU",
      thumbnail: "https://img.youtube.com/vi/9Qh3IuZ8LzU/hqdefault.jpg",
    },
    {
      title: "Yoga for Beginners",
      videoUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
      thumbnail: "https://img.youtube.com/vi/v7AYKMP6rOE/hqdefault.jpg",
    },
    {
      title: "Core Strength Routine",
      videoUrl: "https://www.youtube.com/watch?v=1fbU_MkV7NE",
      thumbnail: "https://img.youtube.com/vi/1fbU_MkV7NE/hqdefault.jpg",
    },
    {
      title: "Quick 7-Minute Workout",
      videoUrl: "https://www.youtube.com/watch?v=ECxYJcnvyMw",
      thumbnail: "https://img.youtube.com/vi/ECxYJcnvyMw/hqdefault.jpg",
    },
    {
      title: "Upper Body Strength",
      videoUrl: "https://www.youtube.com/watch?v=IODxDxX7oi4",
      thumbnail: "https://img.youtube.com/vi/IODxDxX7oi4/hqdefault.jpg",
    },
    {
      title: "Morning Stretch Routine",
      videoUrl: "https://www.youtube.com/watch?v=3p8EBPVZ2Iw",
      thumbnail: "https://img.youtube.com/vi/3p8EBPVZ2Iw/hqdefault.jpg",
    },
    {
      title: "20-Min Full Body Burn",
      videoUrl: "https://www.youtube.com/watch?v=UItWltVZZmE",
      thumbnail: "https://img.youtube.com/vi/UItWltVZZmE/hqdefault.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">
        🏋️ Home Workout Videos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exercises.map((exercise, index) => (
          <a
            key={index}
            href={exercise.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={exercise.thumbnail}
              alt={exercise.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {exercise.title}
              </h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Workout;
