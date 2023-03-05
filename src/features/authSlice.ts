import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../utils/firebase.init";

type User = {
  name?: string | null;
  email: string | null;
  photoUrl?: string | null;
};

// Define a type for the slice state
interface AuthState {
  user: User;
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: {
    name: "",
    email: "",
    photoUrl: "",
  },
  isLoading: true,
  isError: false,
  error: "",
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const { user } = res;
      return {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
    },
    setUserLoading: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    resetError: (state) => {
      state.isError = false;
      state.error = "";
    },
    logOut: (state) => {
      state.user = {
        name: "",
        email: "",
        photoUrl: "",
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { setUser, setUserLoading, resetError, logOut } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
