import { useSelector } from '../../services/store';
import { getIsAuthS } from '@slices';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuth = useSelector(getIsAuthS);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  if (onlyUnAuth && isAuth) {
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
