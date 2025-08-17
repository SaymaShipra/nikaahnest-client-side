import React from "react";
import { Zap, Globe2, Shield, Smile, Star, Rocket } from "lucide-react";

const FeaturesPage = () => {
  const features = [
    {
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      title: "Fast Performance",
      description:
        "Our platform is optimized for lightning-fast speed and smooth interactions.",
    },
    {
      icon: <Globe2 className="h-10 w-10 text-pink-500" />,
      title: "Global Access",
      description:
        "Access your account and services from anywhere in the world at any time.",
    },
    {
      icon: <Shield className="h-10 w-10 text-rose-500" />,
      title: "Secure",
      description:
        "We prioritize your security with top-notch encryption and safety protocols.",
    },
    {
      icon: <Smile className="h-10 w-10 text-purple-500" />,
      title: "User Friendly",
      description:
        "Intuitive interface designed for a smooth and enjoyable experience.",
    },
    {
      icon: <Star className="h-10 w-10 text-pink-500" />,
      title: "High Quality",
      description:
        "We deliver the best services and ensure top-quality standards.",
    },
    {
      icon: <Rocket className="h-10 w-10 text-rose-500" />,
      title: "Innovative",
      description:
        "Cutting-edge solutions to stay ahead in technology and design.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Page Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Our Features
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Explore the powerful features that make our platform exceptional and
          user-friendly.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-white/60 backdrop-blur-sm shadow-lg p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience?</h2>
          <p className="text-gray-600 mb-6">
            Join us today and unlock all features!
          </p>
          <button className="btn btn-primary btn-lg">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
