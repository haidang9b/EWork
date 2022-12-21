import {
    AttachMoney,
    Edit,
    Email,
    Group,
    Info,
    Language,
    Phone,
    Place,
    Settings,
    Work,
} from "@mui/icons-material";
import {
    Button,
    Card,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    companyInformationSelector,
    editProfileCompanyInformationThunk,
} from "../companyInformation.slice";
import useNotify from "../../../hook/useNotify";
import "../companyinformation.css";
import { CountrySelector, RichTextEditor } from "../../../components";
import { CompanyType, TeamSizeType } from "../../../common/constants";
import countryList from "../../../common/countryList";

const DEFAULT_VALUE_COUNTRY = "VN";

const InformationCard = () => {
    const dispatch = useDispatch();
    const { setNotify } = useNotify();
    const [isEditing, setIsEditing] = useState(false);
    const { information } = useSelector(companyInformationSelector);
    const companyNameRef = useRef();
    const addressRef = useRef();
    const taxNumberRef = useRef();
    const teamSizeRef = useRef();
    const companyTypeRef = useRef();
    const [country, setCountry] = useState(DEFAULT_VALUE_COUNTRY);
    const [editor, setEditor] = useState(null);
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
            companyNameRef.current.focus();
            return;
        } else if (addressRef?.current.value.length < 6) {
            setNotify({
                isOpen: true,
                title: "Cập nhật công ty",
                message: "Vui lòng nhập địa chỉ công ty hợp lệ",
                type: "error",
            });
            addressRef.current.focus();
            return;
        } else if (taxNumberRef?.current.value.length < 6) {
            setNotify({
                isOpen: true,
                title: "Cập nhật công ty",
                message: "Vui lòng nhập mã số thuê hợp lệ",
                type: "error",
            });
            taxNumberRef.current.focus();
            return;
        } else if (country.length === 0) {
            setNotify({
                isOpen: true,
                title: "Cập nhật công ty",
                message: "Vui lòng chọn quốc gia hợp lệ",
                type: "error",
            });
            return;
        }
        let obj = {
            country,
            id: information?.id,
            status: information?.status,
            companyName: companyNameRef?.current.value,
            address: addressRef?.current.value,
            taxNumber: taxNumberRef?.current.value,
            teamSize: teamSizeRef?.current.value,
            companyType: companyTypeRef?.current.value,
            description: editor?.root.innerHTML,
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
    useEffect(() => {
        setCountry(information?.country);
    }, [information]);
    return (
        <Card
            sx={{
                marginTop: "20px",
            }}
        >
            <table className="infor-company__table">
                <tbody>
                    <tr>
                        <td>
                            <Work color="action" />
                        </td>
                        <td className="infor-company__header">
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
                        <td className="infor-company__header">Email công ty</td>
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
                        <td className="infor-company__header">
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
                        <td className="infor-company__header">Địa chỉ</td>
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
                            <AttachMoney color="action" />
                        </td>
                        <td className="infor-company__header">Mã số thuế</td>
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
                        <td>
                            <Language color="action" />
                        </td>
                        <td className="infor-company__header">Quốc gia</td>
                        <td>
                            {isEditing ? (
                                <CountrySelector
                                    country={country}
                                    setCountry={setCountry}
                                />
                            ) : (
                                countryList().getLabel(information?.country)
                            )}
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <Group color="action" />
                        </td>
                        <td className="infor-company__header">Số nhân viên</td>
                        <td>
                            {isEditing ? (
                                <>
                                    <InputLabel id="company-size-selected-item">
                                        Số nhân viên
                                    </InputLabel>
                                    <Select
                                        labelId="company-size-selected-item"
                                        label="Số nhân viên"
                                        defaultValue={information?.teamSize}
                                        fullWidth
                                        sx={{
                                            marginBottom: "16px",
                                        }}
                                        inputRef={teamSizeRef}
                                    >
                                        {TeamSizeType.map((item) => (
                                            <MenuItem
                                                key={JSON.stringify(item)}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </>
                            ) : (
                                TeamSizeType.find(
                                    (item) =>
                                        item.value === information?.teamSize
                                )?.label
                            )}
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <Settings color="action" />
                        </td>
                        <td className="infor-company__header">
                            Loại hình công ty
                        </td>
                        <td>
                            {isEditing ? (
                                <>
                                    <InputLabel id="company-type-selected-item">
                                        Loại hình công ty
                                    </InputLabel>
                                    <Select
                                        labelId="company-type-selected-item"
                                        label="Loại hình công ty"
                                        defaultValue={information?.companyType}
                                        inputRef={companyTypeRef}
                                        fullWidth
                                        sx={{
                                            marginBottom: "16px",
                                        }}
                                    >
                                        {CompanyType.map((item) => (
                                            <MenuItem
                                                key={JSON.stringify(item)}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </>
                            ) : (
                                CompanyType.find(
                                    (item) =>
                                        item.value === information?.companyType
                                )?.label
                            )}
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <Info color="action" />
                        </td>
                        <td className="infor-company__header">Mô tả</td>
                        <td>
                            {isEditing ? (
                                <>
                                    <RichTextEditor
                                        editor={editor}
                                        setEditor={setEditor}
                                        initialHTML={information?.description}
                                    />
                                </>
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: information?.description,
                                    }}
                                ></div>
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
