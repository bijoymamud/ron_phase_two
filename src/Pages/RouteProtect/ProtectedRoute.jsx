
// components/SubscriptionRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, hasSubscription, redirectPath = "/subscribe" }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasSubscription) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
