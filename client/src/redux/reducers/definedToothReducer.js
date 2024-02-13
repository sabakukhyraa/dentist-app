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
      state.treatmentsBefore.filter(
        (treatment) => treatment != { ...action.payload }
      );
    },
  },
});

export const { setToothNumber, setDescription, addTreatment, removeTreatment } =
  definedToothSlice.actions;
