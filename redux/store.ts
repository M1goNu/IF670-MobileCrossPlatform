import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// configureStore is a function from Redux Toolkit that simplifies the process of
// creating a Redux store.
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;