
import { Navigate } from 'react-router-dom';
import { useGetLoggedUserQuery } from '../redux/features/baseApi';

const RouteSecure = ({ children }) => {
  const { data: userInfo, isLoading } = useGetLoggedUserQuery();

  if (isLoading) return <span className="loading loading-bars loading-lg"></span>;

  const hasPaid = userInfo?.is_active === true;

  return hasPaid ? children : <Navigate to="/active" replace />;
};

export default RouteSecure;

