import { CloudUploadOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPageName } from "../../common/nameApp";
import Notification from "../../components/Notification";
import CoverLetterModal from "./CoverLetterModal";

import "./CVManagement.css";
import ListMyCV from "./ListMyCV";
import {
    editCoverLetterThunk,
    getProfileThunk,
    uploadNewCVThunk,
} from "./profile.slice";
import UploadCVModal from "./UploadCVModal";

const CVManagement = () => {
    const dispatch = useDispatch();
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
            const result = await dispatch(editCoverLetterThunk(obj)).unwrap();
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
            const resultDispatch = await dispatch(
                uploadNewCVThunk(file)
            ).unwrap();
            setNotify({
                ...notify,
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
                <ListMyCV notify={notify} setNotify={setNotify} />
                <Notification notify={notify} setNotify={setNotify} />
            </Container>
        </>
    );
};
export default CVManagement;
