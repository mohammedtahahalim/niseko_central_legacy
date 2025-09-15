import { configureStore } from "@reduxjs/toolkit";
import bookingsSlice from "./slices/bookingsSlice";

export const NisekoStore = configureStore({
  reducer: {
    bookings: bookingsSlice,
  },
});

export type AppDisptach = typeof NisekoStore.dispatch;
