import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "../../common/constants";

const initialState = {
    company: null,
    status: Status.idle,
};

const companyDetailSlice = createSlice({
    name: "companyDetail",
});

export const getCompanyDetailByIdThunk = createAsyncThunk(
    "companyDetail/getCompanyDetailById",
    async (id) => {}
);

export const companyDetailSelector = (state) => state.companyDetail;
export default companyDetailSlice;
