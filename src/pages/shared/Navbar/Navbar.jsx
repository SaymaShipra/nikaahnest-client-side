import React, { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <nav className="sticky top-0 z-50 bg-base-100 shadow-md border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <img src="/src/assets/logo.png" className="w-48" alt="Logo" />

          {/* Right buttons */}
          <div className="flex md:order-2 items-center gap-3">
            {user ? (
              <NavLink to="/dashboard">
                <button className="bg-rose-400 hover:bg-rose-600 focus:ring-2 focus:outline-none focus:ring-pink-600 font-medium rounded-lg text-lg px-6 py-2 !text-white">
                  Dashboard
                </button>
              </NavLink>
            ) : (
              <>
                <NavLink to="/register">
                  <button className="bg-rose-400 hover:bg-rose-600 focus:ring-2 focus:outline-none focus:ring-pink-600 font-medium rounded-lg text-lg px-4 py-2 !text-white">
                    Register
                  </button>
                </NavLink>
                <NavLink to="/login">
                  <button className="bg-rose-400 hover:bg-rose-600 focus:ring-2 focus:outline-none focus:ring-pink-600 font-medium rounded-lg text-lg px-6 py-2 !text-white">
                    Login
                  </button>
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile toggle button */}
          <button
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Main menu */}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
              {[
                { label: "Home", path: "/" },
                { label: "Biodatas", path: "/bioData" },
                { label: "About Us", path: "/about" },
                { label: "Contact Us", path: "/contact" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 px-3 md:p-0 text-rose-500"
                        : "block py-2 px-3 md:p-0 text-gray-500"
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
