import { Heart } from "lucide-react";
import React, { useState } from "react";
import {
  FaEye,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaPrayingHands,
} from "react-icons/fa";
import { Link } from "react-router";

const BiodataCard = ({ profile }) => {
  const {
    _id,
    name,
    age,
    occupation,
    religion,
    location,
    image,
    isPremium,
    likes: initialLikes = 0,
  } = profile;

  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false); // Optional: prevent multiple clicks

  const handleLike = async () => {
    if (hasLiked) return; // Prevent multiple likes from same user for now

    try {
      const res = await fetch(`http://localhost:3000/biodatas/like/${_id}`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (res.ok) {
        setLikes(likes + 1);
        setHasLiked(true);
      } else {
        console.error("Like failed:", data?.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error liking biodata:", error);
    }
  };

  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
      {/* Image Container */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover object-center"
        />

        {/* Premium Badge */}
        {isPremium && (
          <span className="absolute top-2 left-2 bg-rose-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            PREMIUM
          </span>
        )}

        {/* Love Icon with Like Count */}
        <button
          onClick={handleLike}
          className={`absolute top-2 right-2 bg-white text-rose-500 p-2 rounded hover:bg-rose-100 cursor-pointer flex items-center gap-1 ${
            hasLiked ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={hasLiked}
        >
          <Heart fill={hasLiked ? "currentColor" : "none"} />
          <span className="text-sm">{likes}</span>
        </button>
      </div>

      {/* Info Section */}
      <div className="p-4 space-y-2">
        <h2 className="text-2xl font-bold">{name}</h2>

        <p className="flex items-center text-gray-600 text-lg">
          <FaCalendarAlt className="mr-2 text-gray-700" /> Age: {age} years
        </p>

        <p className="flex items-center text-gray-600 text-lg">
          <FaMapMarkerAlt className="mr-2 text-gray-700" /> Location: {location}
        </p>

        <p className="flex items-center text-gray-600 text-lg">
          <FaBriefcase className="mr-2 text-gray-700" /> Occupation:{" "}
          {occupation}
        </p>

        <p className="flex items-center text-gray-600 text-lg">
          <FaPrayingHands className="mr-2 text-gray-700" /> Religion: {religion}
        </p>

        {/* View Profile Button */}
        <Link
          to={`/biodatas/${_id}`}
          className="mt-3 inline-flex items-center gap-2 text-white bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-lg transition"
        >
          <FaEye /> View Profile
        </Link>
      </div>
    </div>
  );
};

export default BiodataCard;
