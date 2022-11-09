import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from "@mui/material";
import React from "react";

const ConfirmDialog = (props) => {
    const { confirm, setConfirm } = props;

    return (
        <Dialog
            open={confirm.isOpen}
            onClose={() => setConfirm({ ...confirm, isOpen: false })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{confirm.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {confirm.subtitle}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={confirm.onConfirm}>Yes</Button>
                <Button
                    onClick={() => setConfirm({ ...confirm, isOpen: false })}
                >
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
