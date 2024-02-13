import { configureStore } from '@reduxjs/toolkit';
import patientReducer from "./reducers/patientReducer.js"
import definedToothReducer from './reducers/definedToothReducer.js';

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    definedTooth: definedToothReducer,
  },
});