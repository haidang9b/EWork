import { createSelector } from "@reduxjs/toolkit";
import { Status } from "../common/constants";
export const statusAuthCurrentSelector = (state) => state.auth.status;
export const statusUsersCurrentSelector = (state) => state.users.status;

export const isLoadingSelector = createSelector(
    statusAuthCurrentSelector,
    statusUsersCurrentSelector,
    (statusAuth, statusUsers) => {
        return statusAuth === Status.loading || statusUsers === Status.loading;
    }
);
