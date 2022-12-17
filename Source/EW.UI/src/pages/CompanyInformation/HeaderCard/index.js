import React, { useState } from "react";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Typography,
} from "@mui/material";
import useAuth from "../../../hook/useAuth";
import { useSelector } from "react-redux";
import { companyInformationSelector } from "../companyInformation.slice";
import { Status } from "../../../common/constants";
import { UploadFileDialog } from "../../../components";

const HeaderCard = () => {
    const [uploadDialog, setUploadDialog] = useState({
        isOpen: false,
        title: "Thay đổi ảnh đại diện",
        acceptExtensionFiles: ["jpg", "jpeg", "apng", "png", "svg", "webp"],
        onUpload: (file) => {
            console.log(file);
        },
    });
    const { user } = useAuth();
    const companyInformation = useSelector(companyInformationSelector);

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
                        user?.certthumbprint
                            ? user?.certthumbprint
                            : "/static/images/avatar/2.jpg"
                    }
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
                    {companyInformation.status === Status.loading
                        ? "Loading"
                        : companyInformation?.information?.companyName}
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
