import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import {
    EDIT_COMPANY_INFORMATION_URL,
    GET_MY_COMPANY_INFORMATION_URL,
    UPLOAD_AVATAR_COMPANY_URL,
} from "../../common/apiUrl";
import { Status } from "../../common/constants";
import { failureReducer, loadingReducer } from "../../common/utils";

const initialState = {
    information: null,
    status: Status.idle,
};

const companyInformationSlice = createSlice({
    name: "companyInformation",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getCompanyInformationThunk.pending, loadingReducer)
            .addCase(getCompanyInformationThunk.fulfilled, (state, action) => {
                if (action.payload?.data && action.payload?.isSuccess) {
                    state.information = action.payload.data;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getCompanyInformationThunk.rejected, failureReducer)
            .addCase(editProfileCompanyInformationThunk.pending, loadingReducer)
            .addCase(
                editProfileCompanyInformationThunk.fulfilled,
                (state, action) => {
                    if (action.payload?.isSuccess && action.payload?.data) {
                        state.information.status = action.payload?.data?.status;
                        state.information.companyName =
                            action.payload?.data?.companyName;
                        state.information.address =
                            action.payload?.data?.address;
                        state.information.taxNumber =
                            action.payload?.data?.taxNumber;
                        state.information.teamSize =
                            action.payload?.data?.teamSize;
                        state.information.country =
                            action.payload?.data?.country;
                        state.information.companyType =
                            action.payload?.data?.companyType;
                        state.information.description =
                            action.payload?.data?.description;
                        state.status = Status.succeeded;
                    } else {
                        state.status = Status.failed;
                    }
                }
            )
            .addCase(
                editProfileCompanyInformationThunk.rejected,
                failureReducer
            )
            .addCase(uploadAvatarCompanyThunk.pending, loadingReducer)
            .addCase(uploadAvatarCompanyThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.avatarUrl = action.payload?.data.avatarUrl;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(uploadAvatarCompanyThunk.rejected, failureReducer),
});

export const getCompanyInformationThunk = createAsyncThunk(
    "companyInformation/getInformation",
    async () => {
        const response = await httpClient.get(GET_MY_COMPANY_INFORMATION_URL);
        return response.data;
    }
);

export const editProfileCompanyInformationThunk = createAsyncThunk(
    "companyInformation/editCompanyInformation",
    async (obj) => {
        const response = await httpClient.put(
            EDIT_COMPANY_INFORMATION_URL,
            obj
        );
        return response.data;
    }
);

export const uploadAvatarCompanyThunk = createAsyncThunk(
    "companyInformation/uploadAvatarCompany",
    async (file) => {
        const formData = new FormData();
        formData.append("File", file);
        const response = await httpClient.post(
            UPLOAD_AVATAR_COMPANY_URL,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    }
);

export const companyInformationSelector = (state) => state.companyInformation;
export default companyInformationSlice;
