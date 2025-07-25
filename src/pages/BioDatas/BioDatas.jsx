import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BiodataCard from "./BiodataCard";
import { FaSearch, FaVenusMars, FaCalendarAlt, FaTimes } from "react-icons/fa";
import { Pagination } from "@mui/material";

const fetchBiodatas = async () => {
  const res = await axios.get(
    "https://nikaahnest-server-side.vercel.app/biodatas"
  ); // Change URL
  return res.data;
};

const BioDatas = () => {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const {
    data: profilesData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["biodatas"],
    queryFn: fetchBiodatas,
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading profiles...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Error fetching data</p>
    );

  const clearFilters = () => {
    setSearch("");
    setGender("");
    setAge("");
    setCurrentPage(1);
  };

  const filteredProfiles = profilesData.filter((profile) => {
    const matchesName = profile.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGender = gender ? profile.gender === gender : true;
    const matchesAge = age ? profile.age.toString() === age : true;
    return matchesName && matchesGender && matchesAge;
  });

  const totalItems = filteredProfiles.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProfiles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="text-center my-8">
        <h1 className="text-3xl font-bold text-rose-600">
          Find Your Perfect Match
        </h1>
        <p className="text-gray-600 mt-2">
          Browse through our diverse collection of verified profiles and
          discover your life partner.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        <div className="relative">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>

        <div className="relative">
          <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>

        <div className="relative">
          <FaVenusMars className="absolute top-3 left-3 text-gray-400" />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          >
            <option value="">Gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>

        <button
          onClick={clearFilters}
          className="flex items-center gap-2 text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          <FaTimes /> Clear
        </button>
      </div>

      {/* Showing Count */}
      <p className="text-lg text-gray-500 mb-4 pt-8">
        Showing {startIndex + 1} -{" "}
        {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}{" "}
        profiles
      </p>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((profile) => (
          <BiodataCard key={profile._id} profile={profile} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </div>
      )}
    </div>
  );
};

export default BioDatas;
