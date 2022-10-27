import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../common/apis/httpClient";
import { LOGIN_URL } from "../common/apiUrl";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        refreshToken: null,
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(handleLogin.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(handleLogin.fulfilled, (state, action) => {
                if (
                    action.payload?.accessToken &&
                    action.payload?.refreshToken
                ) {
                    state.accessToken = action.payload?.accessToken;
                    state.refreshToken = action.payload?.refreshToken;
                }
                state.isLoading = false;
            });
    },
});

export const handleLogin = createAsyncThunk("auth/login", async (user) => {
    const response = await httpClient.post(LOGIN_URL, user);
    return response.data.data;
});

export const handleLogOut = createAsyncThunk("auth/logout", () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
});
export default authSlice;
