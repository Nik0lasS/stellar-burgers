import orderSlice, { getOrderByNumber, orderInitialState } from './order-slice';
import { describe, expect, test } from '@jest/globals';

describe('Проверка редьюсеров order-slice', () => {
  test('Ожидание выполнения запроса', () => {
    const state = orderSlice.reducer(
      orderInitialState,
      getOrderByNumber.pending('', 1)
    );
    expect(state).toEqual({
      ...orderInitialState,
      isLoading: true
    });
  });

  test('Успешное выполение запроса', () => {
    const payload = {
      success: true,
      orders: [
        {
          _id: '1',
          name: 'name',
          status: 'status',
          createdAt: 'createdAt',
          updatedAt: 'updatedAt',
          number: 1,
          ingredients: []
        }
      ]
    };
    const state = orderSlice.reducer(
      orderInitialState,
      getOrderByNumber.fulfilled(payload, '', 1)
    );
    expect(state).toEqual({
      ...orderInitialState,
      isLoading: false,
      order: payload.orders[0]
    });
  });

  test('Ошибка выполнения запроса', () => {
    const error = 'error';
    const state = orderSlice.reducer(
      orderInitialState,
      getOrderByNumber.rejected(new Error(error), '', 1)
    );
    expect(state).toEqual({
      ...orderInitialState,
      isLoading: false,
      error: error
    });
  });
});
