import { Edit, Email, Phone, Place, Work } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    TextField,
    Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../common/constants";
import { SkeletonProfile } from "../../components";
import useAuth from "../../hook/useAuth";
import {
    companyInformationSelector,
    editProfileCompanyInformationThunk,
    getCompanyInformationThunk,
} from "./companyInformation.slice";

import "./companyinformation.css";
import useNotify from "../../hook/useNotify";
const CompanyInformation = () => {
    const dispatch = useDispatch();
    const { setNotify } = useNotify();
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const companyInformation = useSelector(companyInformationSelector);
    const companyNameRef = useRef();
    const addressRef = useRef();
    const taxNumberRef = useRef();
    useEffect(() => {
        dispatch(getCompanyInformationThunk());
    }, [dispatch]);
    const handleEdit = () => {
        if (isEditing) {
            return;
        }
        setIsEditing(true);
    };
    const handleCloseEdit = () => {
        setIsEditing(false);
    };
    const handleSubmit = async () => {
        if (companyNameRef?.current.value.length < 6) {
            setNotify({
                isOpen: true,
                title: "Cập nhật công ty",
                message: "Vui lòng nhập tên công ty hợp lệ",
                type: "error",
            });
            return;
        } else if (addressRef?.current.value.length < 6) {
            setNotify({
                isOpen: true,
                title: "Cập nhật công ty",
                message: "Vui lòng nhập địa chỉ công ty hợp lệ",
                type: "error",
            });
            return;
        } else if (taxNumberRef?.current.value.length < 6) {
            setNotify({
                isOpen: true,
                title: "Cập nhật công ty",
                message: "Vui lòng nhập mã số thuê hợp lệ",
                type: "error",
            });
            return;
        }
        let obj = {
            id: companyInformation?.information?.id,
            status: companyInformation?.information?.status,
            companyName: companyNameRef?.current.value,
            address: addressRef?.current.value,
            taxNumber: taxNumberRef?.current.value,
        };
        let resultDispatch = await dispatch(
            editProfileCompanyInformationThunk(obj)
        ).unwrap();
        setNotify({
            isOpen: true,
            title: "Cập nhật thông tin công ty",
            type: resultDispatch.isSuccess ? "success" : "error",
            message: resultDispatch.message,
        });
        setIsEditing(false);
    };
    return (
        <>
            {companyInformation.status === Status.loading ? (
                <SkeletonProfile />
            ) : (
                <Container>
                    <Box width="100%">
                        <Box>
                            <Card
                                sx={{
                                    textAlign: "Center",
                                    marginTop: "4px",
                                }}
                            >
                                <CardHeader>Thông tin công ty </CardHeader>
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
                                        {companyInformation.status ===
                                        Status.loading
                                            ? "Loading"
                                            : companyInformation?.information
                                                  ?.companyName}
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card
                                sx={{
                                    marginTop: "20px",
                                }}
                            >
                                <table className="table-content">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Work color="action" />
                                            </td>
                                            <td className="header-row">
                                                Tên doanh nghiệp
                                            </td>
                                            <td>
                                                {isEditing ? (
                                                    <TextField
                                                        label="Tên công ty"
                                                        placeholder="Nhập tên công ty"
                                                        fullWidth
                                                        variant="outlined"
                                                        sx={{
                                                            marginTop: "16px",
                                                            paddingBottom:
                                                                "8px",
                                                        }}
                                                        defaultValue={
                                                            companyInformation
                                                                ?.information
                                                                ?.companyName
                                                        }
                                                        inputRef={
                                                            companyNameRef
                                                        }
                                                        required
                                                    />
                                                ) : (
                                                    companyInformation
                                                        ?.information
                                                        ?.companyName
                                                )}
                                            </td>
                                            <td>
                                                <IconButton
                                                    onClick={handleEdit}
                                                    sx={{
                                                        display: isEditing
                                                            ? "none"
                                                            : "block",
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Email color="action" />
                                            </td>
                                            <td className="header-row">
                                                Email công ty
                                            </td>
                                            <td>
                                                {isEditing ? (
                                                    <TextField
                                                        label="Email công ty"
                                                        placeholder="Nhập email công ty"
                                                        fullWidth
                                                        variant="outlined"
                                                        sx={{
                                                            marginTop: "16px",
                                                            paddingBottom:
                                                                "8px",
                                                        }}
                                                        defaultValue={
                                                            companyInformation
                                                                ?.information
                                                                ?.email
                                                        }
                                                        disabled={true}
                                                    />
                                                ) : (
                                                    companyInformation
                                                        ?.information?.email
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Phone color="action" />
                                            </td>
                                            <td className="header-row">
                                                Số điện thoại công ty
                                            </td>
                                            <td>
                                                {isEditing ? (
                                                    <TextField
                                                        label="Số điện thoại công ty"
                                                        placeholder="Nhập số điện thoại công ty"
                                                        fullWidth
                                                        variant="outlined"
                                                        sx={{
                                                            marginTop: "16px",
                                                            paddingBottom:
                                                                "8px",
                                                        }}
                                                        defaultValue={
                                                            companyInformation
                                                                ?.information
                                                                ?.phoneNumber
                                                        }
                                                        disabled={true}
                                                    />
                                                ) : (
                                                    companyInformation
                                                        ?.information
                                                        ?.phoneNumber
                                                )}
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Place color="action" />
                                            </td>
                                            <td className="header-row">
                                                Địa chỉ
                                            </td>
                                            <td>
                                                {isEditing ? (
                                                    <TextField
                                                        label="Địa chỉ công ty"
                                                        placeholder="Nhập địa chỉ công ty"
                                                        fullWidth
                                                        variant="outlined"
                                                        sx={{
                                                            marginTop: "16px",
                                                            paddingBottom:
                                                                "8px",
                                                        }}
                                                        defaultValue={
                                                            companyInformation
                                                                ?.information
                                                                ?.address
                                                        }
                                                        inputRef={addressRef}
                                                        required
                                                    />
                                                ) : (
                                                    companyInformation
                                                        ?.information?.address
                                                )}
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Place color="action" />
                                            </td>
                                            <td className="header-row">
                                                Mã số thuế
                                            </td>
                                            <td>
                                                {isEditing ? (
                                                    <TextField
                                                        label="Mã số thuê"
                                                        placeholder="Nhập mã số thuê công ty"
                                                        fullWidth
                                                        variant="outlined"
                                                        sx={{
                                                            marginTop: "16px",
                                                            paddingBottom:
                                                                "8px",
                                                        }}
                                                        defaultValue={
                                                            companyInformation
                                                                ?.information
                                                                ?.taxNumber
                                                        }
                                                        inputRef={taxNumberRef}
                                                        required
                                                    />
                                                ) : (
                                                    companyInformation
                                                        ?.information?.taxNumber
                                                )}
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                {isEditing && (
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            sx={{
                                                                marginRight:
                                                                    "4px",
                                                            }}
                                                            onClick={
                                                                handleSubmit
                                                            }
                                                        >
                                                            Lưu
                                                        </Button>
                                                        <Button
                                                            onClick={
                                                                handleCloseEdit
                                                            }
                                                            variant="outlined"
                                                            color="primary"
                                                        >
                                                            Hủy
                                                        </Button>
                                                    </>
                                                )}
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card>
                        </Box>
                    </Box>
                </Container>
            )}
        </>
    );
};

export default CompanyInformation;
