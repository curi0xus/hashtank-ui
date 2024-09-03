import { configureStore } from '@reduxjs/toolkit';
import auctionReducer from '@/redux/slices/auctionSlice';

export const store = configureStore({
  reducer: {
    auction: auctionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
