import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    text: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState: initialState,
    reducers: {
        searchFilterChange: (state, action) => {
            state.text = action.payload;
        },
    },
});

export const filterSelector = (state) => state.filter;
export const filterActions = filterSlice.actions;

export default filterSlice;
