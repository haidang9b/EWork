import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import usersSlice from "../pages/AccountManagement/users.slice";
import documentSlice from "../pages/CVManagement/document.slice";
import notificationSlice from "../components/Notification/notification.slice";
import recruiterSlice from "./recruiter.slice";
import companySlice from "../pages/CompanyManagement/company.slice";
import recruiterRegisterSlice from "../pages/CreateRecruiter/recruiterRegister.slice";
import recruitmentPostSlice from "../pages/RecruitmentPost/recruitmentPost.slice";
import companyInformationSlice from "../pages/CompanyInformation/companyInformation.slice";
import topCompanySlice from "./topCompany.slice";
import companyDetailSlice from "../pages/CompanyDetail/companyDetail.slice";
import filterSlice from "../components/FilterArea/filter.slice";
import jobFilterSlice from "../components/SelectorJobsArea/jobFilter.slice";
import jobsSlice from "../pages/Jobs/jobs.slice";
import jobDetailSlice from "../pages/JobDetail/jobDetail.slice";
import applicationSlice from "../pages/JobDetail/ApplyModal/application.slice";
import jobsAppliedSlice from "../pages/ApplicationFlow/jobsApplied.slice";
import profileSlice from "../pages/Profile/profile.slice";
import appliedSlice from "../pages/AppliedManagement/applied.slice";
import appliedFilterSlice from "../components/SelectorApplied/appliedFilter.slice";
import chartSlice from "./chart.slice";
import searchCandidateSlice from "../pages/SearchCandidate/searchCandidate.slice";

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    document: documentSlice.reducer,
    notification: notificationSlice.reducer,
    company: companySlice.reducer,
    recruiter: recruiterSlice.reducer,
    recruiterRegister: recruiterRegisterSlice.reducer,
    recruitmentPost: recruitmentPostSlice.reducer,
    companyInformation: companyInformationSlice.reducer,
    topCompany: topCompanySlice.reducer,
    companyDetail: companyDetailSlice.reducer,
    filter: filterSlice.reducer,
    jobFilter: jobFilterSlice.reducer,
    jobs: jobsSlice.reducer,
    jobDetail: jobDetailSlice.reducer,
    application: applicationSlice.reducer,
    jobsApplied: jobsAppliedSlice.reducer,
    profile: profileSlice.reducer,
    appliedFilter: appliedFilterSlice.reducer,
    applied: appliedSlice.reducer,
    chart: chartSlice.reducer,
    searchCandidate: searchCandidateSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
