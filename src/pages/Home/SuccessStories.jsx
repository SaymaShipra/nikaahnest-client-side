import React, { useState } from "react";
import { Calendar, Heart, Star } from "lucide-react";

const successStories = [
  {
    id: 1,
    coupleImage:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop",
    marriageDate: "2024-05-15",
    reviewStar: 5,
    successStoryText:
      "We met through Harmonious Union Hub and instantly felt a connection. The platform made it easy to find someone who shared our values and dreams. Today, we're happily married with a beautiful baby girl!",
    groomName: "Ahmed Rahman",
    brideName: "Fatima Khan",
  },
  {
    id: 2,
    coupleImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
    marriageDate: "2024-03-22",
    reviewStar: 5,
    successStoryText:
      "After years of searching, we found each other on this amazing platform. The detailed profiles and verification process gave us confidence in our choice. We're grateful for bringing us together!",
    groomName: "Tariq Hassan",
    brideName: "Nadia Ahmed",
  },
  {
    id: 3,
    coupleImage:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
    marriageDate: "2024-01-18",
    reviewStar: 5,
    successStoryText:
      "Our families were looking for the perfect match for us, and Harmonious Union Hub exceeded all expectations. The platform is trustworthy and helped us find our soulmate. Highly recommended!",
    groomName: "Rayhan Ali",
    brideName: "Sadia Rahman",
  },
  {
    id: 4,
    coupleImage:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop",
    marriageDate: "2023-12-10",
    reviewStar: 4,
    successStoryText:
      "What started as a simple profile view turned into the most beautiful love story. We connected instantly and knew we were meant for each other. Thank you for making our dreams come true!",
    groomName: "Karim Sheikh",
    brideName: "Rubaiya Islam",
  },
  {
    id: 5,
    coupleImage:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop",
    marriageDate: "2023-11-25",
    reviewStar: 5,
    successStoryText:
      "We were both busy professionals who didn't have time for traditional matchmaking. This platform made it convenient to find someone who understood our lifestyle and values. We're now blissfully married!",
    groomName: "Mahbub Alam",
    brideName: "Taslima Begum",
  },
];

const renderStars = (rating) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-5 w-5 ${
        i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
      }`}
    />
  ));

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const SuccessStories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? successStories.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((prev) =>
      prev === successStories.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-rose-50 pt-20 pb-20">
      <div>
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Success Stories
        </h2>
        <p className="text-lg text-gray-600 text-center">
          Real love stories from couples who found their perfect match through
          our platform
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl">
        {/* Carousel container */}
        <div className="relative overflow-hidden rounded-lg">
          {/* Slides */}
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {successStories.map(
              ({
                id,
                coupleImage,
                marriageDate,
                reviewStar,
                successStoryText,
                groomName,
                brideName,
              }) => (
                <div
                  key={id}
                  className="min-w-full p-4 flex flex-col items-center text-center"
                >
                  <div className="relative w-full max-h-80 mb-4">
                    <img
                      src={coupleImage}
                      alt={`${groomName} & ${brideName}`}
                      className="w-full h-80 object-cover rounded-md"
                    />

                    {/* Names Bottom Left */}
                    <div className="absolute bottom-10 left-3 font-bold  text-white text-3xl px-4 py-1 rounded shadow ">
                      {groomName} & {brideName}
                    </div>

                    {/* Date + Stars Bottom Right */}
                    <div className="absolute bottom-3 left-3 text-white text-lg  px-3 py-1 rounded flex gap-3 items-center">
                      <div className="flex gap-2 items-center">
                        <Calendar size={16} /> {formatDate(marriageDate)}
                      </div>
                      <div className="flex">{renderStars(reviewStar)}</div>
                    </div>
                  </div>

                  <p className="flex gap-2 items-center font-bold text-2xl">
                    <Heart className="text-rose-500" /> Our Love Story{" "}
                    <Heart className="text-rose-500" />
                  </p>

                  <p className="italic text-xl text-gray-700 mb-4">
                    "{successStoryText}"
                  </p>
                </div>
              )
            )}
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow"
            aria-label="Previous Slide"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow"
            aria-label="Next Slide"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {successStories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === activeIndex ? "bg-rose-400" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
