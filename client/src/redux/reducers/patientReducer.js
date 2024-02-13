import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  birthDate: "",
  isAdult: true,
  hasWisdomTeeth: true,
  definedTeeth: [],
}

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
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
      state.hasWisdomTeeth = !state.hasWisdomTeeth
    },
    addDefinedTeeth: (state, action) => {
      state.definedTeeth = [...state.definedTeeth, action.payload];
    },
  }
})