import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_USERS_URL } from "../common/apiUrl";
import httpClient from "../common/apis/httpClient";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: null,
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                console.log(action.payload);
                if (action.payload.success) {
                    state.users = action.payload.users;
                }
                state.isLoading = false;
            });
    },
});

export const getUsers = createAsyncThunk("users/getUsers", async () => {
    const response = await httpClient.get(GET_USERS_URL);
    return response.data;
});

export default usersSlice;
