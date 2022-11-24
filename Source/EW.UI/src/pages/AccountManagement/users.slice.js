import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import {
    ADD_ACCOUNT_FACULTY_URL,
    EDIT_ACTIVE_URL,
    GET_ROLES_URL,
    GET_USERS_URL,
} from "../../common/apiUrl";
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
            })
            .addCase(setActiveThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(setActiveThunk.fulfilled, (state, action) => {
                state.status = Status.succeeded;
                if (action.payload?.isSuccess && action.payload?.data) {
                    let currentUser = state.users.find(
                        (item) => item.id === action.payload?.data?.id
                    );
                    currentUser.isActive = action.payload?.data?.isActive;
                }
            })
            .addCase(setActiveThunk.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(addNewAccountAdminThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(addNewAccountAdminThunk.fulfilled, (state, action) => {
                state.status = Status.succeeded;
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.users.push(action.payload?.data);
                }
            })
            .addCase(addNewAccountAdminThunk.rejected, (state, action) => {
                state.status = Status.failed;
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

export const setActiveThunk = createAsyncThunk(
    "users/setActive",
    async (obj) => {
        const response = await httpClient.put(EDIT_ACTIVE_URL, obj);
        return response.data;
    }
);

export const addNewAccountAdminThunk = createAsyncThunk(
    "users/addNewAccountAdmin",
    async (obj) => {
        const response = await httpClient.post(ADD_ACCOUNT_FACULTY_URL, obj);
        return response.data;
    }
);

export default usersSlice;
export const usersSelector = (state) => state.users;
