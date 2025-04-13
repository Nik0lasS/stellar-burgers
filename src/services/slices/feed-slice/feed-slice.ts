import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, getFeedsApi } from '../../../utils/burger-api';
import { TOrder } from '../../../utils/types';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const getOrders = createAsyncThunk('feed/getOrders', getOrdersApi);
export const getFeeds = createAsyncThunk('feed/getFeeds', getFeedsApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    getOrdersS: (state) => state.orders,
    getFeedsS: (state) => state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const { getOrdersS, getFeedsS } = feedSlice.selectors;

export const feedInitialState = initialState;

export default feedSlice;
