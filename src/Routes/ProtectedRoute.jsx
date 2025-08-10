import { Navigate, useNavigate } from "react-router-dom";

import { useGetLoggedUserQuery } from "../redux/features/baseApi";
import Loading from "../Loading/Loading";
const ProtectedRoute = ({ children }) => {
  const { data: userData, isLoading } = useGetLoggedUserQuery();
  const navigate = useNavigate();
  console.log({ userData });

  if (isLoading) return <Loading />;
  if (!userData) navigate("/");
  if (userData.email === "admin@gmail.com") return children;
  return navigate("/login");
};

export default ProtectedRoute;
