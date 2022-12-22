import { Status } from "../../common/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import {
    ADD_COMPANY_URL,
    EDIT_COMPANY_INFORMATION_URL,
    GET_COMPANIES_URL,
} from "../../common/apiUrl";
import { failureReducer, loadingReducer } from "../../common/utils";
const initialState = {
    companies: [],
    status: Status.idle,
};

const companySlice = createSlice({
    name: "company",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getCompaniesThunk.pending, loadingReducer)
            .addCase(getCompaniesThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess) {
                    state.status = Status.succeeded;
                    state.companies = action.payload?.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getCompaniesThunk.rejected, failureReducer)
            .addCase(editCompanyInformationThunk.pending, loadingReducer)
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
                    currentCompany.taxNumber = action.payload?.data?.taxNumber;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(editCompanyInformationThunk.rejected, failureReducer)
            .addCase(addCompanyThunk.pending, loadingReducer)
            .addCase(addCompanyThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.companies.push(action.payload?.data);
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(addCompanyThunk.rejected, failureReducer),
});

export const getCompaniesThunk = createAsyncThunk(
    "company/getCompanies",
    async () => {
        const response = await httpClient.get(GET_COMPANIES_URL);
        return response.data;
    }
);

export const editCompanyInformationThunk = createAsyncThunk(
    "company/editCompanyInformation",
    async (obj) => {
        const response = await httpClient.put(
            EDIT_COMPANY_INFORMATION_URL,
            obj
        );
        return response.data;
    }
);

export const addCompanyThunk = createAsyncThunk(
    "company/addCompany",
    async (obj) => {
        const response = await httpClient.post(ADD_COMPANY_URL, obj);
        return response.data;
    }
);

export const companySelector = (state) => state.company;
export default companySlice;
