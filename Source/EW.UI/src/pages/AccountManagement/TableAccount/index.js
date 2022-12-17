import React, { useState } from "react";
import { Box, Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { setActiveThunk, usersSelector } from "../users.slice";
import { Status } from "../../../common/constants";
import { ConfirmDialog, SkeletonTable } from "../../../components";
import useNotify from "../../../hook/useNotify";
import moment from "moment";
import { Edit } from "@mui/icons-material";

const TableAccount = ({ userDialog, setUserDialog }) => {
    const { setNotify } = useNotify();
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
                switch (cellValues.row?.roleId) {
                    case 1:
                        return "Khoa";
                    case 2:
                        return "Doanh nghiệp";
                    case 3:
                        return "Sinh viên";
                    default:
                        return "Sinh viên";
                }
            },
        },
        {
            field: "updatedDate",
            headerName: "Ngày cập nhật",
            sortable: false,
            width: 160,
            renderCell: (cellValues) => {
                return moment(cellValues.row?.updatedDate).format(
                    "DD/MM/yyyy HH:mm"
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            description: "This is action for row",
            sortable: false,
            width: 240,
            renderCell: (cellValues) => {
                const onUpdate = () => {
                    setUserDialog({
                        ...userDialog,
                        isOpen: true,
                        isUpdate: true,
                        data: cellValues?.row,
                    });
                };
                const handleRequest = async () => {
                    const resultDispatch = await dispatch(
                        setActiveThunk({
                            isActive: !cellValues.row?.isActive,
                            username: cellValues.row?.username,
                            id: cellValues.row?.id,
                        })
                    ).unwrap();
                    setNotify({
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
                        <Chip
                            label="Chỉnh sửa"
                            onClick={onUpdate}
                            color="primary"
                            size="small"
                            sx={{
                                mr: 1,
                            }}
                        />
                        {cellValues.row?.isActive ? (
                            <Chip
                                label="Hoạt động"
                                clickable
                                color="success"
                                size="small"
                                deleteIcon={<Edit />}
                                onClick={onDeactive}
                                onDelete={onDeactive}
                            />
                        ) : (
                            <Chip
                                label="Vô hiệu hóa"
                                clickable
                                color="warning"
                                size="small"
                                onClick={onActive}
                                deleteIcon={<Edit />}
                                onDelete={onActive}
                            />
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

export default TableAccount;
