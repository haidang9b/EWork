import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import usersSlice from "../pages/AccountManagement/users.slice";
import recruiterSlice from "../pages/RecruiterManagement/recruiter.slice";
import profileSlice from "../pages/CVManagement/profile.slice";
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    users: usersSlice.reducer,
    recruiter: recruiterSlice.reducer,
    userDetail: profileSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
