import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import {
    CERTIFICATE_PROFILE_URL,
    EDUCATION_PROFILE_URL,
    GET_PROFILE_URL,
    PROJECT_PROFILE_URL,
    PUT_CONTACT_PROFILE_URL,
    WORK_HISTORY_PROFILE_URL,
} from "../../common/apiUrl";
import { Status } from "../../common/constants";
import { failureReducer, loadingReducer } from "../../common/utils";

const initialState = {
    profile: null,
    workHistory: [],
    educations: [],
    projects: [],
    certificates: [],
    status: Status.idle,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getProfileThunk.pending, loadingReducer)
            .addCase(getProfileThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.profile = action.payload?.data;
                    state.workHistory = action.payload?.data?.workHistory;
                    state.educations = action.payload?.data?.educations;
                    state.projects = action.payload?.data?.projects;
                    state.certificates = action.payload?.data?.certificates;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getProfileThunk.rejected, failureReducer)
            .addCase(updateContactThunk.pending, loadingReducer)
            .addCase(updateContactThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.profile = action.payload.data;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(updateContactThunk.rejected, failureReducer)
            .addCase(addWorkHistoryThunk.pending, loadingReducer)
            .addCase(addWorkHistoryThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.workHistory.push(action.payload?.data);
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(addWorkHistoryThunk.rejected, failureReducer)
            .addCase(removeWorkHistoryThunk.pending, loadingReducer)
            .addCase(removeWorkHistoryThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    let currentWorkHistories = state.workHistory.filter(
                        (item) => item.id !== action.payload.data?.id
                    );
                    state.workHistory = currentWorkHistories;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(removeWorkHistoryThunk.rejected, failureReducer)
            .addCase(updateWorkHistoryThunk.pending, loadingReducer)
            .addCase(updateWorkHistoryThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    let currentWorkHistory = state.workHistory.find(
                        (item) => item.id === action.payload.data?.id
                    );
                    let { companyName, from, to, description, isWorking } =
                        action.payload.data;
                    currentWorkHistory.companyName = companyName;
                    currentWorkHistory.from = from;
                    currentWorkHistory.to = to;
                    currentWorkHistory.description = description;
                    currentWorkHistory.isWorking = isWorking;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(updateWorkHistoryThunk.rejected, failureReducer)
            .addCase(addEducationThunk.pending, loadingReducer)
            .addCase(addEducationThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.educations.push(action.payload?.data);
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(addEducationThunk.rejected, failureReducer)
            .addCase(removeEducationThunk.pending, loadingReducer)
            .addCase(removeEducationThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    let currentEducations = state.educations.filter(
                        (item) => item.id !== action.payload.data?.id
                    );
                    state.educations = currentEducations;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(removeEducationThunk.rejected, failureReducer)
            .addCase(updateEducationThunk.pending, loadingReducer)
            .addCase(updateEducationThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    let currentEducation = state.educations.find(
                        (item) => item.id === action.payload.data?.id
                    );
                    let { orgName, from, to, description } =
                        action.payload.data;
                    currentEducation.orgName = orgName;
                    currentEducation.from = from;
                    currentEducation.to = to;
                    currentEducation.description = description;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(updateEducationThunk.rejected, failureReducer)
            .addCase(addCertificateThunk.pending, loadingReducer)
            .addCase(addCertificateThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.certificates.push(action.payload?.data);
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(addCertificateThunk.rejected, failureReducer)
            .addCase(removeCertificateThunk.pending, loadingReducer)
            .addCase(removeCertificateThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    let currentCertificates = state.certificates.filter(
                        (item) => item.id !== action.payload.data?.id
                    );
                    state.certificates = currentCertificates;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(removeCertificateThunk.rejected, failureReducer)
            .addCase(updateCertificateThunk.pending, loadingReducer)
            .addCase(updateCertificateThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    let currentCertificate = state.certificates.find(
                        (item) => item.id === action.payload.data?.id
                    );
                    let { certificateName, from, to, description } =
                        action.payload.data;
                    currentCertificate.certificateName = certificateName;
                    currentCertificate.from = from;
                    currentCertificate.to = to;
                    currentCertificate.description = description;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(updateCertificateThunk.rejected, failureReducer)
            .addCase(addProjectThunk.pending, loadingReducer)
            .addCase(addProjectThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.projects.push(action.payload?.data);
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(addProjectThunk.rejected, failureReducer)
            .addCase(removeProjectThunk.pending, loadingReducer)
            .addCase(removeProjectThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    let currentProjects = state.projects.filter(
                        (item) => item.id !== action.payload.data?.id
                    );
                    state.projects = currentProjects;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(removeProjectThunk.rejected, failureReducer)
            .addCase(updateProjectThunk.pending, loadingReducer)
            .addCase(updateProjectThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    let currentProject = state.projects.find(
                        (item) => item.id === action.payload.data?.id
                    );
                    let { projectName, customerName, from, to, description } =
                        action.payload.data;
                    currentProject.projectName = projectName;
                    currentProject.customerName = customerName;
                    currentProject.from = from;
                    currentProject.to = to;
                    currentProject.description = description;
                    state.status = Status.succeeded;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(updateProjectThunk.rejected, failureReducer),
});

export const getProfileThunk = createAsyncThunk(
    "profile/getProfile",
    async () => {
        const response = await httpClient.get(GET_PROFILE_URL);
        return response.data;
    }
);

export const updateContactThunk = createAsyncThunk(
    "profile/updateContact",
    async (obj) => {
        const response = await httpClient.put(PUT_CONTACT_PROFILE_URL, obj);
        return response.data;
    }
);

export const addWorkHistoryThunk = createAsyncThunk(
    "profile/addWorkHistory",
    async (obj) => {
        const response = await httpClient.post(WORK_HISTORY_PROFILE_URL, obj);
        return response.data;
    }
);

export const removeWorkHistoryThunk = createAsyncThunk(
    "profile/removeWorkHistory",
    async (id) => {
        const response = await httpClient.delete(
            `${WORK_HISTORY_PROFILE_URL}/${id}`
        );
        return response.data;
    }
);

export const updateWorkHistoryThunk = createAsyncThunk(
    "profile/updateWorkHistory",
    async (obj) => {
        const response = await httpClient.put(WORK_HISTORY_PROFILE_URL, obj);
        return response.data;
    }
);

export const addEducationThunk = createAsyncThunk(
    "profile/addEducation",
    async (obj) => {
        const response = await httpClient.post(EDUCATION_PROFILE_URL, obj);
        return response.data;
    }
);

export const removeEducationThunk = createAsyncThunk(
    "profile/removeEducation",
    async (id) => {
        const response = await httpClient.delete(
            `${EDUCATION_PROFILE_URL}/${id}`
        );
        return response.data;
    }
);

export const updateEducationThunk = createAsyncThunk(
    "profile/updateEducation",
    async (obj) => {
        const response = await httpClient.put(EDUCATION_PROFILE_URL, obj);
        return response.data;
    }
);

export const addCertificateThunk = createAsyncThunk(
    "profile/addCertificate",
    async (obj) => {
        const response = await httpClient.post(CERTIFICATE_PROFILE_URL, obj);
        return response.data;
    }
);

export const removeCertificateThunk = createAsyncThunk(
    "profile/removeCertificate",
    async (id) => {
        const response = await httpClient.delete(
            `${CERTIFICATE_PROFILE_URL}/${id}`
        );
        return response.data;
    }
);

export const updateCertificateThunk = createAsyncThunk(
    "profile/updateCertificate",
    async (obj) => {
        const response = await httpClient.put(CERTIFICATE_PROFILE_URL, obj);
        return response.data;
    }
);

export const addProjectThunk = createAsyncThunk(
    "profile/addProject",
    async (obj) => {
        const response = await httpClient.post(PROJECT_PROFILE_URL, obj);
        return response.data;
    }
);

export const removeProjectThunk = createAsyncThunk(
    "profile/removeProject",
    async (id) => {
        const response = await httpClient.delete(
            `${PROJECT_PROFILE_URL}/${id}`
        );
        return response.data;
    }
);

export const updateProjectThunk = createAsyncThunk(
    "profile/updateProject",
    async (obj) => {
        const response = await httpClient.put(PROJECT_PROFILE_URL, obj);
        return response.data;
    }
);

export default profileSlice;
export const profileSelector = (state) => state.profile;
