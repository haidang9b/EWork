import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import {
    ADD_COMPANY_URL,
    ASSIGN_RECRUITER_URL,
    EDIT_COMPANY_INFORMATION_URL,
    GET_COMPANIES_URL,
    GET_RECRUITERS_URL,
} from "../../common/apiUrl";
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
            })
            .addCase(editCompanyInformationThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(editCompanyInformationThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                    let currentCompany = state.companies.find(
                        (item) => item.id === action.payload?.data?.id
                    );
                    currentCompany.status = action.payload?.data?.status;
                    currentCompany.companyName =
                        action.payload?.data?.companyName;
                    currentCompany.address = action.payload?.data?.address;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(editCompanyInformationThunk.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(addCompanyThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(addCompanyThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.companies.push(action.payload?.data);
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(addCompanyThunk.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(assignRecruiterThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(assignRecruiterThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.recruiters.push(action.payload?.data);
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(assignRecruiterThunk.rejected, (state, action) => {
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

export const editCompanyInformationThunk = createAsyncThunk(
    "recruiter/editCompanyInformation",
    async (obj) => {
        const response = await httpClient.put(
            EDIT_COMPANY_INFORMATION_URL,
            obj
        );
        return response.data;
    }
);

export const addCompanyThunk = createAsyncThunk(
    "recruiter/addCompany",
    async (obj) => {
        const response = await httpClient.post(ADD_COMPANY_URL, obj);
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
