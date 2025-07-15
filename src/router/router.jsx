import { createBrowserRouter } from "react-router";

import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import Contact from "../pages/Contact/Contact";
import BioDatas from "../pages/BioDatas/BioDatas";
import About from "../pages/About/About";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

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
        Component: BioDatas,
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
    ],
  },
]);
