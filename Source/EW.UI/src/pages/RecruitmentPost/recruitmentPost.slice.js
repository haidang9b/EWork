import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../common/constants";
const initialState = {
    posts: [],
    status: Status.idle,
};

const recruitmentPostSlice = createSlice({
    name: "recruitmentPost",
    initialState: initialState,
});

export const recruitmentPostSelector = (state) => state.recruitmentPost;

export default recruitmentPostSlice;
