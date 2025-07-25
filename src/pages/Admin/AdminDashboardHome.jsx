// import React, { useEffect, useState } from "react";
// import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
// import {
//   HomeOutlined,
//   TeamOutlined,
//   CrownOutlined,
//   MessageOutlined,
//   HeartOutlined,
//   LogoutOutlined,
//   SafetyCertificateOutlined,
//   BarChartOutlined,
// } from "@ant-design/icons";
// import { Button, Card, Spin } from "antd";
// import ManageUsers from "./admin/ManageUsers";
// import ApprovedPremium from "./admin/ApprovedPremium";
// import ApprovedContactRequest from "./admin/ApprovedContactRequest";
// import SuccessStories from "./admin/SuccessStories";
// import { toast } from "sonner";

// const AdminDashboardHome = () => {
//   const navigate = useNavigate();

//   const [currentAdmin, setCurrentAdmin] = useState(null);
//   const [loadingAdmin, setLoadingAdmin] = useState(true);

//   // Fetch current admin info from backend API
//   const fetchCurrentAdmin = async () => {
//     setLoadingAdmin(true);
//     try {
//       const res = await fetch("http://localhost:3000/admin/current"); // Adjust backend URL
//       if (!res.ok) throw new Error("Failed to fetch admin info");
//       const data = await res.json();
//       setCurrentAdmin(data);
//     } catch (err) {
//       toast.error(err.message || "Failed to load admin info");
//     } finally {
//       setLoadingAdmin(false);
//     }
//   };

//   useEffect(() => {
//     fetchCurrentAdmin();
//   }, []);

//   const handleLogout = () => {
//     toast.success("Logged out successfully");
//     navigate("/");
//   };

//   const sidebarItems = [
//     { name: "Dashboard", path: "/admin/dashboard", icon: BarChartOutlined },
//     {
//       name: "Manage Users",
//       path: "/admin/dashboard/manage",
//       icon: TeamOutlined,
//     },
//     {
//       name: "Approved Premium",
//       path: "/admin/dashboard/approvedPremium",
//       icon: CrownOutlined,
//     },
//     {
//       name: "Approved Contact Request",
//       path: "/admin/dashboard/approvedContactRequest",
//       icon: MessageOutlined,
//     },
//     {
//       name: "Success Stories",
//       path: "/admin/dashboard/success-stories",
//       icon: HeartOutlined,
//     },
//   ];

//   if (loadingAdmin) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Spin size="large" tip="Loading admin info..." />
//       </div>
//     );
//   }

//   if (!currentAdmin) {
//     return (
//       <div className="flex justify-center items-center min-h-screen text-red-600">
//         Failed to load admin info.
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <Button
//               type="default"
//               icon={<HomeOutlined />}
//               onClick={() => navigate("/")}
//               className="flex items-center"
//             >
//               Home
//             </Button>
//             <div className="flex items-center space-x-3">
//               <SafetyCertificateOutlined className="text-blue-600 text-2xl" />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">
//                   Admin Dashboard
//                 </h1>
//                 <p className="text-gray-600">
//                   Welcome back, {currentAdmin.name}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <Button
//             danger
//             icon={<LogoutOutlined />}
//             onClick={handleLogout}
//             className="flex items-center"
//           >
//             Logout
//           </Button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-8 flex-grow grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* Sidebar */}
//         <aside className="lg:col-span-1">
//           <Card className="p-6">
//             <div className="flex items-center space-x-4 mb-6">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
//                 <SafetyCertificateOutlined className="text-white text-2xl" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">
//                   {currentAdmin.name}
//                 </h3>
//                 <p className="text-sm text-gray-600 truncate max-w-xs">
//                   {currentAdmin.email}
//                 </p>
//                 <span className="mt-1 inline-block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//                   Admin
//                 </span>
//               </div>
//             </div>

//             <nav className="space-y-2">
//               {sidebarItems.map(({ name, path }) => (
//                 <NavLink
//                   key={name}
//                   to={path}
//                   className={({ isActive }) =>
//                     `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
//                     ${
//                       isActive
//                         ? "bg-blue-100 text-blue-700"
//                         : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
//                     }`
//                   }
//                 >
//                   <Icon className="mr-3 text-lg" />
//                   {name}
//                 </NavLink>
//               ))}
//             </nav>
//           </Card>
//         </aside>

//         {/* Routes Content */}
//         <section className="lg:col-span-3 bg-white rounded-md shadow p-6 min-h-[600px]">
//           <Routes>
//             <Route path="/" element={<div>Dashboard Home Content</div>} />
//             <Route path="/manage" element={<ManageUsers />} />
//             <Route path="/approvedPremium" element={<ApprovedPremium />} />
//             <Route
//               path="/approvedContactRequest"
//               element={<ApprovedContactRequest />}
//             />
//             <Route path="/success-stories" element={<SuccessStories />} />
//           </Routes>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboardHome;
import React from "react";

const AdminDashboardHome = () => {
  return <div></div>;
};

export default AdminDashboardHome;
