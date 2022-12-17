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
import { addNewAccountAdminThunk, editAccountThunk } from "../users.slice";
import useNotify from "../../../hook/useNotify";

const PASSWORD_DEFAULT = "************";

const UserDialog = ({ userDialog, setUserDialog }) => {
    const { setNotify } = useNotify();
    const dispatch = useDispatch();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const fullnameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const emailRef = useRef(null);

    const handleSubmit = async () => {
        if (usernameRef.current.value?.length === 0) {
            setNotify({
                isOpen: true,
                type: "error",
                title: "Thêm tài khoản cấp khoa",
                message: "Vui lòng nhập Tên người dùng",
            });
        } else if (
            passwordRef.current.value?.length === 0 &&
            !userDialog.isUpdate
        ) {
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
                username: usernameRef.current.value,
                password: !userDialog.isUpdate
                    ? passwordRef.current.value
                    : PASSWORD_DEFAULT,
                numberPhone: phoneNumberRef.current.value,
                email: emailRef.current.value,
                fullName: fullnameRef.current.value,
            };

            if (userDialog.isUpdate) {
                let data = {
                    id: userDialog?.data.id,
                    obj: obj,
                };
                const resultDispatch = await dispatch(
                    editAccountThunk(data)
                ).unwrap();
                setNotify({
                    isOpen: true,
                    title: "Cập nhật tài khoản",
                    message: resultDispatch.message,
                    type: resultDispatch.isSuccess ? "success" : "error",
                });
            } else {
                const resultDispatch = await dispatch(
                    addNewAccountAdminThunk(obj)
                ).unwrap();
                setNotify({
                    isOpen: true,
                    title: "Thêm tài khoản cấp khoa",
                    message: resultDispatch.message,
                    type: resultDispatch.isSuccess ? "success" : "error",
                });
            }

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
            <DialogTitle>
                {userDialog?.isUpdate ? "Cập nhật tài khoản" : "Thêm tài khoản"}
            </DialogTitle>
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
                    disabled={true}
                    value={
                        userDialog.isUpdate
                            ? userDialog?.data?.role?.name
                            : "Faculty"
                    }
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
                    defaultValue={userDialog?.data?.username}
                    disabled={userDialog?.isUpdate}
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
                    disabled={userDialog?.isUpdate}
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
                    defaultValue={userDialog?.data?.phoneNumber}
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
                    defaultValue={userDialog?.data?.email}
                    disabled={userDialog?.isUpdate}
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
                    defaultValue={userDialog?.data?.fullName}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" fullWidth onClick={handleSubmit}>
                    {userDialog?.isUpdate ? "Cập nhật" : "Thêm"}
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
