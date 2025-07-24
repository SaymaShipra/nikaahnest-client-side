import React from "react";
import Navbar from "../pages/shared/Navbar/Navbar";

import { Outlet, useLocation } from "react-router";
import Footer from "../pages/shared/Footer/Footer";

const RootLayouts = () => {
  const location = useLocation();
  const noNavbarPaths = ["/dashboard"];
  const hideNavbar = noNavbarPaths.includes(location.pathname);
  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayouts;
