import { Snackbar, Alert } from "@mui/material";
import React from "react";

export default function CustomAlert({ message, type }) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={type}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
}
