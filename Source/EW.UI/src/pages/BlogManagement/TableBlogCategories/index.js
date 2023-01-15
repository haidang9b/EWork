import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment/moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import {
    ConfirmDialog,
    CustomToolbar,
    SkeletonTable,
} from "../../../components";
import useNotify from "../../../hook/useNotify";
import {
    blogCategoriesSelector,
    deleteBlogCategoryThunk,
} from "../blogCategories.slice";
import BlogCategoryModal from "../BlogCategoryModal";

/**
 * Table Blog Categories
 * @returns {JSX.Element}
 *
 **/
const TableBlogCategories = () => {
    const { setNotify } = useNotify();
    const [blogCategoryDialog, setBlogCategoryDialog] = React.useState({
        isOpen: false,
        isUpdate: false,
        data: null,
    });
    const [confirmDialog, setConfirmDialog] = React.useState({
        isOpen: false,
        title: "",
        subtitle: "",
    });
    const { status, blogCategories } = useSelector(blogCategoriesSelector);
    const dispatch = useDispatch();
    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "name", headerName: "Tên danh mục", width: 200 },
        { field: "description", headerName: "Mô tả", width: 160 },
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
                const handleUpdateBlogCategory = () => {
                    setBlogCategoryDialog({
                        isOpen: true,
                        isUpdate: true,
                        data: params.row,
                    });
                };
                const handleDeleteBlogCategory = () => {
                    setConfirmDialog({
                        isOpen: true,
                        title: "Bạn có chắc muốn xóa danh mục này?",
                        subtitle: "Bạn sẽ không thể hoàn tác lại hành động này",
                        onConfirm: async () => {
                            const { id } = params.row;
                            const resultDispatch = await dispatch(
                                deleteBlogCategoryThunk(id)
                            ).unwrap();
                            setNotify({
                                isOpen: true,
                                message: resultDispatch?.message,
                                type: resultDispatch?.isSuccess
                                    ? "success"
                                    : "error",
                                title: "Xóa danh mục",
                            });
                            setConfirmDialog({
                                ...confirmDialog,
                                isOpen: false,
                            }); // close confirm dialog
                        },
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
                            onClick={handleUpdateBlogCategory}
                            onDelete={handleUpdateBlogCategory}
                        />
                        <Chip
                            label="Xóa"
                            clickable
                            color="warning"
                            size="small"
                            deleteIcon={<Delete />}
                            onClick={handleDeleteBlogCategory}
                            onDelete={handleDeleteBlogCategory}
                        />
                    </>
                );
            },
        },
    ];

    const handleAddBlogCategory = () => {
        setBlogCategoryDialog({
            isOpen: true,
            isUpdate: false,
            data: null,
        });
    };
    return (
        <>
            <Button
                variant="contained"
                startIcon={<Add />}
                color="success"
                onClick={handleAddBlogCategory}
            >
                Thêm danh mục
            </Button>
            {status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper>
                    <DataGrid
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        rows={blogCategories}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight={true}
                        disableSelectionOnClick
                    />
                </Paper>
            )}
            <BlogCategoryModal
                blogCategoryDialog={blogCategoryDialog}
                setBlogCategoryDialog={setBlogCategoryDialog}
            />
            <ConfirmDialog
                confirm={confirmDialog}
                setConfirm={setConfirmDialog}
            />
        </>
    );
};

TableBlogCategories.displayName = "TableBlogCategories";
export default TableBlogCategories;
