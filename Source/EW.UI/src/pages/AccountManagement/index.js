import React, { useEffect, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/system";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRolesThunk, getUsersThunk, usersSelector } from "./users.slice";
import ConfirmDialog from "../../components/ConfirmDialog";
import { getPageName } from "../../common/nameApp";
import Notification from "../../components/Notification";
import { ValidateEmail, ValidatePhoneNumber } from "../../common/validator";
import SkeletonTable from "../../components/SkeletonTable";
import { Status } from "../../common/constants";

const UpdateUserDialog = (props) => {
    const { userDialog, setUserDialog } = props;
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

const AccountManagement = () => {
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subtitle: "",
    });

    const [notify, setNotify] = useState({
        isOpen: false,
        type: "error",
        message: "",
    });
    useEffect(() => {
        document.title = getPageName("Quản lý tài khoản");
        dispatch(getUsersThunk());
        dispatch(getRolesThunk());
    }, [dispatch]);
    const [userDialog, setUserDialog] = useState({
        isOpen: false,
        title: "",
        roles: users?.roles,
        notify: notify,
        setNotify: setNotify,
    });

    const addNewAccount = () => {
        setUserDialog({
            ...userDialog,
            isOpen: true,
            roles: users?.roles,
            title: "Thêm tài khoản",
            notify: notify,
            setNotify: setNotify,
        });
    };

    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "username", headerName: "Tên tài khoản", width: 200 },
        { field: "fullName", headerName: "Họ tên", width: 160 },
        {
            field: "email",
            headerName: "email",
            width: 160,
        },
        {
            field: "phoneNumber",
            headerName: "SĐT",
            width: 160,
        },
        {
            field: "role.Name",
            headerName: "Quyền",
            width: 160,
        },
        {
            field: "updatedDate",
            headerName: "Ngày cập nhật",
            sortable: false,
            width: 160,
        },
        {
            field: "action",
            headerName: "Action",
            description: "This is action for row",
            sortable: false,
            width: 200,
            renderCell: (cellValues) => {
                const onClick = (e) => {};

                const onClickDeleteUser = () => {
                    setConfirmDialog({
                        isOpen: true,
                        title: `Xác nhận xóa tài khoản`,
                        subtitle: `Bạn có muốn xóa tài khoản ${cellValues.row?.username} không?`,
                        onConfirm: () => {
                            setConfirmDialog({
                                ...confirmDialog,
                                isOpen: false,
                            });
                        },
                    });
                };

                return (
                    <>
                        <Button onClick={onClick} variant="contained">
                            Update
                        </Button>
                        <Button onClick={onClickDeleteUser} variant="outlined">
                            Delete
                        </Button>
                    </>
                );
            },
        },
    ];
    return (
        <Container
            sx={{
                marginTop: "2%",
            }}
        >
            <Notification notify={notify} setNotify={setNotify} />
            <Button variant="contained" onClick={addNewAccount}>
                Thêm tài khoản
            </Button>
            <ConfirmDialog
                confirm={confirmDialog}
                setConfirm={setConfirmDialog}
            />
            <Box textAlign="center">
                {users?.status === Status.loading ? (
                    <SkeletonTable />
                ) : (
                    <Paper style={{ width: "100%" }}>
                        <DataGrid
                            rows={users.users}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            autoHeight={true}
                            disableSelectionOnClick
                        />
                    </Paper>
                )}
            </Box>
            <UpdateUserDialog
                userDialog={userDialog}
                setUserDialog={setUserDialog}
            />
        </Container>
    );
};

export default AccountManagement;
