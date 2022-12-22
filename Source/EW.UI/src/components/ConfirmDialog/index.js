import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

/**
 * Dialog support for confirm and execute function if user confirm
 * @param {Object} confirm is data confirm include : isOpen: bool, title: string, subtitle: string, onConfirm: function
 * @param {Function} setConfirm is setter data for confirm
 * @example
 * <ConfirmDialog confirm={confirm} setConfirm={setConfirm}/>
 */
const ConfirmDialog = ({ confirm, setConfirm }) => {
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
                <Button
                    color="success"
                    variant="contained"
                    onClick={confirm.onConfirm}
                >
                    OK
                </Button>
                <Button
                    color="warning"
                    variant="outlined"
                    onClick={() => setConfirm({ ...confirm, isOpen: false })}
                >
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

ConfirmDialog.displayName = "ConfirmDialog";

ConfirmDialog.propTypes = {
    confirm: PropTypes.object,
    setConfirm: PropTypes.func,
};

export default ConfirmDialog;
