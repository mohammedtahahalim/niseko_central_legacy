import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { ZodType } from "zod";
import { serverErrors } from "../../utils/constants";

interface FetchBookingsArgs {
  baseURL?: string;
  endpoint?: string;
  param?: string | number;
  query?: Record<string, string | number>;
  currentLanguage?: "en" | "jp";
  isSensitive?: boolean;
  options?: RequestInit;
  validationSchema?: ZodType;
}

export const fetchBookings = createAsyncThunk(
  "fetch/bookings",
  async (args: FetchBookingsArgs, { signal, rejectWithValue }) => {
    const {
      baseURL = import.meta.env.VITE_API_URL,
      endpoint,
      param,
      query = {},
      currentLanguage = "en",
      isSensitive = true,
      options,
      validationSchema,
    } = args;
    const fullQueries: string = new URLSearchParams(
      Object.entries(query)
        .filter(([_, v]) => v !== undefined && v !== null)
        .map(([key, value]) => [key, String(value)])
    ).toString();
    const fullOptions: RequestInit = {
      credentials: isSensitive ? "include" : "omit",
      signal,
      ...options,
    };
    const fullURL: string = `${baseURL}/api${endpoint ? "/" + endpoint : ""}${
      param ? "/" + param : ""
    }${fullQueries ? "?" + fullQueries : ""}`;
    try {
      console.log(fullURL);
      const response = await fetch(fullURL, fullOptions);
      if (!response.ok) {
        const errorStatus = response.status.toString();
        const errorMessage: string =
          serverErrors[currentLanguage][errorStatus] ?? "Unknown Error";
        throw new Error(errorMessage);
      }
      const data = await response.json();
      if (validationSchema) {
        const conformToSchema = validationSchema.safeParse(data);
        if (!conformToSchema.success) {
          const schemaErrorMessage: string = conformToSchema.error.issues
            .map((issue) => issue.message)
            .join("\n");
          throw new Error(schemaErrorMessage);
        }
      }
      return data;
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return rejectWithValue("Network Request Aborted");
      }
      if (err instanceof Error) {
        return rejectWithValue(err);
      }
      return rejectWithValue("Unknown Error");
    }
  }
);

interface InitialStateShape {
  data: any | null;
  displayData: any | null;
  loading: boolean;
  error: string;
}

const initialState: InitialStateShape = {
  data: null,
  displayData: null,
  loading: false,
  error: "",
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookings.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchBookings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.bookings.map((element: any) => {
        return {
          ...element,
          images: JSON.parse(element.images),
          amenities: JSON.parse(element.amenities),
          jp_amenities: JSON.parse(element.jp_amenities),
        };
      });
      state.displayData = action.payload.bookings.map((element: any) => {
        return {
          ...element,
          images: JSON.parse(element.images),
          amenities: JSON.parse(element.amenities),
          jp_amenities: JSON.parse(element.jp_amenities),
        };
      });
    });
  },
});

export default bookingsSlice.reducer;
