import React, { useState, useEffect } from "react";
import { Card, Button } from "antd";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  Eye,
  MessageSquare,
  Heart,
  Edit,
  Users,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router";
import { getAuth, updateProfile } from "firebase/auth";

const ProfilePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    photoURL: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [stats, setStats] = useState([
    { name: "Total Views", value: 0, icon: Eye },
    { name: "Contact Requests", value: 0, icon: MessageSquare },
    { name: "Favourites", value: 0, icon: Heart },
  ]);

  // Load user data from Firebase
  useEffect(() => {
    if (!user) return;

    setProfile({
      name: user.displayName || "",
      email: user.email,
      phone: user.phoneNumber || "",
      address: "",
      photoURL: user.photoURL || "",
    });
    setLoading(false);

    // Optional: Fetch stats from your backend
    fetch(
      `https://nikaahnest-server-side.vercel.app/api/dashboard-stats?userEmail=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const mappedStats = data.map((stat) => {
            let icon = Eye;
            if (stat.icon === "MessageSquare") icon = MessageSquare;
            else if (stat.icon === "Heart") icon = Heart;
            return { ...stat, icon };
          });
          setStats(mappedStats);
        }
      })
      .catch(() => toast.error("Failed to load profile stats"));
  }, [user]);

  // Input change handler
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Photo change handler
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, photoURL: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Save changes to Firebase
  const handleSave = () => {
    if (!user) return;
    setUpdating(true);

    updateProfile(auth.currentUser, {
      displayName: profile.name,
      photoURL: profile.photoURL,
    })
      .then(() => {
        toast.success("Profile updated successfully!");
        setUpdating(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update profile");
        setUpdating(false);
      });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  const quickActions = [
    { name: "Edit Biodata", icon: Edit, path: "/dashboard/edit-biodata" },
    {
      name: "View Favourites",
      icon: Heart,
      path: "/dashboard/favourites-biodata",
    },
    {
      name: "My Contact Requests",
      icon: MessageSquare,
      path: "/dashboard/contact-request",
    },
    { name: "Got Married", icon: Users, path: "/dashboard/got-married" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="mb-4">
        <Button
          type="default"
          icon={<ArrowLeft />}
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-rose-400">Profile</h1>
      </div>

      <Card className="shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 h-40 flex items-center justify-center relative">
          <div className="absolute -bottom-16">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
              <img
                src={profile.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                title="Change photo"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-6 p-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            {profile.name || "No Name"}
          </h2>
          <p className="text-center text-gray-500">{profile.email}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="text-center text-white">
            <button
              onClick={handleSave}
              disabled={updating}
              className={`px-6 py-3 rounded-full text-white font-semibold ${
                updating ? "bg-gray-400" : "bg-rose-500 hover:bg-rose-600"
              } transition`}
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {stats.map((stat) => (
          <Card
            key={stat.name}
            className="flex items-center justify-center space-x-4 p-6 shadow-lg rounded-xl border border-gray-100 hover:shadow-2xl transition"
          >
            <stat.icon className="h-10 w-10 text-rose-500" />
            <div>
              <p className="text-gray-500 font-medium">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <div
              key={action.name}
              onClick={() => navigate(action.path)}
              className="p-6 border border-gray-200 rounded-xl flex flex-col items-center justify-center hover:bg-rose-50 cursor-pointer transition"
            >
              <action.icon className="h-8 w-8 text-rose-500 mb-2" />
              <p className="text-gray-900 font-medium text-center">
                {action.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
