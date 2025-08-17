import React, { useEffect, useState } from "react";
import BiodataCard from "../BioDatas/BiodataCard";
import { Link } from "react-router"; // Make sure this is correct
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const PremiumProfiles = () => {
  const [premiumProfiles, setPremiumProfiles] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [showAll, setShowAll] = useState(false); // NEW

  useEffect(() => {
    fetch("https://nikaahnest-server-side.vercel.app/biodatas")
      .then((res) => res.json())
      .then((data) => {
        const premiumOnly = data
          .filter((profile) => profile.isPremium)
          .sort((a, b) =>
            sortOrder === "asc" ? a.age - b.age : b.age - a.age
          );

        setPremiumProfiles(showAll ? premiumOnly : premiumOnly.slice(0, 6));
      });
  }, [sortOrder, showAll]);

  return (
    <div className="w-10/12 mx-auto px-4 py-10">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-rose-600">
          Premium Member Profiles
        </h2>
        <p className="text-gray-600 mt-2">
          Discover verified premium members who are serious about finding their
          life partner.
        </p>
      </div>

      {/* Sort Option */}
      <div className="flex justify-end items-center mb-4 text-lg pt-8 pb-5">
        <label className="mr-2 font-medium text-gray-700">Sort by Age:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Premium Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumProfiles.map((profile) => (
          <BiodataCard key={profile._id} profile={profile} />
        ))}
      </div>

      {/* View All / Show Less Button */}
      <div className="text-center mt-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="inline-block bg-rose-600 !text-white px-6 py-3 rounded-lg text-lg hover:bg-rose-700 transition"
        >
          {showAll ? "Show Less Profiles" : "View All Profiles"}
        </button>
      </div>
    </div>
  );
};

export default PremiumProfiles;
