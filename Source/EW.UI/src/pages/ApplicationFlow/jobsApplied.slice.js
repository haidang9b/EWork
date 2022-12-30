import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { GET_JOBS_APPLIED_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";
import { failureReducer, loadingReducer } from "../../common/utils";

const initialState = {
    applications: [],
    status: Status.idle,
};

const jobsAppliedSlice = createSlice({
    name: "jobsApplied",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getJobsAppliedThunk.pending, loadingReducer)
            .addCase(getJobsAppliedThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.applications = action.payload?.data;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getJobsAppliedThunk.rejected, failureReducer),
});

export const getJobsAppliedThunk = createAsyncThunk(
    "jobsApplied/getJobsApplied",
    async () => {
        const response = await httpClient.get(GET_JOBS_APPLIED_URL);
        return response.data;
    }
);
export const jobsAppliedSelector = (state) => state.jobsApplied;
export default jobsAppliedSlice;
