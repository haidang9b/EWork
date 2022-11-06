import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../common/apis/httpClient";
import { LOGIN_GOOGLE_URL, LOGIN_URL } from "../common/apiUrl";
import TokenService from "../common/apis/token.service";
import { Status } from "../common/constants";

const initialState = {
    user: TokenService.getUserFromToken(TokenService.getAccessToken()) | null,
    status: Status.idle,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(handleLogin.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(handleLogin.fulfilled, (state, action) => {
                if (action.payload.isSuccess) {
                    TokenService.setAccessToken(
                        action.payload.data.accessToken
                    );
                    TokenService.setRefreshToken(
                        action.payload.data.refreshToken
                    );
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(handleLogin.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(handleRefreshToken.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(handleRefreshToken.fulfilled, (state, action) => {
                if (action.payload.isSuccess) {
                    TokenService.setAccessToken(
                        action.payload.data.accessToken
                    );
                    TokenService.setRefreshToken(
                        action.payload.data.refreshToken
                    );
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(handleRefreshToken.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(handleLoginGoogle.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(handleLoginGoogle.fulfilled, (state, action) => {
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
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(handleLoginGoogle.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(handleLogout.pending, logoutAccount)
            .addCase(handleLogout.fulfilled, logoutAccount)
            .addCase(handleLogout.rejected, logoutAccount);
    },
});

const logoutAccount = (state, action) => {
    state.accessToken = null;
    state.refreshToken = null;
    state.status = Status.idle;
};

export const handleLogin = createAsyncThunk("auth/login", async (user) => {
    const response = await httpClient.post(LOGIN_URL, user);
    return response.data;
});
export const handleLogout = createAsyncThunk("auth/logout", () => {
    TokenService.clearToken();
    return null;
});
export const handleRefreshToken = createAsyncThunk(
    "auth/refreshToken",
    (res) => {
        return res.data;
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
export const authSelector = (state) => state.auth;
