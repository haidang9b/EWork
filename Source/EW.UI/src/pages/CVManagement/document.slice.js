import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { Status } from "../../common/constants";
import {
    DELETE_REMOVE_CV_URL,
    EDIT_COVER_LETTER_URL,
    GET_DOCUMENT_URL,
    UPLOAD_NEW_CV_URL,
} from "../../common/apiUrl";
import { failureReducer, loadingReducer } from "../../common/utils";

const initialState = {
    cvs: [],
    coverLetter: "",
    status: Status.idle,
};

const documentSlice = createSlice({
    name: "document",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getDocumentThunk.pending, loadingReducer)
            .addCase(getDocumentThunk.fulfilled, (state, action) => {
                state.cvs = action.payload?.data?.cVs;
                state.coverLetter = action.payload?.data?.coverLetter;
                state.status = Status.succeeded;
            })
            .addCase(getDocumentThunk.rejected, failureReducer)
            .addCase(editCoverLetterThunk.pending, loadingReducer)
            .addCase(editCoverLetterThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess) {
                    state.status = Status.succeeded;
                    state.coverLetter = action.payload.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(editCoverLetterThunk.rejected, failureReducer)
            .addCase(uploadNewCVThunk.pending, loadingReducer)
            .addCase(uploadNewCVThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                    state.cvs.unshift(action.payload?.data);
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(uploadNewCVThunk.rejected, failureReducer)
            .addCase(removeCVThunk.pending, loadingReducer)
            .addCase(removeCVThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                    let newData = state.cvs.filter(
                        (item) => item.id !== action.payload?.data?.id
                    );
                    state.cvs = newData;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(removeCVThunk.rejected, failureReducer),
});

export const getDocumentThunk = createAsyncThunk(
    "document/getDocumentThunk",
    async () => {
        const response = await httpClient.get(GET_DOCUMENT_URL);
        return response.data;
    }
);
export const editCoverLetterThunk = createAsyncThunk(
    "document/editCoverLetter",
    async (obj) => {
        const response = await httpClient.put(EDIT_COVER_LETTER_URL, obj);
        return response.data;
    }
);

export const uploadNewCVThunk = createAsyncThunk(
    "document/uploadNewCV",
    async (file) => {
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

export const removeCVThunk = createAsyncThunk(
    "document/removeCV",
    async (id) => {
        const response = await httpClient.delete(
            `${DELETE_REMOVE_CV_URL}/${id}`
        );
        return response.data;
    }
);

export const documentSelector = (state) => state.document;
export default documentSlice;
