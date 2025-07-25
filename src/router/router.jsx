import { createBrowserRouter } from "react-router";

import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import BioDatas from "../pages/BioDatas/BioDatas";
import About from "../pages/About/About";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import ProfileDetails from "../pages/BioDatas/ProfileDetails";
import Checkout from "../pages/BioDatas/Checkout";
import EditBiodata from "../pages/Dashboard/EditBiodata";
import ViewBiodata from "../pages/Dashboard/ViewBiodata";
import ContactRequest from "../pages/Dashboard/ContactRequest";
import FavouritesBiodata from "../pages/Dashboard/FavouritesBiodata";
import GotMarried from "../pages/Dashboard/GotMarried";
import AdminManagement from "../pages/Dashboard/AdminManagemen";
import ApprovedPremium from "../pages/Admin/ApprovedPremium";
import AdminDashboardHome from "../pages/Admin/AdminDashboardHome";
import ApprovedContactRequest from "../pages/Admin/ApprovedContactRequest";
import ManageUsers from "../pages/Admin/ManageUsers";
import SuccessStories from "../pages/Admin/SuccessStories";
import AdminDashboard from "../AdminDashboard";
import MakeAdmin from "../pages/Admin/MakeAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },

      // Protected Routes
      {
        path: "bioData",
        element: (
          <PrivateRoute>
            <BioDatas />
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://nikaahnest-server-side.vercel.app/biodatas"),
      },
      {
        path: "biodatas/:id",
        element: (
          <PrivateRoute>
            <ProfileDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://nikaahnest-server-side.vercel.app/biodatas/${params.id}`
          ),
      },
      {
        path: "checkout/:biodataId",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://nikaahnest-server-side.vercel.app/biodatas/${params.biodataId}`
          ),
      },

      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/edit-biodata",
        element: (
          <PrivateRoute>
            <EditBiodata />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/view-biodata",
        element: (
          <PrivateRoute>
            <ViewBiodata />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/contact-request",
        element: (
          <PrivateRoute>
            <ContactRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/favourites-biodata",
        element: (
          <PrivateRoute>
            <FavouritesBiodata />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/got-married",
        element: (
          <PrivateRoute>
            <GotMarried />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/adminManagement",
        element: (
          <PrivateRoute>
            <AdminManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminDashboardHome />,
          },
          {
            path: "manage",
            element: <ManageUsers />,
          },
          {
            path: "approvedPremium",
            element: <ApprovedPremium />,
          },
          {
            path: "approvedContactRequest",
            element: <ApprovedContactRequest />,
          },
          {
            path: "success-stories",
            element: <SuccessStories />,
          },
          {
            path: "admin-management",
            element: <AdminManagement />,
          },
          {
            path: "make-admin",
            element: <MakeAdmin />,
          },
        ],
      },
    ],
  },
]);
