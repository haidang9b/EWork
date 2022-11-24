import { Delete, Download, RemoveRedEyeOutlined } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import { ConfirmDialog, SkeletonTable } from "../../../components";
import { profileSelector, removeCVThunk } from "../profile.slice";
import { notificationActions } from "../../../components/Notification/notification.slice";

const ListMyCV = () => {
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subtitle: "",
    });
    const dispatch = useDispatch();
    const profile = useSelector(profileSelector);
    const setNotify = (obj) => {
        dispatch(notificationActions.setNotify(obj));
    };
    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
        },
        { field: "cvName", headerName: "Tên CV", width: 280 },
        { field: "updatedDate", headerName: "Ngày đăng", width: 280 },
        {
            field: "action",
            headerName: "Action",
            width: 240,
            renderCell: (cellValues) => {
                const onClick = (e) => {};
                const onDelete = () => {
                    setConfirmDialog({
                        ...confirmDialog,
                        isOpen: true,
                        title: "Xác minh xóa CV",
                        subtitle: `Bạn có đồng ý xóa CV ${cellValues.row?.cvName} không?`,
                        onConfirm: async () => {
                            let resultDispatch = await dispatch(
                                removeCVThunk(cellValues.row?.id)
                            ).unwrap();
                            if (resultDispatch.isSuccess) {
                                setNotify({
                                    isOpen: true,
                                    title: "Xóa CV",
                                    message: resultDispatch.message,
                                    type: resultDispatch.isSuccess
                                        ? "success"
                                        : "error",
                                });
                            }
                            setConfirmDialog({
                                ...confirmDialog,
                                isOpen: false,
                            });
                        },
                    });
                };
                return (
                    <>
                        <IconButton
                            onClick={onClick}
                            variant="contained"
                            href={cellValues.row?.cvUrl}
                        >
                            <RemoveRedEyeOutlined />
                        </IconButton>
                        <IconButton
                            variant="contained"
                            href={cellValues.row?.cvUrl}
                            target="_blank"
                            download
                        >
                            <Download />
                        </IconButton>
                        <IconButton
                            variant="contained"
                            onClick={() => onDelete()}
                        >
                            <Delete />
                        </IconButton>
                    </>
                );
            },
        },
    ];

    return (
        <>
            {profile.status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper
                    sx={{ width: "100%", overflow: "hidden", marginTop: "8px" }}
                >
                    <DataGrid
                        rows={profile?.cvs}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        autoHeight={true}
                        sty
                    />
                    <ConfirmDialog
                        confirm={confirmDialog}
                        setConfirm={setConfirmDialog}
                    />
                </Paper>
            )}
        </>
    );
};

ListMyCV.displayName = "ListMyCV";

export default ListMyCV;
