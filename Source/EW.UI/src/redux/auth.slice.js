import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../common/apis/httpClient";
import {
    LOGIN_GOOGLE_URL,
    LOGIN_URL,
    RECOVER_ACCOUNT_URL,
    RESET_PASSWORD_URL,
    UPDATE_PASSWORD_URL,
    VALIDATE_CODE_RECOVER_URL,
} from "../common/apiUrl";
import TokenService from "../common/apis/token.service";
import { Status } from "../common/constants";
import { failureReducer, loadingReducer } from "../common/utils";

const initialState = {
    user: TokenService.getUserFromToken(TokenService.getAccessToken()) | null,
    status: Status.idle,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(handleLoginThunk.pending, loadingReducer)
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
            .addCase(handleLoginThunk.rejected, failureReducer)
            .addCase(handleRefreshTokenThunk.pending, loadingReducer)
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
            .addCase(handleRefreshTokenThunk.rejected, failureReducer)
            .addCase(handleLoginGoogleThunk.pending, loadingReducer)
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
            .addCase(handleLoginGoogleThunk.rejected, failureReducer)
            .addCase(handleRecoverAccountThunk.pending, loadingReducer)
            .addCase(handleRecoverAccountThunk.fulfilled, (state, action) => {
                state.status = Status.succeeded;
            })
            .addCase(handleRecoverAccountThunk.rejected, failureReducer)
            .addCase(handleValidateCodeRecoverThunk.pending, loadingReducer)
            .addCase(
                handleValidateCodeRecoverThunk.fulfilled,
                (state, action) => {
                    state.status = Status.succeeded;
                }
            )
            .addCase(handleValidateCodeRecoverThunk.rejected, failureReducer)
            .addCase(handleResetPasswordThunk.pending, loadingReducer)
            .addCase(handleResetPasswordThunk.fulfilled, (state, action) => {
                state.status = Status.succeeded;
            })
            .addCase(handleResetPasswordThunk.rejected, failureReducer)
            .addCase(updatePasswordThunk.pending, loadingReducer)
            .addCase(updatePasswordThunk.fulfilled, (state, action) => {
                state.status = Status.succeeded;
            })
            .addCase(updatePasswordThunk.rejected, failureReducer)
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

export const handleRecoverAccountThunk = createAsyncThunk(
    "auth/recoverAccount",
    async (obj) => {
        const response = await httpClient.post(RECOVER_ACCOUNT_URL, obj);
        return response.data;
    }
);

export const handleValidateCodeRecoverThunk = createAsyncThunk(
    "auth/validateCodeRecover",
    async (obj) => {
        const response = await httpClient.post(VALIDATE_CODE_RECOVER_URL, obj);
        return response.data;
    }
);

export const handleResetPasswordThunk = createAsyncThunk(
    "auth/resetPassword",
    async (obj) => {
        const response = await httpClient.post(RESET_PASSWORD_URL, obj);
        return response.data;
    }
);

export const updatePasswordThunk = createAsyncThunk(
    "auth/updatePassword",
    async (obj) => {
        const response = await httpClient.post(UPDATE_PASSWORD_URL, obj);
        return response.data;
    }
);
export default authSlice;
export const authSelector = (state) => state.auth;
