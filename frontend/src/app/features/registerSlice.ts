import { axiosInstance } from "@/config/fetchApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { AxiosError } from "axios";

interface IForm {
  email: string;
  username: string;
  password: string;
}

interface IInit {
  isLoading: boolean;
  data: null | IForm;
  error: null | unknown;
}

const initialState: IInit = {
  isLoading: false,
  data: null,
  error: null,
};

export const userRegister = createAsyncThunk<IForm, IForm>("register/userRegister", async (user, thunkApi) => {
  try {
    const { data } = await axiosInstance.post(`/auth/local/register`, user);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ error: { message: string } }>;
    return thunkApi.rejectWithValue(error.response?.data.error.message || "register failed");
  }
});

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.payload;
      });
  },
});

export default registerSlice.reducer;
export const selectRegister = (state: RootState) => state.register;
