import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  birthDate: "",
  isAdult: true,
  hasWisdomTeeth: true,
  definedTeeth: [],
  updatedAt: null,
  createdAt: null,
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setState: (state, action) => {
      return action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
    toggleIsAdult: (state) => {
      state.isAdult = !state.isAdult;
    },
    toggleHasWisdomTeeth: (state) => {
      state.hasWisdomTeeth = !state.hasWisdomTeeth;
    },
    addDefinedTeeth: (state, action) => {
      let isDefined = state.definedTeeth.find(
        (obj) => obj.toothNumber === action.payload.toothNumber
      );
      if (isDefined) {
        let index = state.definedTeeth.indexOf(isDefined);
        state.definedTeeth[index] = action.payload;
      } else {
        state.definedTeeth = [...state.definedTeeth, action.payload];
      }
    },
    removeDefinedTeeth: (state, action) => {
      let toRemove = action.payload;
      state.definedTeeth = state.definedTeeth.filter((x) => x.toothNumber !== toRemove.toothNumber);
    },
    resetPatientState: (state) => {
      Object.keys(state).forEach((key) => delete state[key]);
      Object.assign(state, initialState);
    },
  },
});

export const {
  setState,
  setName,
  setBirthDate,
  toggleIsAdult,
  toggleHasWisdomTeeth,
  addDefinedTeeth,
  removeDefinedTeeth,
  resetPatientState,
} = patientSlice.actions;

export default patientSlice.reducer;
