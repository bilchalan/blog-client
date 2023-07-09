import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../auth/slice/authSlice';

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAppSelector(selectCurrentUser);
  const location = useLocation();

  return user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="unauthorized" state={{ form: location }} replace />
  ) : (
    <Navigate to="auth" state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
