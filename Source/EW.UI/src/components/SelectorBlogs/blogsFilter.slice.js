import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogCategories: [],
};

const blogsFilterSlice = createSlice({
    name: "blogsFilter",
    initialState: initialState,
    reducers: {
        setBlogCategories: (state, action) => {
            state.blogCategories = [...action.payload];
        },
    },
});

export const blogFilterActions = blogsFilterSlice.actions;
export const blogsFilterSelector = (state) => state.blogsFilter;
export default blogsFilterSlice;
