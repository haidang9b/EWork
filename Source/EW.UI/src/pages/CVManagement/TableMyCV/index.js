import { Delete, Download, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import { ConfirmDialog, SkeletonTable } from "../../../components";
import {
    documentSelector,
    removeCVThunk,
    updateFeaturedCVThunk,
} from "../document.slice";
import useNotify from "../../../hook/useNotify";
import useFileUpload from "../../../hook/useFileUpload";
import moment from "moment";

const TableMyCV = () => {
    const { getFilePathUpload } = useFileUpload();
    const { setNotify } = useNotify();
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subtitle: "",
    });
    const dispatch = useDispatch();
    const { status, cvs } = useSelector(documentSelector);

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
        },
        { field: "cvName", headerName: "Tên CV", width: 280 },
        {
            field: "updatedDate",
            headerName: "Ngày đăng",
            width: 280,
            renderCell: (cellValues) =>
                moment(cellValues.row?.updatedDate).format("DD/MM/yyyy HH:mm"),
        },
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
                            href={
                                cellValues.row?.cvUrl
                                    ? getFilePathUpload(cellValues.row?.cvUrl)
                                    : ""
                            }
                        >
                            <RemoveRedEyeOutlined />
                        </IconButton>
                        <IconButton
                            variant="contained"
                            href={
                                cellValues.row?.cvUrl
                                    ? getFilePathUpload(cellValues.row?.cvUrl)
                                    : ""
                            }
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
        {
            field: "featured",
            headerName: "Trạng thái",
            width: 240,
            renderCell: (cellValues) => {
                const onClick = () => {
                    setConfirmDialog({
                        ...confirmDialog,
                        isOpen: true,
                        title: "Thay đổi trạng thái CV",
                        subtitle: `Bạn có đồng ý ${
                            cellValues.row?.featured ? " tắt " : " bật "
                        } trạng thái tìm việc của CV ${
                            cellValues.row?.cvName
                        } không? CV được bật sẽ được hiển thị trong danh sách ứng viên tìm kiếm (nếu bạn có BẬT TÌM VIỆC)`,
                        onConfirm: async () => {
                            let resultDispatch = await dispatch(
                                updateFeaturedCVThunk({
                                    id: cellValues.row?.id,
                                    featured: !cellValues.row?.featured,
                                })
                            ).unwrap();
                            setNotify({
                                isOpen: true,
                                title: "Thay đổi trạng thái CV",
                                message: resultDispatch.message,
                                type: resultDispatch.isSuccess
                                    ? "success"
                                    : "error",
                            });
                            setConfirmDialog({
                                ...confirmDialog,
                                isOpen: false,
                            });
                        },
                    });
                };
                if (cellValues.row?.featured) {
                    return (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={onClick}
                        >
                            Đang bật
                        </Button>
                    );
                } else {
                    return (
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={onClick}
                        >
                            Không bật
                        </Button>
                    );
                }
            },
        },
    ];

    return (
        <>
            {status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper
                    sx={{ width: "100%", overflow: "hidden", marginTop: "8px" }}
                >
                    <DataGrid
                        rows={cvs}
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

TableMyCV.displayName = "TableMyCV";

export default TableMyCV;
