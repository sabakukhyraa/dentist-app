import { configureStore } from '@reduxjs/toolkit';
import patientReducer from "./reducers/patientReducer.js"

export const store = configureStore({
  reducer: {
    patient: patientReducer,
  }
});