import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import usersSlice from "../pages/AccountManagement/users.slice";
import profileSlice from "../pages/CVManagement/profile.slice";
import notificationSlice from "../components/Notification/notification.slice";
import recruiterSlice from "../pages/CompanyManagement/recruiter.slice";
import recruiterRegisterSlice from "../pages/CreateRecruiter/recruiterRegister.slice";
import recruitmentPostSlice from "../pages/RecruitmentPost/recruitmentPost.slice";
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    profile: profileSlice.reducer,
    notification: notificationSlice.reducer,
    recruiter: recruiterSlice.reducer,
    recruiterRegister: recruiterRegisterSlice.reducer,
    recruitmentPost: recruitmentPostSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
