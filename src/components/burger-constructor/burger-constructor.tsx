import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

import {
  setOrderRequest,
  setOrderModalDataNull,
  constructorS,
  orderBurger,
  getIsAuthS
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(getIsAuthS);
  const burgerConstructorState = useSelector(constructorS);

  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = burgerConstructorState.constructorItems;

  const orderRequest = burgerConstructorState.orderRequest;

  const orderModalData = burgerConstructorState.orderModalData;

  const onOrderClick = () => {
    if (constructorItems.bun && !isAuth) {
      navigate('/login');
    }

    if (constructorItems.bun && isAuth) {
      dispatch(setOrderRequest(true));

      const order = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ];
      dispatch(orderBurger(order));
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderRequest(false));
    dispatch(setOrderModalDataNull());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
