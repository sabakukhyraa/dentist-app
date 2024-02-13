import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toothNumber: 0,
  description: "",
  treatmentsBefore: [],
};

export const definedToothSlice = createSlice({
  name: "definedTooth",
  initialState,
  reducers: {
    setDefinedTooth: (state, action) => {
      return action.payload;
    },
    setToothNumber: (state, action) => {
      state.toothNumber = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    addTreatment: (state, action) => {
      state.treatmentsBefore.push(action.payload);
    },
    removeTreatment: (state, action) => {
      state.treatmentsBefore = state.treatmentsBefore.filter(
        (treatment) => treatment !== action.payload
      );
    },
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setDefinedTooth,
  setToothNumber,
  setDescription,
  addTreatment,
  removeTreatment,
  resetState,
} = definedToothSlice.actions;

export default definedToothSlice.reducer;
