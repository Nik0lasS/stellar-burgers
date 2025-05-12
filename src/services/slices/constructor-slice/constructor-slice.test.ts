import constructorSlice, {
  addIngredients,
  removeIngredient,
  handleMoveUpFunc,
  handleMoveDownFunc,
  orderBurger,
  constructorInitialState
} from './constructor-slice';
import { describe, expect, test } from '@jest/globals';

describe('Проверка редьюсеров constructor-slice', () => {
  const ingredient = {
    id: '1',
    _id: '1',
    name: 'name',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: 'image',
    image_mobile: 'imageMobile',
    image_large: 'imageLarge'
  };

  const bun = { ...ingredient, id: '2', _id: '2', type: 'bun' };

  test('Проверка редьюсера addIngredients с ingredient', () => {
    const state = constructorSlice.reducer(
      constructorInitialState,
      addIngredients(ingredient)
    );
    expect(state.constructorItems.ingredients).toEqual([
      { ...ingredient, id: expect.any(String) }
    ]);
  });

  test('Проверка редьюсера addIngredients с bun', () => {
    const state = constructorSlice.reducer(
      constructorInitialState,
      addIngredients(bun)
    );
    expect(state.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  test('Проверка редьюсера removeIngredient', () => {
    const state = constructorSlice.reducer(
      {
        ...constructorInitialState,
        constructorItems: {
          bun: null,
          ingredients: [ingredient]
        }
      },
      removeIngredient(ingredient)
    );
    expect(state.constructorItems.ingredients).toEqual([]);
  });

  test('Проверка редьюсера handleMoveUpFunc', () => {
    const state = constructorSlice.reducer(
      {
        ...constructorInitialState,
        constructorItems: {
          bun: null,
          ingredients: [ingredient, { ...ingredient, id: '2' }]
        }
      },
      handleMoveUpFunc(1)
    );
    expect(state.constructorItems.ingredients).toEqual([
      { ...ingredient, id: '2' },
      ingredient
    ]);
  });

  test('Проверка редьюсера handleMoveDownFunc', () => {
    const state = constructorSlice.reducer(
      {
        ...constructorInitialState,
        constructorItems: {
          bun: null,
          ingredients: [{ ...ingredient, id: '2' }, ingredient]
        }
      },
      handleMoveDownFunc(0)
    );
    expect(state.constructorItems.ingredients).toEqual([
      ingredient,
      { ...ingredient, id: '2' }
    ]);
  });

  describe('Проверка редьюсера orderBurger', () => {
    test('Ожидание выполнения запроса', () => {
      const state = constructorSlice.reducer(
        constructorInitialState,
        orderBurger.pending('', [])
      );
      expect(state).toEqual({
        ...constructorInitialState,
        isLoading: true
      });
    });

    test('Успешное выполение запроса', () => {
      const payload = {
        success: true,
        order: {
          _id: 'order1',
          id: 'order1',
          name: 'name',
          status: 'status',
          createdAt: 'createdAt',
          updatedAt: 'updatedAt',
          number: 1,
          ingredients: ['2', '1', '2']
        },
        name: 'name'
      };
      const state = constructorSlice.reducer(
        {
          ...constructorInitialState,
          constructorItems: {
            bun: bun,
            ingredients: [ingredient]
          },
          orderRequest: true,
          isLoading: true
        },
        orderBurger.fulfilled(payload, '', [])
      );
      expect(state).toEqual({
        ...constructorInitialState,
        isLoading: false,
        orderRequest: false,
        orderModalData: payload.order,
        constructorItems: {
          bun: null,
          ingredients: []
        }
      });
    });

    test('Ошибка выполнения запроса', () => {
      const error = 'error';
      const state = constructorSlice.reducer(
        constructorInitialState,
        orderBurger.rejected(new Error(error), '', [])
      );
      expect(state).toEqual({
        ...constructorInitialState,
        isLoading: false,
        error: error
      });
    });
  });
});
