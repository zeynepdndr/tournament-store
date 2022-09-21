import { useDispatch } from 'react-redux';
import { tournamentsSlice } from './tournamentsSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: tournamentsSlice.reducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();

export default store;
