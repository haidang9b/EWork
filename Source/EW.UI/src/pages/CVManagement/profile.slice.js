import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { GET_PROFILE_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";

const initialState = {
    cvs: [],
    coverLetter: "",
    experiences: [],
    status: Status.idle,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getProfile.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.status = Status.succeeded;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.status = Status.failed;
            }),
});

export const getProfile = createAsyncThunk("profile/getProfile", async () => {
    const response = await httpClient.get(GET_PROFILE_URL);
    console.log(response);
    return response.data;
});

export const profileSelector = (state) => state.profile;
export default profileSlice;
