import React from "react";
import { Heart, Users, Crown, Search } from "lucide-react";
import { Button } from "antd";
import "flowbite";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Heart className="absolute top-10 left-10 h-20 w-20 text-rose-300 rotate-12" />
        <Heart className="absolute top-32 right-20 h-16 w-16 text-pink-300 -rotate-12" />
        <Heart className="absolute bottom-20 left-32 h-12 w-12 text-purple-300 rotate-45" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Find Your
          <span className="block bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Perfect Match
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Where hearts connect and love stories begin. Join thousands of
          verified profiles to find your life partner with complete trust and
          security.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            type="primary"
            className="!px-8 !py-6 !bg-gradient-to-r !from-rose-500 !to-pink-600 !text-white !font-semibold !rounded-full hover:from-rose-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center space-x-2 !text-lg"
            icon={<Search className="h-5 w-5" />}
          >
            Start Your Search
          </Button>

          <Button
            type="default"
            className="!px-8 !py-6 !border-2 !border-rose-500 !text-rose-600 !font-semibold !rounded-full hover:bg-rose-50 transform hover:scale-105 transition-all duration-200 !text-lg"
          >
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-rose-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
            <div className="text-gray-600">Active Members</div>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-pink-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">2K+</div>
            <div className="text-gray-600">Success Stories</div>
          </div>

          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <div className="flex justify-center mb-4">
              <Crown className="h-12 w-12 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
            <div className="text-gray-600">Verified Profiles</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
