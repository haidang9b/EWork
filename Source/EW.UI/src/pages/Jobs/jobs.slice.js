import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { GET_JOBS_SHORT_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";
import { failureReducer, loadingReducer } from "../../common/utils";

const initialState = {
    posts: [],
    status: Status.idle,
};

const jobsSlice = createSlice({
    name: "jobs",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getJobsThunk.pending, loadingReducer)
            .addCase(getJobsThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.posts = [...action.payload.data];
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getJobsThunk.rejected, failureReducer),
});

export const getJobsThunk = createAsyncThunk("jobs/getJobs", async () => {
    const response = await httpClient.get(GET_JOBS_SHORT_URL);
    return response.data;
});

export const jobsSelector = (state) => state.jobs;

export default jobsSlice;
