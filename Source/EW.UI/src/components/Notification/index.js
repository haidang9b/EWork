import { Snackbar, Alert, AlertTitle } from "@mui/material";
import React from "react";

export default function Notification(props) {
    const { notify, setNotify } = props;

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setNotify({
            ...notify,
            isOpen: false,
        });
    };

    return (
        <>
            <Snackbar
                open={notify.isOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={notify.type}
                    sx={{ width: "100%" }}
                >
                    <AlertTitle>{notify.title}</AlertTitle>
                    {notify.message}
                </Alert>
            </Snackbar>
        </>
    );
}
