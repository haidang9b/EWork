import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { GET_ROLES_URL, GET_USERS_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";
const initialState = {
    users: [],
    roles: [],
    status: Status.idle,
};
const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUsersThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(getUsersThunk.fulfilled, (state, action) => {
                if (action.payload.data) {
                    state.users = action.payload.data;
                }
                state.status = Status.succeeded;
            })
            .addCase(getUsersThunk.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(getRolesThunk.fulfilled, (state, action) => {
                if (action.payload?.data) {
                    state.roles = action.payload?.data;
                } else {
                    state.roles = [];
                }
            })
            .addCase(getRolesThunk.rejected, (state, action) => {
                state.roles = [];
            });
    },
});

export const getUsersThunk = createAsyncThunk("users/getUsers", async () => {
    const response = await httpClient.get(GET_USERS_URL);
    return response.data;
});

export const getRolesThunk = createAsyncThunk("users/getRoles", async () => {
    const response = await httpClient.get(GET_ROLES_URL);
    return response.data;
});

export default usersSlice;
export const usersSelector = (state) => state.users;
