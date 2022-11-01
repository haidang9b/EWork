import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../common/apis/httpClient";
import { GET_USERS_URL } from "../common/apiUrl";
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
                if (action.payload.data) {
                    state.users = action.payload.data;
                }
                state.isLoading = false;
            });
    },
});

export const getUsers = createAsyncThunk("users/getUsers", async () => {
    const response = await httpClient.get(GET_USERS_URL);
    console.log("chay trong get users");
    return response.data;
});

export default usersSlice;
