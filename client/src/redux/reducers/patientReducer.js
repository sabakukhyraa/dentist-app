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
      return action.payload
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
      state.definedTeeth = [...state.definedTeeth, action.payload];
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
} = patientSlice.actions;

export default patientSlice.reducer;