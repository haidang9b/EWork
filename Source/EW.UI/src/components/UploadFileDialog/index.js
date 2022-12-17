import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
} from "@mui/material";
import { func, object } from "prop-types";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./uploadfiledialog.css";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Dialog Upload file with UI Dialog
 * @param uploadDialog data: isOpen, onUpload, acceptant files,...
 * @param setUploadDialog setter of uploadDialog
 * @returns Upload file dialog component
 */

const UploadFileDialog = ({ uploadDialog, setUploadDialog }) => {
    const fileValidator = (file) => {
        const acceptExtensionFiles = [...uploadDialog.acceptExtensionFiles];
        const ext = file.name.split(".").pop();
        if (!acceptExtensionFiles.includes(ext)) {
            return {
                code: "file-invalid",
                message: `Hệ thống chỉ chấp nhập các loại file ${acceptExtensionFiles.join(
                    ", "
                )}`,
            };
        }
    };

    const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
        useDropzone({
            validator: fileValidator,
            multiple: uploadDialog?.multiple,
        });

    const files = useCallback(
        (acceptedFiles) =>
            acceptedFiles.map((file) => (
                <li key={file.path} className="acceptant">
                    {file.path} - {file.size} bytes
                </li>
            )),
        []
    );
    const fileRejectionItems = useCallback(
        (fileRejections) =>
            fileRejections.map(({ file, errors }) => (
                <li key={file.path} className="reject-file-item">
                    {file.path} - {file.size} bytes
                    <ul className="error file-error-description">
                        {errors.map((e) => (
                            <li key={e.code}>{e.message}</li>
                        ))}
                    </ul>
                </li>
            )),
        []
    );

    const handleClose = () => {
        setUploadDialog({
            ...uploadDialog,
            isOpen: false,
        });
    };

    return (
        <Dialog
            open={uploadDialog.isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            maxWidth={"md"}
            fullWidth
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{uploadDialog.title}</DialogTitle>
            <DialogContent>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p className="file-drop">Drop the files here ...</p>
                </div>
                <aside>
                    <ul>{files(acceptedFiles)}</ul>
                    <ul>{fileRejectionItems(fileRejections)}</ul>
                </aside>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={async () => {
                        await uploadDialog.onUpload(acceptedFiles);
                    }}
                    fullWidth
                    color="success"
                    disabled={
                        fileRejections.length > 0 || acceptedFiles.length === 0
                    }
                >
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
};

UploadFileDialog.displayName = "UploadFileDialog";

UploadFileDialog.propsType = {
    uploadDialog: object.isRequired,
    setUploadDialog: func.isRequired,
};

export default UploadFileDialog;
