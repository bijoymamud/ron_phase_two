import { Navigate } from "react-router-dom";
import { useGetLoggedUserQuery } from "../redux/features/baseApi";
import Loading from "../Loading/Loading";

const RouteSecure = ({ children }) => {
  const { data: userInfo, isLoading, isFetching } = useGetLoggedUserQuery();

  if (isLoading || isFetching || !userInfo) {
    return <Loading />;
  }

  const hasPaid = userInfo?.is_active === true;

  return hasPaid ? children : <Navigate to="/active" replace />;
};

export default RouteSecure;
