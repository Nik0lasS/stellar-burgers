import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export type TIngredientState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredient/getIngredients',
  getIngredientsApi
);

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  selectors: {
    getIngredientsS: (state) => state.ingredients,
    getIngridientsStateS: (state) => state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const { getIngredientsS, getIngridientsStateS } =
  ingredientSlice.selectors;

export default ingredientSlice;
