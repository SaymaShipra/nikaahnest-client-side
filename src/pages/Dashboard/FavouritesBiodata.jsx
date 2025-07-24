import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Heart, Trash2, Eye } from "lucide-react";
import { AuthContext } from "../../context/AuthContext"; // Adjust path as needed
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FavouritesBiodata = () => {
  const { user } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/favourites?userEmail=${user.email}`
        );
        setFavourites(res.data);
      } catch (error) {
        toast.error("Failed to fetch favourites");
        console.error(error);
      }
    };

    fetchFavourites();
  }, [user?.email]);

  const handleDelete = async (biodataId) => {
    if (!user?.email) return;

    try {
      await axios.delete("http://localhost:3000/favourites", {
        data: { userEmail: user.email, biodataId },
      });
      setFavourites((prev) => prev.filter((fav) => fav._id !== biodataId));
      toast.success("Removed from favourites");
    } catch (error) {
      toast.error("Failed to remove favourite");
      console.error(error);
    }
  };

  const handleViewBiodata = (biodataId) => {
    navigate(`/biodatas/${biodataId}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Toast container - you can move this to your root App if you want */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center text-xl font-semibold text-rose-600 mb-4">
          <Heart className="h-5 w-5 mr-2" /> My Favourite Biodatas
        </div>

        {favourites.length === 0 ? (
          <div className="text-center py-8">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Favourites Yet
            </h3>
            <p className="text-gray-600 mb-4">
              You haven't added any biodatas to your favourites.
            </p>
            <button
              onClick={() => navigate("/biodata")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Browse Biodatas
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Biodata ID</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Age</th>
                  <th className="px-4 py-2">Permanent Address</th>
                  <th className="px-4 py-2">Occupation</th>
                  <th className="px-4 py-2">Added Date</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {favourites.map((fav) => (
                  <tr key={fav._id} className="border-b">
                    <td className="px-4 py-2 font-medium">{fav.name}</td>
                    <td className="px-4 py-2">#{fav._id}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          fav.biodataType === "Male"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-pink-100 text-pink-700"
                        }`}
                      >
                        {fav.gender}
                      </span>
                    </td>
                    <td className="px-4 py-2">{fav.age} years</td>
                    <td className="px-4 py-2">{fav.location}</td>
                    <td className="px-4 py-2">{fav.occupation}</td>
                    <td className="px-4 py-2">{formatDate(fav.createdAt)}</td>
                    <td className="px-4 py-2 flex gap-2 space-x-2">
                      <button
                        onClick={() => handleViewBiodata(fav._id)}
                        className="p-2 border rounded hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(fav._id)}
                        className="p-2 border rounded text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center">
            <Heart className="h-6 w-6 text-rose-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Favourites</p>
              <p className="text-xl font-semibold">{favourites.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center">
            <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Male Profiles</p>
              <p className="text-xl font-semibold">
                {favourites.filter((f) => f.gender === "Male").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center">
            <div className="h-6 w-6 bg-pink-100 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-pink-600 rounded-full"></div>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Female Profiles</p>
              <p className="text-xl font-semibold">
                {favourites.filter((f) => f.gender === "Female").length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavouritesBiodata;
