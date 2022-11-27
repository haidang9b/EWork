import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../common/apis/httpClient";
import {
    LOGIN_GOOGLE_URL,
    LOGIN_URL,
    RECRUITER_REGISTER_URL,
} from "../common/apiUrl";
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
            .addCase(handleLoginThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(handleLoginThunk.fulfilled, (state, action) => {
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
            .addCase(handleLoginThunk.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(handleRefreshTokenThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(handleRefreshTokenThunk.fulfilled, (state, action) => {
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
            .addCase(handleRefreshTokenThunk.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(handleLoginGoogleThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(handleLoginGoogleThunk.fulfilled, (state, action) => {
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
            .addCase(handleLoginGoogleThunk.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(recruiterRegisterThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(recruiterRegisterThunk.fulfilled, (state, action) => {
                if (action.payload.isSuccess) {
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(recruiterRegisterThunk.rejected, (state, action) => {
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

export const handleLoginThunk = createAsyncThunk("auth/login", async (user) => {
    const response = await httpClient.post(LOGIN_URL, user);
    return response.data;
});
export const handleLogout = createAsyncThunk("auth/logout", () => {
    TokenService.clearToken();
    return null;
});
export const handleRefreshTokenThunk = createAsyncThunk(
    "auth/refreshToken",
    (res) => {
        return res.data;
    }
);
export const handleLoginGoogleThunk = createAsyncThunk(
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

export const recruiterRegisterThunk = createAsyncThunk(
    "recruiter",
    async (obj) => {
        const response = await httpClient.post(RECRUITER_REGISTER_URL, obj);
        return response.data;
    }
);

export default authSlice;
export const authSelector = (state) => state.auth;
