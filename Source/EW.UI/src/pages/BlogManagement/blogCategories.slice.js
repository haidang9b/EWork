import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { GET_BLOG_CATEGORIES_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";
import { failureReducer, loadingReducer } from "../../common/utils";

const initialState = {
    blogCategories: [],
    status: Status.idle,
};

const blogCategoriesSlice = createSlice({
    name: "blogCategories",
    initialState: initialState,
    extraReducers: (builder) =>
        builder
            .addCase(getBlogCategoriesThunk.pending, loadingReducer)
            .addCase(getBlogCategoriesThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                    state.blogCategories = action.payload?.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getBlogCategoriesThunk.rejected, failureReducer)
            .addCase(addBlogCategoryThunk.pending, loadingReducer)
            .addCase(addBlogCategoryThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                    state.blogCategories.push(action.payload?.data);
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(addBlogCategoryThunk.rejected, failureReducer)
            .addCase(updateBlogCategoryThunk.pending, loadingReducer)
            .addCase(updateBlogCategoryThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                    const index = state.blogCategories.findIndex(
                        (blogCategory) =>
                            blogCategory.id === action.payload?.data.id
                    );
                    state.blogCategories[index] = action.payload?.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(updateBlogCategoryThunk.rejected, failureReducer)
            .addCase(deleteBlogCategoryThunk.pending, loadingReducer)
            .addCase(deleteBlogCategoryThunk.fulfilled, (state, action) => {
                if (action.payload?.isSuccess && action.payload?.data) {
                    state.status = Status.succeeded;
                    state.blogCategories = state.blogCategories.filter(
                        (blogCategory) =>
                            blogCategory.id !== action.payload?.data.id
                    );
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(deleteBlogCategoryThunk.rejected, failureReducer),
});

export const getBlogCategoriesThunk = createAsyncThunk(
    "blogCategories/getBlogCategories",
    async () => {
        const response = await httpClient.get(GET_BLOG_CATEGORIES_URL);
        return response.data;
    }
);

export const addBlogCategoryThunk = createAsyncThunk(
    "blogCategories/addBlogCategory",
    async (blogCategory) => {
        const response = await httpClient.post(
            GET_BLOG_CATEGORIES_URL,
            blogCategory
        );
        return response.data;
    }
);

export const updateBlogCategoryThunk = createAsyncThunk(
    "blogCategories/updateBlogCategory",
    async (blogCategory) => {
        const response = await httpClient.put(
            GET_BLOG_CATEGORIES_URL,
            blogCategory
        );
        return response.data;
    }
);

export const deleteBlogCategoryThunk = createAsyncThunk(
    "blogCategories/deleteBlogCategory",
    async (id) => {
        const response = await httpClient.delete(
            `${GET_BLOG_CATEGORIES_URL}/${id}`
        );
        return response.data;
    }
);
export const blogCategoriesSelector = (state) => state.blogCategories;
export default blogCategoriesSlice;
