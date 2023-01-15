import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpClient from "../../common/apis/httpClient";
import { GET_BLOGS_URL } from "../../common/apiUrl";
import { Status } from "../../common/constants";
import { failureReducer, loadingReducer } from "../../common/utils";

const initialState = {
    blogs: [],
    status: Status.idle,
};

const blogsSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getBlogsThunk.pending, loadingReducer)
            .addCase(getBlogsThunk.fulfilled, (state, action) => {
                if (action.payload.isSuccess && action.payload.data) {
                    state.status = Status.succeeded;
                    state.blogs = action.payload.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(getBlogsThunk.rejected, failureReducer)
            .addCase(addBlogThunk.pending, loadingReducer)
            .addCase(addBlogThunk.fulfilled, (state, action) => {
                if (action.payload.isSuccess && action.payload.data) {
                    state.status = Status.succeeded;
                    state.blogs.push(action.payload.data);
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(addBlogThunk.rejected, failureReducer)
            .addCase(updateBlogThunk.pending, loadingReducer)
            .addCase(updateBlogThunk.fulfilled, (state, action) => {
                if (action.payload.isSuccess && action.payload.data) {
                    state.status = Status.succeeded;
                    const index = state.blogs.findIndex(
                        (blog) => blog.id === action.payload.data.id
                    );
                    state.blogs[index] = action.payload.data;
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(updateBlogThunk.rejected, failureReducer)
            .addCase(deleteBlogThunk.pending, loadingReducer)
            .addCase(deleteBlogThunk.fulfilled, (state, action) => {
                if (action.payload.isSuccess && action.payload.data) {
                    state.status = Status.succeeded;
                    const index = state.blogs.findIndex(
                        (blog) => blog.id === action.payload.data.id
                    );
                    state.blogs.splice(index, 1);
                } else {
                    state.status = Status.failed;
                }
            })
            .addCase(deleteBlogThunk.rejected, failureReducer);
    },
});

export const getBlogsThunk = createAsyncThunk("blogs/getBlogs", async () => {
    const response = await httpClient.get(GET_BLOGS_URL);
    return response.data;
});

export const addBlogThunk = createAsyncThunk("blogs/addBlog", async (blog) => {
    const response = await httpClient.post(GET_BLOGS_URL, blog);
    return response.data;
});

export const updateBlogThunk = createAsyncThunk(
    "blogs/updateBlog",
    async (blog) => {
        const response = await httpClient.put(GET_BLOGS_URL, blog);
        return response.data;
    }
);

export const deleteBlogThunk = createAsyncThunk(
    "blogs/deleteBlog",
    async (id) => {
        const response = await httpClient.delete(`${GET_BLOGS_URL}/${id}`);
        return response.data;
    }
);

export const blogsSelector = (state) => state.blogs;
export default blogsSlice;
