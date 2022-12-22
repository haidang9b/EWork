import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { RECRUITER_REGISTER_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";
import { failureReducer, loadingReducer } from "../../common/utils";

const initialState = {
    status: Status.idle,
};

const recruiterRegisterSlice = createSlice({
    name: "recruiterRegister",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(recruiterRegisterThunk.pending, loadingReducer)
            .addCase(recruiterRegisterThunk.fulfilled, (state, action) => {
                if (action.payload.isSuccess) {
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(recruiterRegisterThunk.rejected, failureReducer),
});

export const recruiterRegisterThunk = createAsyncThunk(
    "recruiterRegister/recruiterRegister",
    async (obj) => {
        const response = await httpClient.post(RECRUITER_REGISTER_URL, obj);
        return response.data;
    }
);

export const recruiterRegisterSelector = (state) => state.recruiterRegister;
export default recruiterRegisterSlice;
