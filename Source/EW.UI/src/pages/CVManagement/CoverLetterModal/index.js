import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { documentSelector } from "../document.slice";
import { RichTextEditor } from "../../../components";
import PropTypes from "prop-types";
import { Status } from "../../../common/constants";
import { Stack } from "@mui/system";

const CoverLetterModal = ({ coverLetterDialog, setCoverLetterDialog }) => {
    const { status, coverLetter } = useSelector(documentSelector);
    const [editor, setEditor] = useState();

    return (
        <Dialog
            open={coverLetterDialog.isOpen}
            onClose={() =>
                setCoverLetterDialog({ ...coverLetterDialog, isOpen: false })
            }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                <Typography variant="h6" component={"div"}>
                    Thư giới thiệu(Cover Letter)
                </Typography>
            </DialogTitle>

            <DialogContent>
                <RichTextEditor
                    editor={editor}
                    setEditor={setEditor}
                    initialHTML={coverLetter}
                />
            </DialogContent>
            <DialogActions>
                <Stack minWidth="100%">
                    <Button
                        disabled={status === Status.loading}
                        variant="contained"
                        onClick={async () => {
                            const text = editor?.root?.innerHTML;
                            return await coverLetterDialog.onOK(text);
                        }}
                        fullWidth
                        color="success"
                    >
                        Cập nhật
                    </Button>
                    <LinearProgress
                        color="success"
                        sx={{
                            display:
                                status === Status.loading ? "block" : "none",
                        }}
                    />
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

CoverLetterModal.displayName = "CoverLetterModal";

CoverLetterModal.propTypes = {
    coverLetterDialog: PropTypes.object.isRequired,
    setCoverLetterDialog: PropTypes.func.isRequired,
};

export default CoverLetterModal;
