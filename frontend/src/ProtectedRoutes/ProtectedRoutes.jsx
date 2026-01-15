// import React from "react";
// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../Context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { token } = useContext(AuthContext);

//   // No token = Not logged in → redirect to login
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, token } = useContext(AuthContext);

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
