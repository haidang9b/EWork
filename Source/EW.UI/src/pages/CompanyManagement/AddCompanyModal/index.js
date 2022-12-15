import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { func, object } from "prop-types";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CompanyStatus } from "../../../common/constants";
import { ValidateEmail, ValidatePhoneNumber } from "../../../common/validator";
import useNotify from "../../../hook/useNotify";
import { addCompanyThunk } from "../recruiter.slice";

const DEFAULT_VALUE_STATUS = 0;

const AddCompanyModal = ({ addCompanyModal, setAddCompanyModal }) => {
    const dispatch = useDispatch();
    const { setNotify } = useNotify();
    const [currentStatus, setCurrentStatus] = useState(DEFAULT_VALUE_STATUS);
    const companyNameRef = useRef();
    const phoneNumberRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();
    const taxNumberRef = useRef();
    const handleClose = () => {
        setAddCompanyModal({
            ...addCompanyModal,
            isOpen: false,
        });
    };

    const handleSubmit = async () => {
        if (companyNameRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                title: "Thêm công ty mới",
                message: "Vui lòng nhập tên công ty",
                type: "error",
            });
            companyNameRef.current.focus();
            return;
        }

        if (!ValidatePhoneNumber(phoneNumberRef.current?.value)) {
            setNotify({
                isOpen: true,
                title: "Thêm công ty mới",
                message: "Vui lòng nhập số điện thoại hợp lệ",
                type: "error",
            });
            phoneNumberRef.current.focus();
            return;
        }

        if (!ValidateEmail(emailRef.current?.value)) {
            setNotify({
                isOpen: true,
                title: "Thêm công ty mới",
                message: "Vui lòng nhập email hợp lệ",
                type: "error",
            });
            emailRef.current.focus();
            return;
        }
        if (addressRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                title: "Thêm công ty mới",
                message: "Vui lòng nhập địa chỉ công ty",
                type: "error",
            });
            addressRef.current.focus();
            return;
        }
        if (taxNumberRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                title: "Thêm công ty mới",
                message: "Vui lòng nhập mã số thuê công ty",
                type: "error",
            });
            taxNumberRef.current.focus();
            return;
        }
        let resultDispatch = await dispatch(
            addCompanyThunk({
                CompanyName: companyNameRef.current.value,
                PhoneNumber: phoneNumberRef.current.value,
                Email: emailRef.current.value,
                Address: addressRef.current.value,
                Status: currentStatus,
                TaxNumber: taxNumberRef.current.value,
            })
        ).unwrap();

        setNotify({
            isOpen: true,
            type: resultDispatch?.isSuccess ? "success" : "error",
            message: resultDispatch?.message,
            title: "Thêm công ty mới",
        });
        handleClose();
    };
    return (
        <Dialog
            open={addCompanyModal.isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Thêm công ty</DialogTitle>
            <DialogContent>
                <TextField
                    label="Tên công ty"
                    placeholder="Nhập tên công ty"
                    fullWidth
                    variant="outlined"
                    sx={{
                        marginTop: "16px",
                        paddingBottom: "8px",
                    }}
                    inputRef={companyNameRef}
                    required
                />
                <TextField
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại công ty"
                    fullWidth
                    variant="outlined"
                    sx={{
                        marginTop: "16px",
                        paddingBottom: "8px",
                    }}
                    inputRef={phoneNumberRef}
                    required
                />
                <TextField
                    label="Email công ty"
                    placeholder="Nhập email công ty"
                    fullWidth
                    variant="outlined"
                    sx={{
                        marginTop: "16px",
                        paddingBottom: "8px",
                    }}
                    inputRef={emailRef}
                    required
                    type="email"
                />
                <TextField
                    label="Địa chỉ công ty"
                    placeholder="Nhập địa chỉ công ty"
                    fullWidth
                    variant="outlined"
                    sx={{
                        marginTop: "16px",
                        paddingBottom: "8px",
                    }}
                    inputRef={addressRef}
                    required
                />
                <TextField
                    label="Mã số thuế"
                    placeholder="Nhập mã số thuê công ty"
                    fullWidth
                    variant="outlined"
                    sx={{
                        marginTop: "16px",
                        paddingBottom: "8px",
                    }}
                    inputRef={taxNumberRef}
                    required
                />
                <InputLabel id="status-add-company">Trạng thái</InputLabel>
                <Select
                    labelId="status-add-company"
                    id="demo-simple-select-required"
                    label="Trạng thái"
                    fullWidth={true}
                    value={currentStatus}
                    onChange={(e) => {
                        setCurrentStatus(e.target.value);
                    }}
                >
                    {CompanyStatus.map((item) => (
                        <MenuItem value={item.value} key={JSON.stringify(item)}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    onClick={handleSubmit}
                >
                    Thêm
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={handleClose}
                    fullWidth={true}
                >
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AddCompanyModal.displayName = "AddCompanyModal";

AddCompanyModal.propTypes = {
    addCompanyModal: object.isRequired,
    setAddCompanyModal: func.isRequired,
};

export default AddCompanyModal;
