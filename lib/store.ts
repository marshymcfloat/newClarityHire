import { configureStore } from "@reduxjs/toolkit";
import { launchCompanySlice } from "./redux slices/LaunchCompanySlice";

export const store = configureStore({
  reducer: {
    launchCompany: launchCompanySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
