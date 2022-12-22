import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { RECRUITMENT_POST_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";
import { failureReducer, loadingReducer } from "../../common/utils";
const initialState = {
    posts: [],
    status: Status.idle,
};

const recruitmentPostSlice = createSlice({
    name: "recruitmentPost",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getRecruitmentPostsThunk.pending, loadingReducer)
            .addCase(getRecruitmentPostsThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                    state.posts = action.payload.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getRecruitmentPostsThunk.rejected, failureReducer)
            .addCase(saveRecruitmentPostThunk.pending, loadingReducer)
            .addCase(saveRecruitmentPostThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                    let { data } = action.payload;
                    let exist = state.posts.find((item) => item.id === data.id);
                    if (exist) {
                        exist.jobTitle = data.jobTitle;
                        exist.jobDescription = data.jobDescription;
                        exist.currency = data.currency;
                        exist.deadline = data.deadline;
                        exist.salaryType = data.salaryType;
                        exist.salaryFrom = data.salaryFrom;
                        exist.salaryTo = data.salaryTo;
                        exist.updatedBy = data.updatedBy;
                        exist.UpdatedByUser = data.updatedByUser;
                        exist.yearExperience = data.yearExperience;
                        exist.techStacks = data.techStacks;
                        exist.workingType = data.workingType;
                    } else {
                        state.posts.push(action.payload.data);
                    }
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(saveRecruitmentPostThunk.rejected, failureReducer)
            .addCase(deleteRecruitmentPostThunk.pending, loadingReducer)
            .addCase(deleteRecruitmentPostThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    let newData = state.posts.filter(
                        (item) => item.id !== action.payload?.data?.id
                    );
                    state.posts = newData;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(deleteRecruitmentPostThunk.rejected, failureReducer),
});

export const getRecruitmentPostsThunk = createAsyncThunk(
    "recruitmentPost/getRecruitmentPost",
    async () => {
        const response = await httpClient.get(RECRUITMENT_POST_URL);
        return response.data;
    }
);

export const saveRecruitmentPostThunk = createAsyncThunk(
    "recruitmentPost/addPost",
    async (obj) => {
        const response = await httpClient.post(RECRUITMENT_POST_URL, obj);
        return response.data;
    }
);

export const deleteRecruitmentPostThunk = createAsyncThunk(
    "recruitmentPost/deletePost",
    async (id) => {
        const response = await httpClient.delete(
            `${RECRUITMENT_POST_URL}/${id}`
        );
        return response.data;
    }
);

export const recruitmentPostSelector = (state) => state.recruitmentPost;

export default recruitmentPostSlice;
