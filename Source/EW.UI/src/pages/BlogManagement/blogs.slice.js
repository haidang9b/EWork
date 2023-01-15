import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "../../common/constants";

const initialState = {
    blogs: [],
    status: Status.idle,
};

const blogsSlice = createSlice({
    name: "blogs",
    initialState: initialState,
});

export const getBlogsThunk = createAsyncThunk("blogs/getBlogs", async () => {
    const response = await httpClient.get("/blogs");
    return response.data;
});

export const blogsSelector = (state) => state.blogs;
export default blogsSlice;
