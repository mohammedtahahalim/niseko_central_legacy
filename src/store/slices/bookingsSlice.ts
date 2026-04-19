import {
  createSlice,
  createAsyncThunk,
  createSelector,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { z } from "zod";
import type { RootState } from "../store";

const bookingSchema = z.object({
  results: z.array(
    z.object({
      id: z.number().nonnegative(),
      en_title: z.string().nonempty(),
      jp_title: z.string().nonempty(),
      en_category: z.string().nonempty(),
      jp_category: z.string().nonempty(),
      en_type_one: z.string(),
      jp_type_one: z.string(),
      en_type_two: z.string(),
      jp_type_two: z.string(),
      floor_size: z.number().nonnegative(),
      lifts: z.number().nonnegative(),
      village_distance: z.number().nonnegative(),
      view: z.string(),
      images: z.array(
        z.object({
          url: z.string().nonempty(),
          blur: z.string().nonempty(),
        }),
      ),
      max_pax: z.number().nonnegative(),
      amenities: z.array(z.string().nonempty()),
      short_desc: z.string().nonempty(),
      rating: z.number().nonnegative(),
      price_per_night: z.number().nonnegative(),
      available: z.boolean(),
      jp_view: z.string(),
      jp_short_desc: z.string().nonempty(),
      jp_amenities: z.array(z.string().nonempty()),
    }),
  ),
});

export type BookingReturn = z.infer<typeof bookingSchema>;

export type Booking = BookingReturn["results"][number];

export type Reject = "DOWN" | "SYSTEM" | "ABORT" | "MISMATCH";

export type Status = "idle" | "loading" | "failure" | "success";

export type ActiveSort = "price" | "name" | "size" | "bed";

export const fetchBookings = createAsyncThunk<
  Booking[],
  void,
  { rejectValue: Reject }
>("fetch/bookings", async (_args, { signal, rejectWithValue }) => {
  try {
    const base = import.meta.env.VITE_API_URL;
    const fullURL: URL = new URL("/api/getBookings", base);
    const fullOptions: RequestInit = {
      method: "GET",
      credentials: "include",
      signal,
    };
    const response = await fetch(fullURL, fullOptions);
    if (!response.ok) {
      if (response.status >= 500) return rejectWithValue("DOWN");
      return rejectWithValue("SYSTEM");
    }
    const data = await response.json();
    const parsed = bookingSchema.safeParse(data);
    if (!parsed.success) return rejectWithValue("MISMATCH");
    return parsed.data.results;
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      return rejectWithValue("ABORT");
    }
    return rejectWithValue("SYSTEM");
  }
});

interface InitialStateShape {
  data: Booking[];
  status: Status;
  error: Reject | null;
  activeSort: ActiveSort | null;
  sortDir: "desc" | "asc";
}

const initialState: InitialStateShape = {
  data: [],
  status: "idle",
  error: null,
  activeSort: null,
  sortDir: "desc",
};

export const selectStatus = (state: RootState) => state.bookings.status;

const selectData = (state: RootState) => state.bookings.data;

const selectActiveSort = (state: RootState) => state.bookings.activeSort;

const selectSortDir = (state: RootState) => state.bookings.sortDir;

export const selectDisplayData = createSelector(
  [selectData, selectActiveSort, selectSortDir],
  (data, activeSort, sortDir) => {
    if (!data) return [];
    const temp = [...data];
    switch (activeSort) {
      case "bed":
        temp.sort((a, b) =>
          sortDir === "desc" ? a.max_pax - b.max_pax : b.max_pax - a.max_pax,
        );
        break;
      case "name":
        temp.sort((a, b) =>
          sortDir === "desc"
            ? a.en_title.localeCompare(b.en_title)
            : b.en_title.localeCompare(a.en_title),
        );
        break;
      case "price":
        temp.sort((a, b) =>
          sortDir === "desc"
            ? a.price_per_night - b.price_per_night
            : b.price_per_night - a.price_per_night,
        );
        break;
      case "size":
        temp.sort((a, b) =>
          sortDir === "desc"
            ? a.floor_size - b.floor_size
            : b.floor_size - a.floor_size,
        );
        break;
    }
    return temp;
  },
);

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    changeSort: (
      state,
      action: PayloadAction<{ sortBy: ActiveSort; sortDir: string | null }>,
    ) => {
      const { sortBy, sortDir } = action.payload;
      state.activeSort = sortBy;
      state.sortDir = sortDir === "desc" ? "asc" : "desc";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBookings.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(
      fetchBookings.rejected,
      (state, action: PayloadAction<Reject | undefined>) => {
        state.status = "failure";
        state.error = action.payload ?? "SYSTEM";
      },
    );
    builder.addCase(
      fetchBookings.fulfilled,
      (state, action: PayloadAction<Booking[]>) => {
        state.status = "success";
        state.data = action.payload;
      },
    );
  },
});

export default bookingsSlice.reducer;
export const { changeSort } = bookingsSlice.actions;
