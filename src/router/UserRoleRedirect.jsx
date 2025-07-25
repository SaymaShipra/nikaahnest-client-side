import React, { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const UserRoleRedirect = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setRoleLoading(true);
      // Fetch role info from your backend
      fetch(
        `https://nikaahnest-server-side.vercel.app/users/role?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRole(data.role); // assume backend sends { role: 'admin' } or { role: 'user' }
        })
        .catch(() => {
          setRole("user"); // fallback role
        })
        .finally(() => setRoleLoading(false));
    } else {
      setRole(null);
      setRoleLoading(false);
    }
  }, [user]);

  if (loading || roleLoading) {
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-xs"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect based on role
  if (role === "admin") {
    if (location.pathname.startsWith("/admin")) {
      return children; // admin routes allowed
    } else {
      return <Navigate to="/admin" replace />;
    }
  } else {
    // regular user
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/" replace />; // prevent normal user access to admin routes
    }
    return children;
  }
};

export default UserRoleRedirect;
