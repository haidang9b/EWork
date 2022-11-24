import { Snackbar, Alert, AlertTitle } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    notificationActions,
    notificationSelector,
} from "./notification.slice";

const Notification = () => {
    const dispatch = useDispatch();
    const notify = useSelector(notificationSelector);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(notificationActions.closeNotify());
    };

    return (
        <>
            <Snackbar
                open={notify.isOpen}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={notify.type}
                    sx={{ width: "100%" }}
                    color={notify.type}
                >
                    <AlertTitle sx={{ fontWeight: "bolder" }}>
                        {notify.title}
                    </AlertTitle>
                    {notify.message}
                </Alert>
            </Snackbar>
        </>
    );
};

Notification.displayName = "Notification";

export default Notification;
