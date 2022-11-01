import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../common/apis/httpClient";
import { LOGIN_GOOGLE_URL, LOGIN_URL } from "../common/apiUrl";
import TokenService from "../common/apis/token.service";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        refreshToken: null,
        isLoading: false,
    },
    reducers: {
        handleLogout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            TokenService.clearToken();
        },
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
                    TokenService.setAccessToken(action.payload.accessToken);
                    TokenService.setRefreshToken(action.payload?.refreshToken);
                    state.accessToken = action.payload?.accessToken;
                    state.refreshToken = action.payload?.refreshToken;
                }
                state.isLoading = false;
            })
            .addCase(handleLogin.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(handleRefreshToken.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(handleRefreshToken.fulfilled, (state, action) => {
                if (
                    action.payload?.accessToken &&
                    action.payload?.refreshToken
                ) {
                    TokenService.setAccessToken(action.payload.accessToken);
                    TokenService.setRefreshToken(action.payload?.refreshToken);
                    state.accessToken = action.payload?.accessToken;
                    state.refreshToken = action.payload?.refreshToken;
                }
                state.isLoading = false;
            })
            .addCase(handleRefreshToken.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(handleLoginGoogle.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(handleLoginGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
                if (
                    action.payload.data?.accessToken &&
                    action.payload.data?.refreshToken
                ) {
                    TokenService.setAccessToken(
                        action.payload.data.accessToken
                    );
                    TokenService.setRefreshToken(
                        action.payload.data.refreshToken
                    );
                    state.accessToken = action.payload.data.accessToken;
                    state.refreshToken = action.payload.data.refreshToken;
                }
            })
            .addCase(handleLoginGoogle.rejected, (state, action) => {
                state.isLoading = false;
            });
    },
});

export const handleLogin = createAsyncThunk("auth/login", async (user) => {
    const response = await httpClient.post(LOGIN_URL, user);
    return response.data.data;
});

export const handleRefreshToken = createAsyncThunk(
    "auth/refreshToken",
    (res) => {
        return res.data.data;
    }
);
export const handleLoginGoogle = createAsyncThunk(
    "auth/loginwithgoogle",
    async (profileObj) => {
        const response = await httpClient.post(LOGIN_GOOGLE_URL, {
            fullName: profileObj.name,
            googleId: profileObj.googleId,
            email: profileObj.email,
            imageUrl: profileObj.imageUrl,
        });
        return response.data;
    }
);
export default authSlice;
