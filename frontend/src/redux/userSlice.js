import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "user",
  initialState: {
    name: "",
    id: "",
    isLogged: false,
  },
  reducers: {
    changeUser(state, { payload }) {
      return { ...state, isLogged: true, name: payload.name, id: payload.id };
    },
    logout(state) {
      return { ...state, isLogged: false, name: "", id: "" };
    },
  },
});

export const { changeUser, logout } = slice.actions;

export const selectUser = (state) => state.user;

export default slice.reducer;
