import { CloudUploadOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPageName } from "../../common/nameApp";
import CoverLetterModal from "./CoverLetterModal";
import ListMyCV from "./ListMyCV";
import {
    editCoverLetterThunk,
    getProfileThunk,
    uploadNewCVThunk,
} from "./profile.slice";
import UploadCVModal from "./UploadCVModal";
import "./CVManagement.css";
import { notificationActions } from "../../components/Notification/notification.slice";

const CVManagement = () => {
    const dispatch = useDispatch();
    const setNotify = (obj) => {
        dispatch(notificationActions.setNotify(obj));
    };
    const [coverLetterDialog, setCoverLetterDialog] = useState({
        isOpen: false,
        onOK: async (text) => {
            let obj = {
                CoverLetter: text,
            };
            const result = await dispatch(editCoverLetterThunk(obj)).unwrap();
            setNotify({
                isOpen: true,
                message: result.message,
                type: result.isSuccess ? "success" : "error",
                title: "Chỉnh sửa thư giới thiệu",
            });
            if (result.isSuccess) {
                setCoverLetterDialog({
                    ...coverLetterDialog,
                    isOpen: false,
                });
            }
        },
    });

    const [uploadCVDialog, setUploadCVDialog] = useState({
        isOpen: false,
        onUpload: async (file) => {
            const resultDispatch = await dispatch(
                uploadNewCVThunk(file)
            ).unwrap();
            setNotify({
                isOpen: true,
                message: resultDispatch.message,
                title: "Đăng tải CV mới",
                type: resultDispatch.isSuccess ? "success" : "error",
            });
            if (resultDispatch.isSuccess) {
                setUploadCVDialog({
                    ...uploadCVDialog,
                    isOpen: false,
                });
            }
        },
    });
    const handleOpenCoverLetterDialog = () => {
        setCoverLetterDialog({
            ...coverLetterDialog,
            isOpen: true,
        });
    };
    useEffect(() => {
        document.title = getPageName("Quản lý CV");
        dispatch(getProfileThunk());
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
                <UploadCVModal
                    uploadCVDialog={uploadCVDialog}
                    setUploadCVDialog={setUploadCVDialog}
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
                                onClick={() =>
                                    setUploadCVDialog({
                                        ...uploadCVDialog,
                                        isOpen: true,
                                    })
                                }
                            >
                                Tải CV lên
                            </Button>
                        </div>
                    </div>
                </Box>
                <ListMyCV />
            </Container>
        </>
    );
};

CVManagement.displayName = "CVManagement";

export default CVManagement;
