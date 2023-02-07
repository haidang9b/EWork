import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postIds: [],
    statusSelected: [],
    companySelected: [],
};

const appliedFilterSlice = createSlice({
    name: "appliedFilterSelector",
    initialState: initialState,
    reducers: {
        postIdsChange: (state, action) => {
            state.postIds = [...action.payload];
        },

        statusSelectedChange: (state, action) => {
            state.statusSelected = [...action.payload];
        },
        companySelectedChange: (state, action) => {
            state.companySelected = [...action.payload];
        },
    },
});

export const appliedFilterActions = appliedFilterSlice.actions;
export const appliedFilterSelector = (state) => state.appliedFilter;
export default appliedFilterSlice;
