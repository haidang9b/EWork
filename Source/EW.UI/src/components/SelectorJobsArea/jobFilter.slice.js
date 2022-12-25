import { createSlice } from "@reduxjs/toolkit";
import { CompanyTypes, WorkingTypes } from "../../common/constants";

const initialState = {
    salary: 0,
    workingTypes: [...WorkingTypes.map((item) => item.value)],
    companyTypes: [...CompanyTypes.map((item) => item.value)],
};

const jobFilterSlice = createSlice({
    name: "jobFilter",
    initialState: initialState,
    reducers: {
        salaryFilterChange: (state, action) => {
            state.salary = action.payload;
        },
        workingTypesFilterChange: (state, action) => {
            state.workingTypes = [...action.payload];
        },
        companyTypesFilterChange: (state, action) => {
            state.companyTypes = [...action.payload];
        },
    },
});

export default jobFilterSlice;
export const jobFilterSelector = (state) => state.jobFilter;
export const jobFilterActions = jobFilterSlice.actions;
