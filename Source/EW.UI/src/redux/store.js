import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import usersSlice from "../pages/AccountManagement/users.slice";
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    users: usersSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});
