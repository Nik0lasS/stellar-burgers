import { useSelector } from '../../services/store';
import { getIsAuthS, getIsLoadingS } from '@slices';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';

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
  const preloaderState = useSelector(getIsLoadingS);

  if (preloaderState) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
