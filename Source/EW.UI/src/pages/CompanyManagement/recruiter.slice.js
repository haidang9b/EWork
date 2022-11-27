import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { GET_COMPANIES_URL, GET_RECRUITERS_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";

const initialState = {
    companies: [],
    recruiters: [],
    status: Status.idle,
};

const recruiterSlice = createSlice({
    name: "recruiter",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getCompaniesThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(getCompaniesThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess) {
                    state.status = Status.succeeded;
                    state.companies = action.payload?.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getCompaniesThunk.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(getRecruitersThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(getRecruitersThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess) {
                    state.status = Status.succeeded;
                    state.recruiters = action.payload?.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getRecruitersThunk.rejected, (state, action) => {
                state.status = Status.failed;
            }),
});

export const getCompaniesThunk = createAsyncThunk(
    "recruiter/getCompanies",
    async () => {
        const response = await httpClient.get(GET_COMPANIES_URL);
        return response.data;
    }
);

export const getRecruitersThunk = createAsyncThunk(
    "recruiter/getRecruiters",
    async () => {
        const response = await httpClient.get(GET_RECRUITERS_URL);
        return response.data;
    }
);
export const recruiterSelector = (state) => state.recruiter;
export default recruiterSlice;
