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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "bioData",
        loader: () => fetch("http://localhost:3000/biodatas"),
        element: (
          <PrivateRoute>
            <BioDatas />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        Component: About,
      },

      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "dashboard",
        Component: Dashboard,
      },

      {
        path: "dashboard/edit-biodata",
        Component: EditBiodata,
      },
      {
        path: "dashboard/view-biodata",
        Component: ViewBiodata,
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
        path: "biodatas/:id",
        element: <ProfileDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/biodatas/${params.id}`),
      },

      {
        path: "/checkout/:biodataId",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/biodatas/${params.biodataId}`),
      },
    ],
  },
]);
