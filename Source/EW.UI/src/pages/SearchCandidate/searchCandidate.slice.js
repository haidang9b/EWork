import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { GET_CANDIDATES_URL, MARK_APPLIED_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";
import { failureReducer, loadingReducer } from "../../common/utils";

const initialState = {
    candidates: [],
    status: Status.idle,
};

const searchCandidateSlice = createSlice({
    name: "searchCandidate",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getCandidatesThunk.pending, loadingReducer)
            .addCase(getCandidatesThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.candidates = action.payload.data;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getCandidatesThunk.rejected, failureReducer)
            .addCase(markCandidateThunk.pending, loadingReducer)
            .addCase(markCandidateThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(markCandidateThunk.rejected, failureReducer),
});

export const getCandidatesThunk = createAsyncThunk(
    "searchCandidate/getCandidates",
    async () => {
        const response = await httpClient.get(GET_CANDIDATES_URL);
        return response.data;
    }
);

export const markCandidateThunk = createAsyncThunk(
    "searchCandidate/markCandidate",
    async (obj) => {
        const response = await httpClient.post(MARK_APPLIED_URL, obj);
        return response.data;
    }
);
export default searchCandidateSlice;
export const searchCandidateSelector = (state) => state.searchCandidate;
