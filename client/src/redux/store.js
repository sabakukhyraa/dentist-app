import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./reducers/patientReducer.js";
import definedToothReducer from "./reducers/definedToothReducer.js";
import authReducer from "./reducers/authReducer.js";

export const store = configureStore({
  reducer: {
    patient: patientReducer,
    definedTooth: definedToothReducer,
    auth: authReducer,
  },
});
