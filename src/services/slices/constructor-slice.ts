import {
  createSlice,
  PayloadAction,
  nanoid,
  createActionCreatorInvariantMiddleware,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '../../utils/types';
import { orderBurgerApi } from '../../utils/burger-api';

export type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  error: string | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  isLoading: false,
  error: null
};

const orderBurger = createAsyncThunk(
  'constructor/sendOrderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  selectors: {
    setConstructorItems: (state) => state.constructorItems
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
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const { addIngredients, removeIngredient, clearConstructor } =
  constructorSlice.actions;
export const { setConstructorItems } = constructorSlice.selectors;

export default constructorSlice;
