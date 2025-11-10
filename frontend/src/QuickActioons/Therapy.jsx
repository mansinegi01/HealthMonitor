import React from "react";

const therapies = [
  {
    title: "Audio Therapy",
    description:
      "Listening to music & other audio files often enlightens our mood.",
    image: "https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
  },
  {
    title: "Reading Therapy",
    description:
      "Motivational quotes and books can help us to divert and change our mood.",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  {
    title: "Yoga Therapy",
    description:
      "Yoga and exercise play a very important role in our lives.",
    image: "https://cdn-icons-png.flaticon.com/512/3048/3048122.png",
  },
  {
    title: "Consult a Doctor",
    description:
      "Sometimes professional guidance can make all the difference in healing and growth.",
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
  },
  {
    title: "Talking Therapy",
    description:
      "Sharing your thoughts with someone you trust can ease your mind and uplift your spirit.",
    image: "https://cdn-icons-png.flaticon.com/512/4206/4206277.png",
  },
];

const Therapy = () => {
  return (
    <div className="min-h-screen bg-[#052c2c] text-white py-16 px-6 ">
      <h1 className="text-4xl font-bold text-center mb-12 text-teal-200 mt-20">
        Our Therapies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {therapies.map((therapy, index) => (
          <div
            key={index}
            className="bg-[#083c3c] rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 text-center"
          >
            <img
              src={therapy.image}
              alt={therapy.title}
              className="w-28 h-28 mx-auto mb-6 rounded-full bg-teal-900 p-4"
            />
            <h2 className="text-2xl font-semibold mb-4">{therapy.title}</h2>
            <p className="text-gray-300 mb-6">{therapy.description}</p>
            <button className="bg-white text-[#083c3c] font-semibold px-6 py-2 rounded-full hover:bg-teal-200 transition">
              Let's Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Therapy;
