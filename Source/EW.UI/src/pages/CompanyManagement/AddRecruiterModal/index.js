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
import { Stack } from "@mui/system";
import { func, object } from "prop-types";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValidateEmail, ValidatePhoneNumber } from "../../../common/validator";
import useNotify from "../../../hook/useNotify";
import { assignRecruiterThunk, recruiterSelector } from "../recruiter.slice";

const DEFAULT_VALUE_COMPANY = -1;

const AddRecruiterModal = ({ addRecruiterModal, setAddRecruiterModal }) => {
    const dispatch = useDispatch();
    const recruiter = useSelector(recruiterSelector);
    const [companySelected, setCompanySelected] = useState(
        DEFAULT_VALUE_COMPANY
    );
    const { setNotify } = useNotify();
    const fullnameRef = useRef(null);
    const positionRef = useRef(null);
    const emailRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const handleClose = async () => {
        setAddRecruiterModal({
            ...addRecruiterModal,
            isOpen: false,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fullnameRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập họ và tên",
                type: "error",
                title: "Tạo tài khoản nhà tuyển dụng",
            });
            fullnameRef.current.focus();
            return;
        } else if (positionRef.current.value?.length < 2) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập chức vụ",
                type: "error",
                title: "Tạo tài khoản nhà tuyển dụng",
            });
            positionRef.current.focus();
            return;
        } else if (!ValidatePhoneNumber(phoneNumberRef.current.value)) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập số điện thoại hợp lệ",
                type: "error",
                title: "Tạo tài khoản nhà tuyển dụng",
            });
            phoneNumberRef.current.focus();
            return;
        } else if (!ValidateEmail(emailRef.current?.value)) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập email công ty hợp lệ",
                type: "error",
                title: "Tạo tài khoản nhà tuyển dụng",
            });
            emailRef.current.focus();
            return;
        } else if (usernameRef.current.value?.length < 2) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập tên đăng nhập hợp lệ",
                type: "error",
                title: "Tạo tài khoản nhà tuyển dụng",
            });
            usernameRef.current.focus();
            return;
        } else if (passwordRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập mật khẩu hợp lệ",
                type: "error",
                title: "Tạo tài khoản nhà tuyển dụng",
            });
            passwordRef.current.focus();
            return;
        } else if (confirmPasswordRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập xác nhận nhập mật khẩu hợp lệ",
                type: "error",
                title: "Tạo tài khoản nhà tuyển dụng",
            });
            confirmPasswordRef.current.focus();
            return;
        } else if (
            confirmPasswordRef.current.value !== passwordRef.current.value
        ) {
            setNotify({
                isOpen: true,
                message: "Mật khẩu và xác minh mật khẩu không khớp",
                type: "error",
                title: "Tạo tài khoản nhà tuyển dụng",
            });
            confirmPasswordRef.current.focus();
            return;
        } else if (companySelected === DEFAULT_VALUE_COMPANY) {
            setNotify({
                isOpen: true,
                message: "Vui lòng chọn công ty làm việc",
                type: "error",
                title: "Tạo tài khoản nhà tuyển dụng",
            });
            return;
        }

        let data = {
            FullName: fullnameRef.current.value,
            Position: positionRef.current.value,
            PhoneNumber: phoneNumberRef.current.value,
            Email: emailRef.current.value,
            Username: usernameRef.current.value,
            Password: passwordRef.current.value,
            CompanyId: companySelected,
        };
        let resultDispatch = await dispatch(
            assignRecruiterThunk(data)
        ).unwrap();

        setNotify({
            isOpen: true,
            message: resultDispatch.message,
            type: resultDispatch.isSuccess ? "success" : "error",
            title: "Tạo tài khoản nhà tuyển dụng",
        });
        handleClose();
    };
    return (
        <Dialog
            open={addRecruiterModal.isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <form>
                <DialogTitle>Thêm nhà tuyển dụng mới</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Họ và tên"
                        variant="outlined"
                        placeholder="Họ và tên"
                        fullWidth
                        required
                        sx={{
                            marginTop: "16px",
                            paddingBottom: "8px",
                        }}
                        inputRef={fullnameRef}
                    />
                    <TextField
                        label="Chức vụ"
                        variant="outlined"
                        placeholder="Chức vụ"
                        fullWidth
                        required
                        sx={{
                            marginTop: "16px",
                            paddingBottom: "8px",
                        }}
                        inputRef={positionRef}
                    />
                    <Stack
                        sx={{
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },

                            marginTop: "16px",
                            paddingBottom: "8px",
                        }}
                    >
                        <TextField
                            label="Số điện thoại"
                            variant="outlined"
                            placeholder="Số điện thoại"
                            required
                            inputRef={phoneNumberRef}
                            sx={{
                                minWidth: {
                                    xs: "100%",
                                    md: "40%",
                                },
                                paddingRight: {
                                    md: "6px",
                                },
                            }}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            placeholder="Email công ty"
                            required
                            inputRef={emailRef}
                            sx={{
                                minWidth: {
                                    xs: "100%",
                                    md: "60%",
                                },
                            }}
                            type="email"
                        />
                    </Stack>
                    <TextField
                        label="Tài khoản"
                        variant="outlined"
                        placeholder="Tài khoản đăng nhập"
                        fullWidth
                        required
                        sx={{
                            marginTop: "16px",
                            paddingBottom: "8px",
                        }}
                        inputRef={usernameRef}
                    />

                    <TextField
                        label="Mật khẩu"
                        variant="outlined"
                        placeholder="Mật khẩu đăng nhập"
                        fullWidth
                        required
                        sx={{
                            marginTop: "16px",
                            paddingBottom: "8px",
                        }}
                        inputRef={passwordRef}
                        type="password"
                    />

                    <TextField
                        label="Nhập lại mật khẩu"
                        variant="outlined"
                        placeholder="Nhập lại mật khẩu đăng nhập"
                        fullWidth
                        required
                        sx={{
                            marginTop: "16px",
                            paddingBottom: "8px",
                        }}
                        inputRef={confirmPasswordRef}
                        type="password"
                    />
                    <InputLabel id="company-selected-item">
                        Công ty làm việc
                    </InputLabel>
                    <Select
                        labelId="company-selected-item"
                        label="Công ty làm việc"
                        fullWidth={true}
                        value={companySelected}
                        onChange={(e) => {
                            setCompanySelected(e.target.value);
                        }}
                    >
                        <MenuItem value={DEFAULT_VALUE_COMPANY}>
                            <em>Chọn công ty</em>
                        </MenuItem>
                        {recruiter?.companies?.map((item) => (
                            <MenuItem
                                value={item.id}
                                key={JSON.stringify(item)}
                            >
                                {item.companyName} - {item.address}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        fullWidth={true}
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
            </form>
        </Dialog>
    );
};

AddRecruiterModal.displayName = "AddRecruiterModal";
AddRecruiterModal.propTypes = {
    addRecruiterModal: object.isRequired,
    setAddRecruiterModal: func.isRequired,
};
export default AddRecruiterModal;
