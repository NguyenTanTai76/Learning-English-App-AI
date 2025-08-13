import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        state.user = JSON.parse(userStr);
      }
    },
  },
});

export const { login, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
