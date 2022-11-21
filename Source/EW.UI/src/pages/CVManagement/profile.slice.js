import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import {
    EDIT_COVER_LETTER_URL,
    GET_PROFILE_URL,
    UPLOAD_NEW_CV_URL,
} from "../../common/apiUrl";
import { Status } from "../../common/constants";

const initialState = {
    cvs: [],
    coverLetter: "",
    experiences: [],
    status: Status.idle,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getProfileThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(getProfileThunk.fulfilled, (state, action) => {
                state.cvs = action.payload?.data?.cVs;
                state.experiences = action.payload?.data?.experences;
                state.coverLetter = action.payload?.data?.coverLetter;
                console.log(action.payload);
                state.status = Status.succeeded;
            })
            .addCase(getProfileThunk.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(editCoverLetterThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(editCoverLetterThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess) {
                    state.status = Status.succeeded;
                    state.coverLetter = action.payload.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(editCoverLetterThunk.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(uploadNewCVThunk.pending, (state, payload) => {
                state.status = Status.loading;
            })
            .addCase(uploadNewCVThunk.fulfilled, (state, payload) => {
                state.status = Status.succeeded;
            })
            .addCase(uploadNewCVThunk.rejected, (state, payload) => {
                state.status = Status.failed;
            }),
});

export const getProfileThunk = createAsyncThunk(
    "profile/getProfile",
    async () => {
        const response = await httpClient.get(GET_PROFILE_URL);
        return response.data;
    }
);
export const editCoverLetterThunk = createAsyncThunk(
    "profile/editCoverLetter",
    async (obj) => {
        const response = await httpClient.put(EDIT_COVER_LETTER_URL, obj);
        return response.data;
    }
);

export const uploadNewCVThunk = createAsyncThunk(
    "profile/uploadNewCV",
    async (file) => {
        console.log(file);
        const formData = new FormData();
        formData.append("File", file);
        const response = await httpClient.post(UPLOAD_NEW_CV_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    }
);

export const removeCVThunk = createAsyncThunk();

export const profileSelector = (state) => state.profile;
export default profileSlice;
