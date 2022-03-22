import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showWinner: {
    show: false,
    status: "",
    title: "",
    message: "",
  },
  showDialog: false,
  isLoading: false,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    showDialog(state) {
      state.showDialog = !state.showDialog;
    },
    showWinner(state, action) {
      state.showWinner = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    clearState: () => initialState,
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
