import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { setActiveThunk, usersSelector } from "../users.slice";
import { Status } from "../../../common/constants";
import { ConfirmDialog, SkeletonTable } from "../../../components";

const ListAccount = ({ notify, setNotify }) => {
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subtitle: "",
    });
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);
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
            renderCell: (cellValues) => {
                return cellValues.row?.role?.name;
            },
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
            width: 240,
            renderCell: (cellValues) => {
                const onClick = (e) => {};
                const handleRequest = async () => {
                    const resultDispatch = await dispatch(
                        setActiveThunk({
                            isActive: !cellValues.row?.isActive,
                            username: cellValues.row?.username,
                            id: cellValues.row?.id,
                        })
                    ).unwrap();

                    setNotify({
                        ...notify,
                        isOpen: true,
                        message: resultDispatch.message,
                        title: "Chỉnh sửa trạng thái tài khoản",
                        type: resultDispatch.isSuccess ? "success" : "error",
                    });

                    setConfirmDialog({
                        ...confirmDialog,
                        isOpen: false,
                    });
                };
                const onActive = () => {
                    setConfirmDialog({
                        isOpen: true,
                        title: `Xác nhận kích hoạt tài khoản`,
                        subtitle: `Bạn có muốn kích hoạt tài khoản ${cellValues.row?.username} không?`,
                        onConfirm: async () => {
                            await handleRequest();
                        },
                    });
                };
                const onDeactive = () => {
                    setConfirmDialog({
                        isOpen: true,
                        title: `Xác nhận vô hiệu hóa tài khoản`,
                        subtitle: `Bạn có muốn vô hiệu hóa tài khoản ${cellValues.row?.username} không?`,
                        onConfirm: async () => {
                            await handleRequest();
                        },
                    });
                };

                return (
                    <>
                        <Button onClick={onClick} variant="contained">
                            Update
                        </Button>
                        {cellValues.row?.isActive ? (
                            <Button
                                onClick={onDeactive}
                                color="error"
                                variant="contained"
                            >
                                Deactive
                            </Button>
                        ) : (
                            <Button
                                onClick={onActive}
                                color="success"
                                variant="contained"
                            >
                                Active
                            </Button>
                        )}
                    </>
                );
            },
        },
    ];
    return (
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
            <ConfirmDialog
                confirm={confirmDialog}
                setConfirm={setConfirmDialog}
            />
        </Box>
    );
};

ListAccount.propTypes = {
    notify: PropTypes.object.isRequired,
    setNotify: PropTypes.func.isRequired,
};

export default ListAccount;
