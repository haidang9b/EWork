import { CloudUploadOutlined } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./CVManagement.css";
import { getProfile } from "./profile.slice";

const CoverLetterModal = (props) => {
    const { coverLetterDialog, setCoverLetterDialog } = props;
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
                <Typography variant="h6">
                    Thư giới thiệu(Cover Letter)
                </Typography>
                <small>
                    Hãy viết đoạn giới thiệu bản thân để gây ấn tượng với Nhà
                    tuyển dụng và tăng cơ hội với những vị trí công việc hấp
                    dẫn.
                </small>
            </DialogTitle>

            <DialogContent></DialogContent>
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
