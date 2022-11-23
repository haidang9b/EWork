import { Snackbar, Alert, AlertTitle } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const Notification = ({ notify, setNotify }) => {
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
};

Notification.propTypes = {
    notify: PropTypes.object,
    setNotify: PropTypes.func,
};

Notification.defaultProps = {
    notify: {
        isOpen: false,
        type: "error",
        title: "",
        message: "",
    },
};
export default Notification;
