import { CloudUploadOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import CoverLetterModal from "./CoverLetterModal";

import "./CVManagement.css";
import ListMyCV from "./ListMyCV";
import {
    editCoverLetter,
    getProfile,
    profileSelector,
    uploadNewCV,
} from "./profile.slice";
import UploadCVModal from "./UploadCVModal";

const CVManagement = () => {
    const dispatch = useDispatch();
    const profile = useSelector(profileSelector);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "error",
    });
    const [coverLetterDialog, setCoverLetterDialog] = useState({
        isOpen: false,
        onOK: async (text) => {
            let obj = {
                CoverLetter: text,
            };
            const result = await dispatch(editCoverLetter(obj)).unwrap();
            setNotify({
                ...notify,
                isOpen: true,
                message: result.message,
                type: result.isSuccess ? "success" : "error",
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
            const result = await dispatch(uploadNewCV(file)).unwrap();
            console.log(result);
            setNotify({
                ...notify,
                isOpen: true,
                message: result.message,
                type: result.isSuccess ? "success" : "error",
            });
            if (result.isSuccess) {
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
                <Notification notify={notify} setNotify={setNotify} />
            </Container>
        </>
    );
};
export default CVManagement;
