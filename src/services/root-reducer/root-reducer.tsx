import { combineSlices } from '@reduxjs/toolkit';

import {
  constructorSlice,
  feedSlice,
  ingredientSlice,
  orderSlice,
  userSlice
} from '@slices';

const rootReducer = combineSlices(
  constructorSlice,
  feedSlice,
  ingredientSlice,
  orderSlice,
  userSlice
);

export default rootReducer;
