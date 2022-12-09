import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { GET_RECRUITMENT_POST_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";
const initialState = {
    posts: [],
    status: Status.idle,
};

const recruitmentPostSlice = createSlice({
    name: "recruitmentPost",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getRecruitmentPostsThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(getRecruitmentPostsThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                    state.posts = action.payload.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getRecruitmentPostsThunk.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(addRecruitmentPostThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(addRecruitmentPostThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                    state.posts.push(action.payload.data);
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(addRecruitmentPostThunk.failed, (state, action) => {
                state.status = Status.failed;
            }),
});

export const getRecruitmentPostsThunk = createAsyncThunk(
    "recruitmentPost/getRecruitmentPost",
    async () => {
        const response = await httpClient.get(GET_RECRUITMENT_POST_URL);
        return response.data;
    }
);

export const addRecruitmentPostThunk = createAsyncThunk(
    "recruitmentPost/addPost",
    async (obj) => {
        const response = await httpClient.post(GET_RECRUITMENT_POST_URL, obj);
        return response.data;
    }
);

export const recruitmentPostSelector = (state) => state.recruitmentPost;

export default recruitmentPostSlice;
