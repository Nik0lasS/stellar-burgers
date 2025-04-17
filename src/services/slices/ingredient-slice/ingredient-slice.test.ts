import ingredientSlice, {
  ingredientInitialState,
  getIngredients
} from './ingredient-slice';
import { describe, expect, test } from '@jest/globals';

describe('Проверка редьюсеров ingredient-slice', () => {
  test('Ожидание выполнения запроса', () => {
    const state = ingredientSlice.reducer(
      ingredientInitialState,
      getIngredients.pending('')
    );
    expect(state).toEqual({
      ...ingredientInitialState,
      isLoading: true
    });
  });

  test('Успешное выполение запроса', () => {
    const payload = [
      {
        _id: '1',
        name: 'name',
        type: 'type',
        proteins: 1,
        fat: 1,
        carbohydrates: 1,
        calories: 1,
        price: 1,
        image: 'image',
        image_mobile: 'imageMobile',
        image_large: 'imageLarge'
      }
    ];
    const state = ingredientSlice.reducer(
      ingredientInitialState,
      getIngredients.fulfilled(payload, '')
    );
    expect(state).toEqual({
      ...ingredientInitialState,
      isLoading: false,
      ingredients: payload
    });
  });

  test('Ошибка выполнения запроса', () => {
    const error = 'error';
    const state = ingredientSlice.reducer(
      ingredientInitialState,
      getIngredients.rejected(new Error(error), '')
    );
    expect(state).toEqual({
      ...ingredientInitialState,
      isLoading: false,
      error: error
    });
  });
});
