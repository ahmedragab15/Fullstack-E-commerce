import { axiosInstance } from "@/config/fetchApi";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { AxiosError } from "axios";
import CookieService from "@/services/CookieService";

interface IForm {
  identifier: string;
  password: string;
}

interface IUserResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

interface IInit {
  isLoading: boolean;
  data: null | IUserResponse;
  error: null | unknown;
}

const initialState: IInit = {
  isLoading: false,
  data: null,
  error: null,
};

export const userLogin = createAsyncThunk<IUserResponse, IForm>("login/userLogin", async (user, thunkApi) => {
  try {
    const { data } = await axiosInstance.post(`/auth/local`, user);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: { message: string } }>;
    return thunkApi.rejectWithValue(error.response?.data.error.message || "Login failed");
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action: PayloadAction<IUserResponse>) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
        const date = new Date();
        const IN_DAYS = 3
        const EXPIRED_AT = 1000 * 60 * 60 * 24 * IN_DAYS;
        date.setTime(date.getTime() + EXPIRED_AT);
        CookieService.set("jwt", action.payload.jwt, {
          path: "/",
          expires: new Date(date),
        });
        CookieService.set("username", action.payload.user.username, {
          path: "/",
          expires: new Date(date),
        });
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
export const selectLogin = (state: RootState) => state.login;
