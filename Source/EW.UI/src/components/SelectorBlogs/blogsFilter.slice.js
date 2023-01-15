import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogCategories: [],
};

const blogsFilterSlice = createSlice({
    name: "blogsFilter",
    initialState: initialState,
    reducers: {
        setBlogCategories: (state, action) => {
            console.log("action.payload", action.payload);
            state.blogCategories = [...action.payload];
        },
    },
});

export const blogFilterActions = blogsFilterSlice.actions;
export const blogsFilterSelector = (state) => state.blogsFilter;
export default blogsFilterSlice;
