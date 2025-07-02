import { configureStore } from '@reduxjs/toolkit';
import stepperReducer from './stepperSlice';

export const store = configureStore({
  reducer: {
    stepper: stepperReducer,
  },
}); 