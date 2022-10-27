import { createSelector } from "@reduxjs/toolkit";

export const userCurrentSelector = (state) => state.auth.user;
export const accessTokenCurrentSelector = (state) => state.auth.accessToken;
export const refreshTokenCurrentSelector = (state) => state.auth.refreshToken;

export const isLoadingAuthCurrentSelector = (state) => state.auth.isLoading;
export const isLoadingSelector = createSelector(
    isLoadingAuthCurrentSelector,
    (loadingAuth) => {
        return loadingAuth;
    }
);
