import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import {
    EDIT_COMPANY_INFORMATION_URL,
    GET_MY_COMPANY_INFORMATION_URL,
} from "../../common/apiUrl";
import { Status } from "../../common/constants";

const initialState = {
    information: null,
    status: Status.idle,
};

const companyInformationSlice = createSlice({
    name: "companyInformation",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getCompanyInformationThunk.pending, (state, action) => {
                state.status = Status.loading;
            })
            .addCase(getCompanyInformationThunk.fulfilled, (state, action) => {
                if (action.payload?.data && action.payload?.isSuccess) {
                    state.information = action.payload.data;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getCompanyInformationThunk.rejected, (state, action) => {
                state.status = Status.failed;
            })
            .addCase(
                editProfileCompanyInformationThunk.pending,
                (state, action) => {
                    state.status = Status.loading;
                }
            )
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
                        state.status = Status.succeeded;
                    } else {
                        state.status = Status.failed;
                    }
                }
            )
            .addCase(
                editProfileCompanyInformationThunk.rejected,
                (state, action) => {
                    state.status = Status.failed;
                }
            ),
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

export const companyInformationSelector = (state) => state.companyInformation;
export default companyInformationSlice;
