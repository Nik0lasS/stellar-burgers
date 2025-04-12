import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserS } from '@slices';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(getUserS)?.name;
  return <AppHeaderUI userName={user} />;
};
