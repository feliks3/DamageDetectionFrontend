import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './features/dataSlice';

const store = configureStore({
  reducer: {
    data: dataSlice,
  },
});

export default store;
