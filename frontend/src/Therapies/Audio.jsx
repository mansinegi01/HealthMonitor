
import React from "react";

function Audio() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-28">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Audio Therapy
      </h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <audio controls className="w-full">
          <source
            src="https://res.cloudinary.com/dbvtihfoh/video/upload/v1768401971/Parasympathetic_Nervous_System_Healing_Frequency_Music_-_Sound_Bath_Meditation_64_KBps_bu78rm.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}

export default Audio;
