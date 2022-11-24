import React, { useRef, useState } from "react";
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
import { ValidateEmail, ValidatePhoneNumber } from "../../../common/validator";
import PropTypes from "prop-types";

const UserDialog = ({ userDialog, setUserDialog }) => {
    const roles = userDialog.roles;
    const [role, setRole] = useState("");
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const fullnameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const emailRef = useRef(null);

    const handleSubmit = () => {
        if (!role) {
            userDialog.setNotify({
                ...userDialog.notify,
                isOpen: true,
                type: "error",
                title: "Thêm tài khoản",
                message: "Vui lòng chọn quyền tài khoản",
            });
        } else if (usernameRef.current.value?.length === 0) {
            userDialog.setNotify({
                ...userDialog.notify,
                isOpen: true,
                type: "error",
                message: "Vui lòng nhập Tên người dùng",
            });
        } else if (passwordRef.current.value?.length === 0) {
            userDialog.setNotify({
                ...userDialog.notify,
                isOpen: true,
                type: "error",
                message: "Vui lòng nhập mật khẩu",
            });
        } else if (!ValidatePhoneNumber(phoneNumberRef.current.value)) {
            userDialog.setNotify({
                ...userDialog.notify,
                isOpen: true,
                type: "error",
                message: "Vui lòng nhập số điện thoại hợp lệ",
            });
        } else if (!ValidateEmail(emailRef.current.value)) {
            userDialog.setNotify({
                ...userDialog.notify,
                isOpen: true,
                type: "error",
                message: "Vui lòng nhập email hợp lệ",
            });
        } else if (fullnameRef.current.value?.length === 0) {
            userDialog.setNotify({
                ...userDialog.notify,
                isOpen: true,
                type: "error",
                message: "Vui lòng nhập tên",
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
                <Select
                    labelId="select-role"
                    value={role}
                    placeholder="Vui lòng chọn quyền"
                    fullWidth
                    onChange={(e) => {
                        setRole(e.target.value);
                    }}
                >
                    {roles &&
                        roles.map((item) => (
                            <MenuItem value={item} key={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                </Select>
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
    userDialog: PropTypes.object,
    setUserDialog: PropTypes.func,
};

export default UserDialog;
