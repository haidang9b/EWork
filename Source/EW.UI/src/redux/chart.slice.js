import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../common/apis/httpClient";
import {
    NUMBER_APPLICATION_URL,
    NUMBER_RANKING_TECH_STACK_URL,
    NUMBER_RECRUITMENT_POST_URL,
} from "../common/apiUrl";
import { JobSkills, Status } from "../common/constants";
import { failureReducer, loadingReducer } from "../common/utils";

const initialState = {
    numberApplications: [],
    numberPosts: [],
    techStacks: [],
    status: Status.idle,
};
const chartSlice = createSlice({
    name: "chart",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getNumberApplicationThunk.pending, loadingReducer)
            .addCase(getNumberApplicationThunk.fulfilled, (state, action) => {
                state.status = Status.succeeded;
                state.numberApplications = action.payload?.data;
            })
            .addCase(getNumberApplicationThunk.rejected, failureReducer)
            .addCase(getNumberPostThunk.pending, loadingReducer)
            .addCase(getNumberPostThunk.fulfilled, (state, action) => {
                state.status = Status.succeeded;
                state.numberPosts = action.payload?.data;
            })
            .addCase(getNumberPostThunk.rejected, failureReducer)
            .addCase(getNumberRankingTechStackThunk.pending, loadingReducer)
            .addCase(
                getNumberRankingTechStackThunk.fulfilled,
                (state, action) => {
                    state.status = Status.succeeded;
                    state.techStacks = action.payload?.data;
                }
            )
            .addCase(getNumberRankingTechStackThunk.rejected, failureReducer),
});

export const getNumberApplicationThunk = createAsyncThunk(
    "chart/getNumberApplication",
    async () => {
        const response = await httpClient.get(NUMBER_APPLICATION_URL);
        return response.data;
    }
);

export const getNumberPostThunk = createAsyncThunk(
    "chart/getNumberPost",
    async () => {
        const response = await httpClient.get(NUMBER_RECRUITMENT_POST_URL);
        return response.data;
    }
);

export const getNumberRankingTechStackThunk = createAsyncThunk(
    "chart/getNumberRankingTechStack",
    async () => {
        const response = await httpClient.post(
            NUMBER_RANKING_TECH_STACK_URL,
            JobSkills
        );
        return response.data;
    }
);
export default chartSlice;
export const chartSelector = (state) => state.chart;
