import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../../common/apis/httpClient";
import { GET_TOP_COMPANIES_URL } from "../../../common/apiUrl";
import { Status } from "../../../common/constants";
import { failureReducer, loadingReducer } from "../../../common/utils";

const inititalState = {
    companies: [],
    status: Status.idle,
};

const topCompanySlice = createSlice({
    name: "topCompany",
    initialState: inititalState,
    extraReducers: (builder) =>
        builder
            .addCase(getTopCompaniesThunk.pending, loadingReducer)
            .addCase(getTopCompaniesThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.companies = action.payload.data;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getTopCompaniesThunk.rejected, failureReducer),
});

export const getTopCompaniesThunk = createAsyncThunk(
    "topCompany/getTopCompanies",
    async () => {
        const response = await httpClient.get(GET_TOP_COMPANIES_URL);
        return response.data;
    }
);

export const topCompanySelector = (state) => state.topCompany;
export default topCompanySlice;
