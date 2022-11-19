import { CloudUploadOutlined } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import RichTextEditor from "../../components/RichTextEditor";

import "./CVManagement.css";
import { getProfile } from "./profile.slice";

const CoverLetterModal = (props) => {
    const { coverLetterDialog, setCoverLetterDialog } = props;
    const editorRef = useRef(null);
    return (
        <Dialog
            open={coverLetterDialog.isOpen}
            onClose={() =>
                setCoverLetterDialog({ ...coverLetterDialog, isOpen: false })
            }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
                <Typography variant="h6" component={"div"}>
                    Thư giới thiệu(Cover Letter)
                </Typography>
            </DialogTitle>

            <DialogContent>
                <RichTextEditor text={"test"} />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={() => {}}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const CVManagement = () => {
    const dispatch = useDispatch();
    const [coverLetterDialog, setCoverLetterDialog] = useState({
        isOpen: false,
        content: "",
    });

    const handleOpenCoverLetterDialog = () => {
        setCoverLetterDialog({
            ...coverLetterDialog,
            isOpen: true,
        });
    };
    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);
    return (
        <>
            <Container
                sx={{
                    marginTop: "2%",
                }}
            >
                <CoverLetterModal
                    coverLetterDialog={coverLetterDialog}
                    setCoverLetterDialog={setCoverLetterDialog}
                />
                <Box sx={{ width: "100%" }}>
                    <div className="d-flex space-btw">
                        <div className="d-flex ">
                            <Button
                                variant="outlined"
                                sx={{
                                    marginRight: "4px",
                                }}
                            >
                                Quản lý CV
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    marginLeft: "4px",
                                }}
                                onClick={handleOpenCoverLetterDialog}
                            >
                                Thư giới thiệu
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<CloudUploadOutlined />}
                            >
                                Tải CV lên
                            </Button>
                        </div>
                    </div>
                </Box>
            </Container>
        </>
    );
};
export default CVManagement;
