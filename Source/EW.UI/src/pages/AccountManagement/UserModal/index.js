import React, { useRef } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    TextField,
} from "@mui/material";
import { ValidateEmail, ValidatePhoneNumber } from "../../../common/validator";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addNewAccountAdminThunk } from "../users.slice";
import { notificationActions } from "../../../components/Notification/notification.slice";

const UserDialog = ({ userDialog, setUserDialog }) => {
    const dispatch = useDispatch();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const fullnameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const emailRef = useRef(null);
    const setNotify = (obj) => {
        dispatch(notificationActions.setNotify(obj));
    };
    const handleSubmit = async () => {
        if (usernameRef.current.value?.length === 0) {
            setNotify({
                isOpen: true,
                type: "error",
                title: "Thêm tài khoản cấp khoa",
                message: "Vui lòng nhập Tên người dùng",
            });
        } else if (passwordRef.current.value?.length === 0) {
            setNotify({
                isOpen: true,
                type: "error",
                title: "Thêm tài khoản cấp khoa",
                message: "Vui lòng nhập mật khẩu",
            });
        } else if (!ValidatePhoneNumber(phoneNumberRef.current.value)) {
            setNotify({
                isOpen: true,
                type: "error",
                title: "Thêm tài khoản cấp khoa",
                message: "Vui lòng nhập số điện thoại hợp lệ",
            });
        } else if (!ValidateEmail(emailRef.current.value)) {
            setNotify({
                isOpen: true,
                type: "error",
                title: "Thêm tài khoản cấp khoa",
                message: "Vui lòng nhập email hợp lệ",
            });
        } else if (fullnameRef.current.value?.length === 0) {
            setNotify({
                isOpen: true,
                type: "error",
                title: "Thêm tài khoản cấp khoa",
                message: "Vui lòng nhập tên",
            });
        } else {
            let obj = {
                Username: usernameRef.current.value,
                Password: passwordRef.current.value,
                NumberPhone: phoneNumberRef.current.value,
                Email: emailRef.current.value,
                FullName: fullnameRef.current.value,
            };

            const resultDispatch = await dispatch(
                addNewAccountAdminThunk(obj)
            ).unwrap();
            setNotify({
                isOpen: true,
                title: "Thêm tài khoản cấp khoa",
                message: resultDispatch.message,
                type: resultDispatch.isSuccess ? "success" : "error",
            });
            setUserDialog({
                ...userDialog,
                isOpen: false,
            });
        }
    };
    return (
        <Dialog
            open={userDialog.isOpen}
            onClose={() => setUserDialog({ ...userDialog, isOpen: false })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>{userDialog.title}</DialogTitle>
            <DialogContent>
                <InputLabel id="select-role">Quyền</InputLabel>
                <TextField
                    label="Quyền"
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginTop: "16px",
                        paddingBottom: "8px",
                    }}
                    inputRef={usernameRef}
                    disabled={true}
                    value={"Faculty"}
                />
                <TextField
                    label="Tên tài khoản"
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginTop: "16px",
                        paddingBottom: "8px",
                    }}
                    inputRef={usernameRef}
                    required
                />
                <TextField
                    label="Mật khẩu"
                    variant="outlined"
                    type="password"
                    fullWidth
                    sx={{
                        paddingBottom: "8px",
                    }}
                    inputRef={passwordRef}
                    required
                />
                <TextField
                    label="Số điện thoại"
                    variant="outlined"
                    fullWidth
                    sx={{
                        paddingBottom: "8px",
                    }}
                    inputRef={phoneNumberRef}
                    required
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    type="email"
                    sx={{
                        paddingBottom: "8px",
                    }}
                    inputRef={emailRef}
                    required
                />
                <TextField
                    label="Họ và tên"
                    variant="outlined"
                    fullWidth
                    sx={{
                        paddingBottom: "8px",
                    }}
                    inputRef={fullnameRef}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" fullWidth onClick={handleSubmit}>
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

UserDialog.displayName = "UserDialog";

UserDialog.propTypes = {
    userDialog: PropTypes.object.isRequired,
    setUserDialog: PropTypes.func.isRequired,
};

export default UserDialog;
