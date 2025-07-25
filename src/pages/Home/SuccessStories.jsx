import React, { useEffect, useState } from "react";
import { Calendar, Heart, Star } from "lucide-react";
import axios from "axios";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const renderStars = (rating = 5) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-5 w-5 ${
        i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
      }`}
    />
  ));

const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-500 border-solid "></div>
  </div>
);

const SuccessStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchStoriesWithNames() {
      try {
        setLoading(true);
        setError(null);

        // Step 1: fetch success stories (contains biodata IDs)
        const resStories = await axios.get(
          "https://nikaahnest-server-side.vercel.app/success-stories"
        );
        const successStories = resStories.data;

        // Step 2: for each story, fetch both biodatas by ID in parallel
        const storiesWithNames = await Promise.all(
          successStories.map(async (story) => {
            try {
              const [selfRes, partnerRes] = await Promise.all([
                axios.get(
                  `https://nikaahnest-server-side.vercel.app/biodatas/${story.selfBiodataId}`
                ),
                axios.get(
                  `https://nikaahnest-server-side.vercel.app/biodatas/${story.partnerBiodataId}`
                ),
              ]);

              return {
                ...story,
                selfName: selfRes.data.name,
                partnerName: partnerRes.data.name,
              };
            } catch {
              // fallback if biodata fetch fails
              return {
                ...story,
                selfName: "Unknown",
                partnerName: "Unknown",
              };
            }
          })
        );

        setStories(storiesWithNames);
      } catch (err) {
        setError("Failed to load success stories.", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStoriesWithNames();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center p-8 text-red-600">{error}</p>;
  if (stories.length === 0)
    return <p className="text-center p-8">No success stories found.</p>;

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-rose-50 pt-20 pb-20">
      <div>
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Success Stories
        </h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Real love stories from couples who found their perfect match through
          our platform
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-xl relative overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {stories.map((story) => (
            <div
              key={story._id}
              className="min-w-full p-4 flex flex-col items-center text-center"
            >
              <div className="relative w-full max-h-80 mb-4">
                <img
                  src={story.coupleImageLink}
                  alt={`Couple`}
                  className="w-full h-80 object-cover rounded-md"
                />

                <div className="absolute bottom-10 left-3 font-bold text-white text-3xl px-4 py-1 rounded shadow bg-opacity-50">
                  {story.selfName} &amp; {story.partnerName}
                </div>

                <div className="absolute bottom-3 left-3 text-white text-lg px-3 py-1 rounded flex gap-3 items-center  bg-opacity-50">
                  <div className="flex gap-2 items-center">
                    <Calendar size={16} /> {formatDate(story.createdAt)}
                  </div>
                  <div className="flex">{renderStars(5)}</div>
                </div>
              </div>

              <p className="flex gap-2 items-center font-bold text-2xl">
                <Heart className="text-rose-500" /> Our Love Story{" "}
                <Heart className="text-rose-500" />
              </p>

              <p className="italic text-xl text-gray-700 mb-4">
                "{story.successStoryReview}"
              </p>
            </div>
          ))}
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

        {/* Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {stories.map((_, idx) => (
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
