import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import {
    APPLICATION_CONTROLLER_URL,
    GET_APPLIEDS_BY_BUSINESS,
} from "../../common/apiUrl";
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
            .addCase(getAppliedByBusinessThunk.rejected, failureReducer)
            .addCase(updateProgressAppliedThunk.pending, loadingReducer)
            .addCase(updateProgressAppliedThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    const currentApplied = state.applieds.find(
                        (item) => item.id === action.payload?.data?.id
                    );
                    console.log(currentApplied);
                    currentApplied.updatedDate =
                        action.payload?.data?.updatedDate;
                    currentApplied.description =
                        action.payload?.data?.description;
                    currentApplied.status = action.payload?.data?.status;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(updateProgressAppliedThunk.rejected, failureReducer),
});

export const getAppliedByBusinessThunk = createAsyncThunk(
    "applied/getAppliedByBusiness",
    async () => {
        const response = await httpClient.get(GET_APPLIEDS_BY_BUSINESS);
        return response.data;
    }
);

export const updateProgressAppliedThunk = createAsyncThunk(
    "applied/updateProgressApplied",
    async (obj) => {
        const response = await httpClient.put(APPLICATION_CONTROLLER_URL, obj);
        return response.data;
    }
);

export const appliedSelector = (state) => state.applied;
export default appliedSlice;
