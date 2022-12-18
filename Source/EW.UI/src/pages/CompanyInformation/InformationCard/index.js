import { Edit, Email, Phone, Place, Work } from "@mui/icons-material";
import { Button, Card, IconButton, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    companyInformationSelector,
    editProfileCompanyInformationThunk,
} from "../companyInformation.slice";
import useNotify from "../../../hook/useNotify";
import "../companyinformation.css";

const InformationCard = () => {
    const dispatch = useDispatch();
    const { setNotify } = useNotify();
    const [isEditing, setIsEditing] = useState(false);
    const { information } = useSelector(companyInformationSelector);
    const companyNameRef = useRef();
    const addressRef = useRef();
    const taxNumberRef = useRef();
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
            id: information?.id,
            status: information?.status,
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
                        <td className="header-row">Tên doanh nghiệp</td>
                        <td>
                            {isEditing ? (
                                <TextField
                                    label="Tên công ty"
                                    placeholder="Nhập tên công ty"
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        marginTop: "16px",
                                        paddingBottom: "8px",
                                    }}
                                    defaultValue={information?.companyName}
                                    inputRef={companyNameRef}
                                    required
                                />
                            ) : (
                                information?.companyName
                            )}
                        </td>
                        <td>
                            <IconButton
                                onClick={handleEdit}
                                sx={{
                                    display: isEditing ? "none" : "block",
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
                        <td className="header-row">Email công ty</td>
                        <td>
                            {isEditing ? (
                                <TextField
                                    label="Email công ty"
                                    placeholder="Nhập email công ty"
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        marginTop: "16px",
                                        paddingBottom: "8px",
                                    }}
                                    defaultValue={information?.email}
                                    disabled={true}
                                />
                            ) : (
                                information?.email
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Phone color="action" />
                        </td>
                        <td className="header-row">Số điện thoại công ty</td>
                        <td>
                            {isEditing ? (
                                <TextField
                                    label="Số điện thoại công ty"
                                    placeholder="Nhập số điện thoại công ty"
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        marginTop: "16px",
                                        paddingBottom: "8px",
                                    }}
                                    defaultValue={information?.phoneNumber}
                                    disabled={true}
                                />
                            ) : (
                                information?.phoneNumber
                            )}
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <Place color="action" />
                        </td>
                        <td className="header-row">Địa chỉ</td>
                        <td>
                            {isEditing ? (
                                <TextField
                                    label="Địa chỉ công ty"
                                    placeholder="Nhập địa chỉ công ty"
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        marginTop: "16px",
                                        paddingBottom: "8px",
                                    }}
                                    defaultValue={information?.address}
                                    inputRef={addressRef}
                                    required
                                />
                            ) : (
                                information?.address
                            )}
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <Place color="action" />
                        </td>
                        <td className="header-row">Mã số thuế</td>
                        <td>
                            {isEditing ? (
                                <TextField
                                    label="Mã số thuê"
                                    placeholder="Nhập mã số thuê công ty"
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        marginTop: "16px",
                                        paddingBottom: "8px",
                                    }}
                                    defaultValue={information?.taxNumber}
                                    inputRef={taxNumberRef}
                                    required
                                />
                            ) : (
                                information?.taxNumber
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
                                            marginRight: "4px",
                                        }}
                                        onClick={handleSubmit}
                                    >
                                        Lưu
                                    </Button>
                                    <Button
                                        onClick={handleCloseEdit}
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
    );
};

InformationCard.displayName = "InformationCard";

export default InformationCard;
