import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./upload.css";
const UploadCVModal = (props) => {
    const { uploadCVDialog, setUploadCVDialog } = props;
    const [cv, setCV] = useState(null);
    const [error, setError] = useState("");
    const handleChangeFile = (e) => {
        const acceptExtensionFiles = ["docx", "doc", "pdf"];
        const file = Array.from(e.target.files)[0];
        const ext = file.name.split(".").pop();
        if (!acceptExtensionFiles.includes(ext)) {
            setError(
                `Hệ thống chỉ chấp nhập các loại file ${acceptExtensionFiles.join(
                    ", "
                )}`
            );
            setCV(null);
        } else {
            setError("");
            setCV(file);
        }
    };
    return (
        <>
            <Dialog
                open={uploadCVDialog.isOpen}
                onClose={() => {
                    setUploadCVDialog({
                        ...uploadCVDialog,
                        isOpen: false,
                    });
                }}
            >
                <DialogTitle>Upload CV mới</DialogTitle>
                <DialogContent>
                    <input
                        id="upload-cv"
                        type="file"
                        onChange={handleChangeFile}
                    />
                    {error.length > 0 && <p className="error">{error}</p>}
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        disabled={error.length > 0 && !cv}
                        onClick={async () => {
                            await uploadCVDialog.onUpload(cv);
                        }}
                    >
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
export default UploadCVModal;
