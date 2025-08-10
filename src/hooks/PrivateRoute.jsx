import { Navigate, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;

