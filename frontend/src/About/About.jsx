import React from "react";

function About() {
  const features = [
    {
      title: "Mental Health Monitoring",
      icon: "🧠",
      desc: "Track moods, emotional patterns and overall wellness."
    },
    {
      title: "AI Chatbot Support",
      icon: "🤖",
      desc: "Empathetic support powered by Groq and Llama 3."
    },
    {
      title: "Brain Tumor Detection",
      icon: "🏥",
      desc: "CNN-based MRI analysis for neurological screening."
    },
    {
      title: "Medication Tracking",
      icon: "💊",
      desc: "Never miss medicines and wellness routines."
    },
    {
      title: "Goal Management",
      icon: "🎯",
      desc: "Set wellness goals and monitor progress."
    },
    {
      title: "Community Support",
      icon: "🤝",
      desc: "Connect anonymously with others."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-orange-400 to-pink-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About MindNest
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Empowering Mental Wellness Through Artificial Intelligence,
            Deep Learning, and Modern Healthcare Technology.
          </p>

        </div>
      </section>

      {/* Overview */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Project Overview
          </h2>

          <p className="text-gray-600 leading-8 text-lg">
            MindNest is an AI-powered Mental Health Monitoring and Support
            System designed to assist users in monitoring their emotional
            well-being and neurological health. The platform combines mood
            tracking, medication management, gratitude journaling, wellness
            goal tracking, AI chatbot support, anonymous community support,
            and brain tumor detection using Deep Learning technologies.
          </p>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-lg p-8 border-l-4 border-green-500">
            <h3 className="text-2xl font-bold mb-4 text-green-600">
              🎯 Our Mission
            </h3>

            <p className="text-gray-600 leading-7">
              To make mental healthcare accessible, affordable, and
              technology-driven by leveraging Artificial Intelligence
              and healthcare analytics.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 border-l-4 border-blue-500">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">
              🚀 Our Vision
            </h3>

            <p className="text-gray-600 leading-7">
              To create an intelligent healthcare ecosystem where
              individuals can proactively monitor and improve their
              mental and neurological well-being.
            </p>
          </div>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Key Features
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

      </section>

      {/* Technology Stack */}
      <section className="bg-white py-16">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Technology Stack
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-orange-50 rounded-2xl p-6 text-center">
              <h4 className="font-bold text-xl mb-2">
                Frontend
              </h4>
              <p>React.js</p>
              <p>Tailwind CSS</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <h4 className="font-bold text-xl mb-2">
                Backend
              </h4>
              <p>Node.js</p>
              <p>Express.js</p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <h4 className="font-bold text-xl mb-2">
                Database
              </h4>
              <p>MongoDB</p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <h4 className="font-bold text-xl mb-2">
                AI & ML
              </h4>
              <p>Groq API</p>
              <p>Llama 3</p>
              <p>CNN Model</p>
            </div>

          </div>

        </div>

      </section>

      {/* Footer CTA */}
      <section className="py-16 text-center">

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Building a Healthier Future with AI
        </h2>

        <p className="text-gray-600 text-lg">
          Mental Health Monitoring and Support System
        </p>

      </section>

    </div>
  );
}

export default About;