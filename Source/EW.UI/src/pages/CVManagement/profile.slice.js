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
            .addCase(getProfile.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.cvs = [...state.cvs, action.payload?.data?.cVs];
                state.experiences = [
                    ...state.experiences,
                    action.payload?.data?.experences,
                ];
                state.coverLetter = action.payload?.data?.coverLetter;
                console.log(action.payload);
                state.status = Status.succeeded;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(editCoverLetter.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(editCoverLetter.fulfilled, (state, action) => {
                if (action.payload?.isSuccess) {
                    state.status = Status.succeeded;
                    state.coverLetter = action.payload.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(editCoverLetter.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(uploadNewCV.pending, (state, payload) => {
                state.status = Status.loading;
            })
            .addCase(uploadNewCV.fulfilled, (state, payload) => {
                state.status = Status.succeeded;
            })
            .addCase(uploadNewCV.rejected, (state, payload) => {
                state.status = Status.failed;
            }),
});

export const getProfile = createAsyncThunk("profile/getProfile", async () => {
    const response = await httpClient.get(GET_PROFILE_URL);
    return response.data;
});
export const editCoverLetter = createAsyncThunk(
    "profile/editCoverLetter",
    async (obj) => {
        const response = await httpClient.put(EDIT_COVER_LETTER_URL, obj);
        return response.data;
    }
);

export const uploadNewCV = createAsyncThunk(
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

export const profileSelector = (state) => state.profile;
export default profileSlice;
