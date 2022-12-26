import { ArticleOutlined, CloudUploadOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPageName } from "../../common/nameApp";
import CoverLetterModal from "./CoverLetterModal";
import TableMyCV from "./TableMyCV";
import {
    editCoverLetterThunk,
    getProfileThunk,
    uploadNewCVThunk,
} from "./profile.slice";
import "./CVManagement.css";
import useNotify from "../../hook/useNotify";
import { UploadFileDialog } from "../../components";

const CVManagement = () => {
    const dispatch = useDispatch();
    const { setNotify } = useNotify();
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
        title: "Đăng tải CV mới",
        acceptExtensionFiles: ["docx", "doc", "pdf"],
        multiple: false,
        onUpload: async (file) => {
            const resultDispatch = await dispatch(
                uploadNewCVThunk(file[0])
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
                <Box sx={{ width: "100%" }}>
                    <div className="d-flex space-btw">
                        <div className="d-flex ">
                            <Button
                                variant="contained"
                                color="warning"
                                startIcon={<ArticleOutlined />}
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
                <TableMyCV />
                <CoverLetterModal
                    coverLetterDialog={coverLetterDialog}
                    setCoverLetterDialog={setCoverLetterDialog}
                />
                <UploadFileDialog
                    uploadDialog={uploadCVDialog}
                    setUploadDialog={setUploadCVDialog}
                />
            </Container>
        </>
    );
};

CVManagement.displayName = "CVManagement";

export default CVManagement;
