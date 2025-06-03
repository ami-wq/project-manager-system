import { configureStore } from '@reduxjs/toolkit';
import taskModalReducer from './taskModalSlice';

export const store = configureStore({
  reducer: {
    taskModal: taskModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
