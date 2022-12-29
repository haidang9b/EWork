import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../../common/apis/httpClient";
import { APPLICATION_CONTROLLER_URL } from "../../../common/apiUrl";
import { Status } from "../../../common/constants";
import { failureReducer, loadingReducer } from "../../../common/utils";

const initialState = {
    applications: [],
    status: Status.idle,
};

const applicationSlice = createSlice({
    name: "application",
    initialState: initialState,
    extraReducers: (buider) =>
        buider
            .addCase(getApplicationOfUserThunk.pending, loadingReducer)
            .addCase(getApplicationOfUserThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.applications = action.payload.data;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getApplicationOfUserThunk.rejected, failureReducer)
            .addCase(addApplicationThunk.pending, loadingReducer)
            .addCase(addApplicationThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.applications.push(action.payload.data);
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(addApplicationThunk.rejected, failureReducer),
});

export const getApplicationOfUserThunk = createAsyncThunk(
    "application/getApplicationOfUser",
    async () => {
        const response = await httpClient.get(APPLICATION_CONTROLLER_URL);
        return response.data;
    }
);

export const addApplicationThunk = createAsyncThunk(
    "application/addApplication",
    async (obj) => {
        const response = await httpClient.post(APPLICATION_CONTROLLER_URL, obj);
        return response.data;
    }
);

export default applicationSlice;
export const applicationSelector = (state) => state.application;
