import rootReducer from './root-reducer';
import { describe, expect, test } from '@jest/globals';
import {
  constructorInitialState,
  feedInitialState,
  ingredientInitialState,
  orderInitialState,
  userInitialState
} from '@slices';

const initialState = {
  burgerConstructor: constructorInitialState,
  feed: feedInitialState,
  ingredient: ingredientInitialState,
  order: orderInitialState,
  user: userInitialState
};

describe('Проверка root-reducer', () => {
  test('Правильная инициализация root-reducer', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });
});
