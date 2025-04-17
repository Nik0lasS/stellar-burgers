import feedSlice, { getFeeds, getOrders, feedInitialState } from './feed-slice';
import { describe, expect, test } from '@jest/globals';

describe('Проверка редьюсеров feed-slice', () => {
  describe('Проверка редьюсера getFeeds', () => {
    test('Ожидание выполнения запроса', () => {
      const state = feedSlice.reducer(feedInitialState, getFeeds.pending(''));
      expect(state).toEqual({
        ...feedInitialState,
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
        ],
        total: 1,
        totalToday: 1
      };
      const state = feedSlice.reducer(
        feedInitialState,
        getFeeds.fulfilled(payload, '')
      );
      expect(state).toEqual({
        ...feedInitialState,
        isLoading: false,
        orders: payload.orders,
        total: payload.total,
        totalToday: payload.totalToday
      });
    });

    test('Ошибка выполнения запроса', () => {
      const error = 'error';
      const state = feedSlice.reducer(
        feedInitialState,
        getFeeds.rejected(new Error(error), '')
      );
      expect(state).toEqual({
        ...feedInitialState,
        isLoading: false,
        error: error
      });
    });
  });

  describe('Проверка редьюсера getOrders', () => {
    test('Ожидание выполнения запроса', () => {
      const state = feedSlice.reducer(feedInitialState, getOrders.pending(''));
      expect(state).toEqual({
        ...feedInitialState,
        isLoading: true
      });
    });

    test('Успешное выполение запроса', () => {
      const payload = [
        {
          _id: '1',
          name: 'name',
          status: 'status',
          createdAt: 'createdAt',
          updatedAt: 'updatedAt',
          number: 1,
          ingredients: []
        }
      ];
      const state = feedSlice.reducer(
        feedInitialState,
        getOrders.fulfilled(payload, '')
      );
      expect(state).toEqual({
        ...feedInitialState,
        isLoading: false,
        orders: payload
      });
    });

    test('Ошибка выполнения запроса', () => {
      const error = 'error';
      const state = feedSlice.reducer(
        feedInitialState,
        getOrders.rejected(new Error(error), '')
      );
      expect(state).toEqual({
        ...feedInitialState,
        isLoading: false,
        error: error
      });
    });
  });
});
