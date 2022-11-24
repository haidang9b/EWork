import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    type: "error",
    title: "",
    message: "",
};

const notificationSlice = createSlice({
    name: "notification",
    initialState: initialState,
    reducers: {
        setNotify: (state, action) => {
            state.isOpen = action.payload.isOpen;
            state.type = action.payload.type;
            state.title = action.payload.title;
            state.message = action.payload.message;
        },
        closeNotify: (state, action) => {
            state.isOpen = false;
        },
    },
});

export const notificationSelector = (state) => state.notification;
export const notificationActions = notificationSlice.actions;
export default notificationSlice;
