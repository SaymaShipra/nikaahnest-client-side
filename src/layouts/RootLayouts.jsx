// import React from "react";
// import Navbar from "../pages/shared/Navbar/Navbar";

// import { Outlet, useLocation } from "react-router";
// import Footer from "../pages/shared/Footer/Footer";

// const RootLayouts = () => {
//   const location = useLocation();
//   const noNavbarPaths = ["/dashboard"];

//   const hideNavbar = noNavbarPaths.includes(location.pathname);
//   return (
//     <div>
//       {!hideNavbar && <Navbar />}
//       <Outlet />
//       <Footer />
//     </div>
//   );
// };

// export default RootLayouts;

import React from "react";
import Navbar from "../pages/shared/Navbar/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../pages/shared/Footer/Footer";

const RootLayouts = () => {
  const location = useLocation();

  // Paths where Navbar and Footer should be hidden
  const noNavbarFooterPaths = ["/dashboard", "/admin"];

  // Hide navbar & footer if current path starts with any of these
  const hideNavbarFooter = noNavbarFooterPaths.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith(path + "/")
  );

  return (
    <div>
      {!hideNavbarFooter && <Navbar />}
      <Outlet />
      {!hideNavbarFooter && <Footer />}
    </div>
  );
};

export default RootLayouts;
