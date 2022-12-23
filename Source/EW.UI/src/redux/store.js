import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import usersSlice from "../pages/AccountManagement/users.slice";
import profileSlice from "../pages/CVManagement/profile.slice";
import notificationSlice from "../components/Notification/notification.slice";
import recruiterSlice from "./recruiter.slice";
import companySlice from "../pages/CompanyManagement/company.slice";
import recruiterRegisterSlice from "../pages/CreateRecruiter/recruiterRegister.slice";
import recruitmentPostSlice from "../pages/RecruitmentPost/recruitmentPost.slice";
import companyInformationSlice from "../pages/CompanyInformation/companyInformation.slice";
import topCompanySlice from "../pages/Home/ListCompany/topCompany.slice";
import companyDetailSlice from "../pages/CompanyDetail/companyDetail.slice";
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    profile: profileSlice.reducer,
    notification: notificationSlice.reducer,
    company: companySlice.reducer,
    recruiter: recruiterSlice.reducer,
    recruiterRegister: recruiterRegisterSlice.reducer,
    recruitmentPost: recruitmentPostSlice.reducer,
    companyInformation: companyInformationSlice.reducer,
    topCompany: topCompanySlice.reducer,
    companyDetail: companyDetailSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
