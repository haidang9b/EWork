import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { GET_COMPANIES_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";
import { failureReducer, loadingReducer } from "../../common/utils";

const initialState = {
    company: null,
    status: Status.idle,
};

const companyDetailSlice = createSlice({
    name: "companyDetail",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getCompanyDetailByIdThunk.pending, loadingReducer)
            .addCase(getCompanyDetailByIdThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.company = action.payload?.data;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getCompanyDetailByIdThunk.rejected, failureReducer),
});

export const getCompanyDetailByIdThunk = createAsyncThunk(
    "companyDetail/getCompanyDetailById",
    async (id) => {
        const response = await httpClient.get(`${GET_COMPANIES_URL}/${id}`);
        return response.data;
    }
);

export const companyDetailSelector = (state) => state.companyDetail;
export default companyDetailSlice;
