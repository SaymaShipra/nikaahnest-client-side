import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router";
import {
  User,
  Edit,
  Eye,
  Heart,
  MessageSquare,
  LogOut,
  Home,
  Users,
} from "lucide-react";
import { Button, Card } from "antd";
import { toast } from "sonner";
import axios from "axios";

import ViewBiodata from "./ViewBiodata";
import ContactRequest from "./ContactRequest";
import GotMarried from "./GotMarried";
import EditBiodata from "./EditBiodata";
import FavouritesBiodata from "./FavouritesBiodata";
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);
  const [stats, setStats] = useState([
    { name: "Total Views", value: 0, icon: Eye },
    { name: "Contact Requests", value: 0, icon: MessageSquare },
    { name: "Favourites", value: 0, icon: Heart },
  ]);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `http://localhost:3000/api/dashboard-stats?userEmail=${user.email}`
        )
        .then((res) => {
          if (res.data && Array.isArray(res.data)) {
            const mappedStats = res.data.map((stat) => {
              let icon = Eye;
              if (stat.icon === "MessageSquare") icon = MessageSquare;
              else if (stat.icon === "Heart") icon = Heart;
              return { ...stat, icon };
            });
            setStats(mappedStats);
          }
        })
        .catch(() => {
          toast.error("Failed to load dashboard stats");
        });
    }
  }, [user]);

  const handleLogout = () => {
    signOutUser()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Failed to logout");
      });
  };

  const sidebarItems = [
    { name: "Edit Biodata", path: "edit-biodata", icon: Edit },
    { name: "View Biodata", path: "view-biodata", icon: Eye },
    {
      name: "My Contact Request",
      path: "contact-request",
      icon: MessageSquare,
    },
    { name: "Favourites Biodata", path: "favourites-biodata", icon: Heart },
    { name: "Got Married", path: "got-married", icon: Users },
  ];

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-700 text-xl">
        Loading or not authenticated...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              type="default"
              icon={<Home />}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">
                Welcome back, {user.displayName || user.email}
              </p>
            </div>
          </div>
          <Button danger icon={<LogOut />} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <Card className="lg:col-span-1 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {user.displayName || "No Name"}
              </h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.name}
                to={`/dashboard/${item.path}`}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "!bg-rose-100 !text-rose-700"
                      : "!text-gray-700 hover:!bg-gray-100"
                  }`
                }
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Routes>
            <Route
              path="edit-biodata"
              element={<EditBiodata userEmail={user.email} />}
            />
            <Route
              path="view-biodata"
              element={<ViewBiodata userEmail={user.email} />}
            />
            <Route
              path="contact-requests"
              element={<ContactRequest userEmail={user.email} />}
            />
            <Route
              path="favourites-biodata"
              element={<FavouritesBiodata userEmail={user.email} />}
            />
            <Route
              path="got-married"
              element={<GotMarried userEmail={user.email} />}
            />
            <Route path="" element={<DashboardHome stats={stats} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = ({ stats }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <div className="p-6 flex items-center">
              <stat.icon className="h-8 w-8 text-rose-600 flex-shrink-0" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NavLink to="/dashboard/edit-biodata">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <Edit className="h-6 w-6 text-rose-600 mb-2" />
                <h4 className="font-medium text-gray-900">Edit Your Biodata</h4>
                <p className="text-sm text-gray-600">Update profile info</p>
              </div>
            </NavLink>
            <NavLink to="/dashboard/favourites-biodata">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <Heart className="h-6 w-6 text-rose-600 mb-2" />
                <h4 className="font-medium text-gray-900">View Favourites</h4>
                <p className="text-sm text-gray-600">
                  See your favourite profiles
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
