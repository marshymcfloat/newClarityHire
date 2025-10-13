import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StepOnePayload {
  fullname: string;
  workEmail: string;
  password: string;
  confirmPassword: string;
}

const initialState = {
  fullname: "",
  workEmail: "",
  password: "",
  confirmPassword: "",
};

export const launchCompanySlice = createSlice({
  name: "launchCompany",
  initialState,
  reducers: {
    setStepOneForm(state, action: PayloadAction<StepOnePayload>) {
      state.fullname = action.payload.fullname;
      state.workEmail = action.payload.workEmail;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
    },

    resetForm(state) {
      state.fullname = "";
      state.workEmail = "";
      state.password = "";
      state.confirmPassword = "";
    },
  },
});

export const launghCompanySliceActions = launchCompanySlice.actions;
