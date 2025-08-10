// src/routes/AdminRouteSecure.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useGetLoggedUserQuery } from "../../redux/features/baseApi";

const AdminRouteSecure = () => {
  const { data: loggedInUser, isLoading, isError } = useGetLoggedUserQuery();
  console.log(loggedInUser);
  const allowedAdminEmail = "admin@gmail.com";

  if (isLoading) {
    return <span className="loading loading-bars loading-md"></span>;
  }

  if (isError || !loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  if (loggedInUser.email !== allowedAdminEmail) {
    return <Navigate to="/unauthorized" replace />;
  }
  

  return <Outlet />;
};

export default AdminRouteSecure;
