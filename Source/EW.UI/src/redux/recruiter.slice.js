import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../common/apis/httpClient";
import { ASSIGN_RECRUITER_URL, GET_RECRUITERS_URL } from "../common/apiUrl";

import { Status } from "../common/constants";
import { failureReducer, loadingReducer } from "../common/utils";

const initialState = {
    recruiters: [],
    status: Status.idle,
};

const recruiterSlice = createSlice({
    name: "recruiter",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getRecruitersThunk.pending, loadingReducer)
            .addCase(getRecruitersThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess) {
                    state.status = Status.succeeded;
                    state.recruiters = action.payload?.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getRecruitersThunk.rejected, failureReducer)

            .addCase(assignRecruiterThunk.pending, loadingReducer)
            .addCase(assignRecruiterThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.recruiters.push(action.payload?.data);
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(assignRecruiterThunk.rejected, failureReducer),
});

export const getRecruitersThunk = createAsyncThunk(
    "recruiter/getRecruiters",
    async () => {
        const response = await httpClient.get(GET_RECRUITERS_URL);
        return response.data;
    }
);

export const assignRecruiterThunk = createAsyncThunk(
    "recruiter/assignRecruiter",
    async (obj) => {
        const response = await httpClient.post(ASSIGN_RECRUITER_URL, obj);
        return response.data;
    }
);

export const recruiterSelector = (state) => state.recruiter;
export default recruiterSlice;
