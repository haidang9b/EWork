import React, { useState } from "react";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    companyInformationSelector,
    uploadAvatarCompanyThunk,
} from "../companyInformation.slice";
import { Status } from "../../../common/constants";
import { UploadFileDialog } from "../../../components";
import useNotify from "../../../hook/useNotify";
import useFileUpload from "../../../hook/useFileUpload";

const HeaderCard = () => {
    const { getFilePathUpload } = useFileUpload();
    const { setNotify } = useNotify();
    const dispatch = useDispatch();
    const [uploadDialog, setUploadDialog] = useState({
        isOpen: false,
        title: "Thay đổi ảnh đại diện",
        mutliple: false,
        acceptExtensionFiles: ["jpg", "jpeg", "apng", "png", "svg", "webp"],
        onUpload: async (files) => {
            const resultDispatch = await dispatch(
                uploadAvatarCompanyThunk(files[0])
            ).unwrap();
            setNotify({
                isOpen: true,
                message: resultDispatch.message,
                title: "Đăng tải CV mới",
                type: resultDispatch.isSuccess ? "success" : "error",
            });
            if (resultDispatch.isSuccess) {
                setUploadDialog({
                    ...uploadDialog,
                    isOpen: false,
                });
            }
        },
    });
    const { status, information } = useSelector(companyInformationSelector);
    const handleChangeAvatar = () => {
        setUploadDialog({
            ...uploadDialog,
            isOpen: true,
        });
    };
    return (
        <Card
            sx={{
                textAlign: "Center",
                marginTop: "4px",
            }}
        >
            <CardHeader>Thông tin công ty</CardHeader>
            <CardContent
                sx={{
                    textAlign: "center",
                }}
            >
                <Avatar
                    alt="Avatar"
                    src={
                        information?.avatarUrl
                            ? `${getFilePathUpload(information?.avatarUrl)}`
                            : "/static/images/avatar/2.jpg"
                    }
                    loading="lazy"
                    sx={{
                        border: "solid 1px #f0f2f5",
                        height: {
                            md: "160px",
                            xs: "80px",
                        },
                        width: {
                            md: "160px",
                            xs: "80px",
                        },
                        margin: "auto",
                    }}
                />
                <Typography variant="h6">
                    {status === Status.loading
                        ? "Loading"
                        : information?.companyName}
                </Typography>
                <Button variant="outlined" onClick={handleChangeAvatar}>
                    Chỉnh sửa ảnh đại diện
                </Button>
            </CardContent>
            <UploadFileDialog
                uploadDialog={uploadDialog}
                setUploadDialog={setUploadDialog}
            />
        </Card>
    );
};

HeaderCard.displayName = "HeaderCard";

export default HeaderCard;
