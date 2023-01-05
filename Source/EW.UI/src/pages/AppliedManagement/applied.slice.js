import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { GET_APPLIEDS_BY_BUSINESS } from "../../common/apiUrl";
import { Status } from "../../common/constants";
import { failureReducer, loadingReducer } from "../../common/utils";

const initialState = {
    applieds: [],
    status: Status.idle,
};

const appliedSlice = createSlice({
    name: "applied",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getAppliedByBusinessThunk.pending, loadingReducer)
            .addCase(getAppliedByBusinessThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.applieds = action.payload.data;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getAppliedByBusinessThunk.rejected, failureReducer),
});

export const getAppliedByBusinessThunk = createAsyncThunk(
    "applied/getAppliedByBusiness",
    async () => {
        const response = await httpClient.get(GET_APPLIEDS_BY_BUSINESS);
        return response.data;
    }
);

export const appliedSelector = (state) => state.applied;
export default appliedSlice;
