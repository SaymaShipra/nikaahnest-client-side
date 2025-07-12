import React from "react";
import { UserPlus, Search, Heart, MessageCircle } from "lucide-react";
import { Button } from "antd";

const Works = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Profile",
      description:
        "Register and create a detailed biodata with your preferences and requirements.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Search,
      title: "Browse & Filter",
      description:
        "Search through thousands of verified profiles with advanced filtering options.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Heart,
      title: "Connect",
      description:
        "Express interest and add profiles to your favorites to connect with potential matches.",
      color: "from-rose-500 to-rose-600",
    },
    {
      icon: MessageCircle,
      title: "Start Conversation",
      description:
        "Get contact information of approved matches and begin your journey together.",
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finding your perfect match is easier than ever. Follow these simple
            steps to begin your journey.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connector Line (for desktop view only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>
              )}

              {/* Step Content */}
              <div className="relative z-10 bg-white">
                <div className="mx-auto mb-6 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500 group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors duration-300">
                  {index + 1}
                </div>

                <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center`}
                  >
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-rose-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Find Your Perfect Match?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of happy couples who found love through our platform.
          </p>

          <Button
            type="primary"
            className="!px-8 !py-6 !bg-gradient-to-r !from-rose-500 !to-pink-600 !text-white !font-semibold !rounded-full hover:from-rose-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Works;
