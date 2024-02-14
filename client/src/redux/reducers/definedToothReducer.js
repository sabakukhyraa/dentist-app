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
    addTreatment: (state) => {
      state.treatmentsBefore.push("");
    },
    updateTreatment: (state, action) => {
      const { index, value } = action.payload;
      state.treatmentsBefore[index] = value;
    },
    removeTreatment: (state, action) => {
      state.treatmentsBefore = state.treatmentsBefore.filter(
        (treatment) => treatment !== action.payload
      );
    },
    resetToothState: (state) => {
      Object.keys(state).forEach((key) => delete state[key]);
      Object.assign(state, initialState);
    },
  },
});

export const {
  setDefinedTooth,
  setToothNumber,
  setDescription,
  addTreatment,
  updateTreatment,
  removeTreatment,
  resetToothState,
} = definedToothSlice.actions;

export default definedToothSlice.reducer;
