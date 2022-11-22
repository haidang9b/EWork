import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { RECRUITER_REGISTER_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";

const initialState = {
    status: Status.idle,
    message: "",
};

const recruiterSlice = createSlice({
    name: "recruiter",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(recruiterRegisterThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(recruiterRegisterThunk.fulfilled, (state, action) => {
                if (action.payload.isSuccess) {
                    state.status = Status.succeeded;
                    state.message = action.payload?.message;
                } else {
                    state.status = Status.failed;
                    state.message = action.payload?.message;
                }
            })
            .addCase(recruiterRegisterThunk.rejected, (state, action) => {
                state.status = Status.failed;
                state.message = "Không thể đăng ký tài khoản";
            });
    },
});

export const recruiterRegisterThunk = createAsyncThunk(
    "recruiter",
    async (obj) => {
        const response = await httpClient.post(RECRUITER_REGISTER_URL, obj);
        return response.data;
    }
);

export default recruiterSlice;
export const recruiterSelector = (state) => state.recruiter;
