import {
  createSlice,
  PayloadAction,
  nanoid,
  createAsyncThunk
} from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder
} from '../../../utils/types';
import { orderBurgerApi } from '../../../utils/burger-api';

export type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  'constructor/sendOrderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    constructorS: (state) => state
  },
  reducers: {
    addIngredients: {
      reducer: (
        state,
        action: PayloadAction<TConstructorIngredient & { id: string }>
      ) => {
        if (action.payload.type !== 'bun') {
          state.constructorItems.ingredients.push(action.payload);
        } else {
          state.constructorItems.bun = action.payload;
        }
      },
      prepare: (ingredient: TIngredient) => {
        const index = nanoid();
        return { payload: { ...ingredient, id: index } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    clearConstructor: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalDataNull: (state) => {
      state.orderModalData = null;
    },
    handleMoveUpFunc: (state, action) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload - 1]
      ] = [
        state.constructorItems.ingredients[action.payload - 1],
        state.constructorItems.ingredients[action.payload]
      ];
    },
    handleMoveDownFunc: (state, action) => {
      [
        state.constructorItems.ingredients[action.payload],
        state.constructorItems.ingredients[action.payload + 1]
      ] = [
        state.constructorItems.ingredients[action.payload + 1],
        state.constructorItems.ingredients[action.payload]
      ];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const {
  addIngredients,
  removeIngredient,
  clearConstructor,
  setOrderRequest,
  setOrderModalDataNull,
  handleMoveUpFunc,
  handleMoveDownFunc
} = constructorSlice.actions;

export const { constructorS } = constructorSlice.selectors;

export const constructorInitialState = initialState;

export default constructorSlice;
