import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { GET_JOB_DETAIL_ID_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";
import { failureReducer, loadingReducer } from "../../common/utils";

const initialState = {
    job: null,
    status: Status.idle,
};

const jobDetailSlice = createSlice({
    name: "jobDetail",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getJobDetailThunk.pending, loadingReducer)
            .addCase(getJobDetailThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                    state.job = action.payload.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getJobDetailThunk.rejected, failureReducer),
});

export const getJobDetailThunk = createAsyncThunk(
    "jobDetail/getJobDetail",
    async (id) => {
        const response = await httpClient.get(`${GET_JOB_DETAIL_ID_URL}/${id}`);
        return response.data;
    }
);

export const jobDetailSelector = (state) => state.jobDetail;

export default jobDetailSlice;
