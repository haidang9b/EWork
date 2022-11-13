import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/system";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRoles, getUsers, usersSelector } from "./users.slice";
import { isLoadingSelector } from "../../redux/selectors";
import Loading from "../../components/Loading";
import ConfirmDialog from "../../components/ConfirmDialog";

const UpdateUserDialog = (props) => {
    const { userDialog, setUserDialog } = props;
    const [role, setRole] = useState("");
    const roles = userDialog.roles;
    return (
        <Dialog
            open={userDialog.isOpen}
            onClose={() => setUserDialog({ ...userDialog, isOpen: false })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>{userDialog.title}</DialogTitle>
            <DialogContent>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                />
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                />
                <InputLabel id="select-label-role">Age</InputLabel>
                <Select
                    labelId="select-label-role"
                    id="demo-simple-select"
                    value={1}
                    label="Quyền"
                    onChange={(e) => {
                        setRole(e.target.value);
                    }}
                >
                    {roles &&
                        roles.map((item) => {
                            <MenuItem
                                value={item.id}
                                key={JSON.stringify(item)}
                            >
                                {item.name}
                            </MenuItem>;
                        })}
                </Select>
            </DialogContent>
        </Dialog>
    );
};

const AccountManagement = () => {
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);
    const isLoading = useSelector(isLoadingSelector);
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subtitle: "",
    });
    useEffect(() => {
        document.title = "Quản lý tài khoản";
        dispatch(getUsers());
        dispatch(getRoles());
    }, []);
    const [userDialog, setUserDialog] = useState({
        isOpen: false,
        title: "",
        roles: users?.roles,
    });

    const addNewAccount = () => {
        setUserDialog({
            ...userDialog,
            isOpen: true,
            roles: users?.roles,
            title: "Thêm tài khoản",
        });
    };

    console.log("re-render");
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
                const onClick = (e) => {
                    console.log(cellValues.row);
                };

                const onClickDeleteUser = () => {
                    setConfirmDialog({
                        isOpen: true,
                        title: `Xác nhận xóa tài khoản`,
                        subtitle: `Bạn có muốn xóa tài khoản ${cellValues.row?.username} không?`,
                        onConfirm: () => {
                            console.log(cellValues.row);
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
        <>
            {isLoading && <Loading />}
            {!isLoading && (
                <Container
                    sx={{
                        marginTop: "2%",
                    }}
                >
                    <Button variant="contained" onClick={addNewAccount}>
                        Thêm tài khoản
                    </Button>
                    <Box textAlign="center">
                        <div style={{ height: 400, width: "100%" }}>
                            <ConfirmDialog
                                confirm={confirmDialog}
                                setConfirm={setConfirmDialog}
                            />
                            <DataGrid
                                rows={users.users}
                                columns={columns}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                            />
                        </div>
                    </Box>
                    <UpdateUserDialog
                        userDialog={userDialog}
                        setUserDialog={setUserDialog}
                    />
                </Container>
            )}
        </>
    );
};

export default AccountManagement;
