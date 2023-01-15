import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import {
    ConfirmDialog,
    CustomToolbar,
    SkeletonTable,
} from "../../../components";
import useNotify from "../../../hook/useNotify";
import BlogModal from "../BlogModal";
import { blogsSelector, deleteBlogThunk } from "../blogs.slice";

/**
 *  Table Blogs
 */
const TableBlogs = () => {
    const { status, blogs } = useSelector(blogsSelector);
    const { setNotify } = useNotify();
    const [blogDialog, setBlogDialog] = React.useState({
        isOpen: false,
        isUpdate: false,
        data: null,
    });

    const [confirmDialog, setConfirmDialog] = React.useState({
        isOpen: false,
        title: "",
        subtitle: "",
    });
    const dispatch = useDispatch();
    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "title", headerName: "Tên bài viết", width: 300 },
        {
            field: "blogCategoryName",
            headerName: "Danh mục",
            width: 220,
            valueGetter: (cellValues) => cellValues.row?.blogCategoryName,
        },
        {
            field: "author",
            headerName: "Tác giả",
            width: 160,
            valueGetter: (cellValues) => cellValues.row?.author,
        },
        {
            field: "createdDate",
            headerName: "Ngày tạo",
            width: 160,
            valueGetter: (cellValues) =>
                moment(cellValues.row?.createdDate).format(
                    "DD/MM/YYYY HH:mm:ss"
                ),
        },
        {
            field: "updatedDate",
            headerName: "Ngày cập nhật",
            width: 160,
            valueGetter: (cellValues) =>
                moment(cellValues.row?.updatedDate).format(
                    "DD/MM/YYYY HH:mm:ss"
                ),
        },
        {
            field: "action",
            headerName: "Hành động",
            width: 160,
            renderCell: (params) => {
                const handleDelete = () => {
                    setConfirmDialog({
                        isOpen: true,
                        title: "Bạn có chắc muốn xóa bài viết này?",
                        subtitle: "Bạn sẽ không thể hoàn tác lại hành động này",
                        onConfirm: async () => {
                            const { id } = params.row;
                            const resultDispatch = await dispatch(
                                deleteBlogThunk(id)
                            ).unwrap();
                            setNotify({
                                isOpen: true,
                                message: resultDispatch?.message,
                                type: resultDispatch?.isSuccess
                                    ? "success"
                                    : "error",
                                title: "Xóa bài viết",
                            });
                            setConfirmDialog({
                                ...confirmDialog,
                                isOpen: false,
                            });
                        },
                    });
                };

                const handleEdit = () => {
                    setBlogDialog({
                        isOpen: true,
                        isUpdate: true,
                        data: params.row,
                    });
                };
                return (
                    <>
                        <Chip
                            label="Chỉnh sửa"
                            clickable
                            color="success"
                            size="small"
                            deleteIcon={<Edit />}
                            onClick={handleEdit}
                            onDelete={handleEdit}
                        />
                        <Chip
                            label="Xóa"
                            clickable
                            color="warning"
                            size="small"
                            deleteIcon={<Delete />}
                            onClick={handleDelete}
                            onDelete={handleDelete}
                        />
                    </>
                );
            },
        },
    ];

    const handleAddNewBlog = () => {
        setBlogDialog({
            isOpen: true,
            isUpdate: false,
            data: null,
        });
    };
    return (
        <>
            <Button
                variant="contained"
                color="success"
                startIcon={<Add />}
                onClick={handleAddNewBlog}
            >
                Thêm bài viết
            </Button>
            {status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper>
                    <DataGrid
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        rows={blogs}
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
            <BlogModal blogDialog={blogDialog} setBlogDialog={setBlogDialog} />
        </>
    );
};

TableBlogs.displayName = "TableBlogs";
export default TableBlogs;
