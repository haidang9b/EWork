import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../common/constants";

const initialState = {
    companies: [],
    recruiters: [],
    status: Status.idle,
};

const recruiterSlice = createSlice({
    name: "recruiterSlice",
    initialState: initialState,
});

export const recruiterActions = recruiterSlice.actions;
export const recruiterSelector = (state) => state.recruiter;
export default recruiterSlice;
