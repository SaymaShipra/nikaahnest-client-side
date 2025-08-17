// import React, { useContext, useEffect, useState } from "react";
// import { NavLink } from "react-router";
// import { AuthContext } from "../../../context/AuthContext";

// const Navbar = () => {
//   const { user } = useContext(AuthContext);
//   const [userRole, setUserRole] = useState("user");

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       if (user?.email) {
//         try {
//           const res = await fetch(
//             `https://nikaahnest-server-side.vercel.app/users/search?email=${user.email}`
//           );
//           const data = await res.json();
//           console.log("Fetched role data:", data); // Should show role
//           setUserRole(data?.role || "user");
//         } catch (error) {
//           console.error("Error fetching user role:", error);
//         }
//       }
//     };
//     fetchUserRole();
//   }, [user]);

//   return (
//     <div>
//       <nav className="sticky top-0 z-50 bg-base-100 shadow-md border-b border-gray-200">
//         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
//           <img
//             src="https://i.ibb.co/NDy7Vbd/Brown-and-Beige-Luxury-Hotel-Logo-2-removebg-preview.png"
//             className="w-48"
//             alt="Logo"
//           />

//           <div className="flex md:order-2 items-center gap-3">
//             {user ? (
//               userRole === "admin" ? (
//                 <NavLink to="/admin">
//                   <button className="bg-rose-500 hover:bg-rose-700 !text-white text-lg px-6 py-2 rounded-lg">
//                     Admin Dashboard
//                   </button>
//                 </NavLink>
//               ) : (
//                 <NavLink to="/dashboard">
//                   <button className="bg-rose-400 hover:bg-rose-600 !text-white text-lg px-6 py-2 rounded-lg">
//                     Dashboard
//                   </button>
//                 </NavLink>
//               )
//             ) : (
//               <>
//                 <NavLink to="/register">
//                   <button className="bg-rose-400 hover:bg-rose-600 !text-white text-lg px-4 py-2 rounded-lg">
//                     Register
//                   </button>
//                 </NavLink>
//                 <NavLink to="/login">
//                   <button className="bg-rose-400 hover:bg-rose-600 !text-white text-lg px-6 py-2 rounded-lg">
//                     Login
//                   </button>
//                 </NavLink>
//               </>
//             )}
//           </div>

//           <div
//             className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
//             id="navbar-cta"
//           >
//             <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
//               {[
//                 { label: "Home", path: "/" },
//                 { label: "Biodatas", path: "/bioData" },
//                 { label: "About Us", path: "/about" },
//                 { label: "Contact Us", path: "/contact" },
//               ].map(({ label, path }) => (
//                 <li key={path}>
//                   <NavLink
//                     to={path}
//                     className={({ isActive }) =>
//                       isActive
//                         ? "block py-2 px-3 md:p-0 text-rose-500"
//                         : "block py-2 px-3 md:p-0 text-gray-500"
//                     }
//                   >
//                     {label}
//                   </NavLink>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          const res = await fetch(
            `https://nikaahnest-server-side.vercel.app/users/search?email=${user.email}`
          );
          const data = await res.json();
          setUserRole(data?.role || "user");
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    fetchUserRole();
  }, [user]);

  const loggedOutLinks = [
    { label: "Home", path: "/" },
    { label: "Biodatas", path: "/bioData" },
    { label: "About Us", path: "/about" },
  ];

  const loggedInLinks = [
    { label: "Home", path: "/" },
    { label: "Biodatas", path: "/bioData" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/contact" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 md:px-20 flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/">
          <img
            src="https://i.ibb.co/NDy7Vbd/Brown-and-Beige-Luxury-Hotel-Logo-2-removebg-preview.png"
            alt="Logo"
            className="w-48"
          />
        </NavLink>

        <ul className="hidden md:flex items-center space-x-6 font-medium text-gray-500">
          {(user ? loggedInLinks : loggedOutLinks).map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-rose-500"
                    : "hover:text-rose-500 transition-colors"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {user ? (
            userRole === "admin" ? (
              <NavLink to="/admin">
                <button className="bg-rose-500 hover:bg-rose-700 text-white text-lg px-6 py-2 rounded-lg">
                  Admin Dashboard
                </button>
              </NavLink>
            ) : (
              <NavLink to="/dashboard">
                <button className="bg-rose-400 hover:bg-rose-600 !text-white text-lg px-6 py-2 rounded-lg">
                  Dashboard
                </button>
              </NavLink>
            )
          ) : (
            <>
              <NavLink to="/register">
                <button className="bg-rose-400 hover:bg-rose-600 !text-white text-lg px-4 py-2 rounded-lg">
                  Register
                </button>
              </NavLink>
              <NavLink to="/login">
                <button className="bg-rose-400 hover:bg-rose-600 !text-white text-lg px-6 py-2 rounded-lg">
                  Login
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
