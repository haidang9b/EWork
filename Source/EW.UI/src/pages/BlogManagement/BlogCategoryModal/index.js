import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    TextField,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import useNotify from "../../../hook/useNotify";
import {
    addBlogCategoryThunk,
    updateBlogCategoryThunk,
} from "../blogCategories.slice";

/**
 *  Dialog thêm, cập nhật danh mục bài viết
 * @param {*} param0
 * @param {*} param0.isOpen
 * @param {*} param0.isUpdate
 * @param {*} param0.data
 * @param {*} param1
 * @param {*} param1.setBlogCategoryDialog
 * @returns
 * @example
 * <BlogCategoryModal
 *     blogCategoryDialog={{
 *        isOpen: true,
 *       isUpdate: true,
 *      data: {
 *         id: 1,
 *        name: "Danh mục 1",
 *      description: "Mô tả danh mục 1",
 *    },
 * }}
 * setBlogCategoryDialog={(value) => setBlogCategoryDialog(value)}
 * />
 */
const BlogCategoryModal = ({ blogCategoryDialog, setBlogCategoryDialog }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();
    const { setNotify } = useNotify();
    const nameRef = React.useRef(null);
    const descriptionRef = React.useRef(null);
    const handleClose = () => {
        setBlogCategoryDialog({ ...blogCategoryDialog, isOpen: false });
    };
    const handleSubmit = async () => {
        if (!nameRef.current.value) {
            setNotify({
                isOpen: true,
                type: "error",
                title: blogCategoryDialog?.isUpdate
                    ? "Cập nhật danh mục"
                    : "Thêm danh mục",
                message: "Vui lòng nhập tên danh mục",
            });
            nameRef.current.focus();
            return;
        }
        setIsLoading(true);
        if (blogCategoryDialog?.isUpdate) {
            const data = {
                id: blogCategoryDialog?.data?.id,
                name: nameRef.current.value,
                description: descriptionRef.current.value,
            };

            const resultDispatch = await dispatch(
                updateBlogCategoryThunk(data)
            ).unwrap();
            if (resultDispatch?.isSuccess) {
                setNotify({
                    isOpen: true,
                    type: "success",
                    title: "Cập nhật danh mục",
                    message: "Cập nhật danh mục thành công",
                });
                handleClose();
            } else {
                setNotify({
                    isOpen: true,
                    type: "error",
                    title: "Cập nhật danh mục",
                    message: "Cập nhật danh mục thất bại",
                });
            }
        } else {
            const data = {
                name: nameRef.current.value,
                description: descriptionRef.current.value,
            };

            const resultDispatch = await dispatch(
                addBlogCategoryThunk(data)
            ).unwrap();
            if (resultDispatch?.isSuccess) {
                setNotify({
                    isOpen: true,
                    type: "success",
                    title: "Thêm danh mục",
                    message: "Thêm danh mục thành công",
                });
                handleClose();
            } else {
                setNotify({
                    isOpen: true,
                    type: "error",
                    title: "Thêm danh mục",
                    message: "Thêm danh mục thất bại",
                });
            }
        }
        setIsLoading(false);
    };
    return (
        <Dialog
            open={blogCategoryDialog.isOpen}
            onClose={handleClose}
            maxWidth={"md"}
            fullWidth
        >
            <DialogTitle>
                {blogCategoryDialog.isUpdate
                    ? "Cập nhật danh mục"
                    : "Thêm danh mục"}
                <LinearProgress
                    style={{ visibility: isLoading ? "visible" : "hidden" }}
                    color="success"
                />
            </DialogTitle>
            <DialogContent>
                <TextField
                    sx={{ marginBottom: "1rem", marginTop: "1rem" }}
                    label="Tên danh mục"
                    placeholder="Nhập tên danh mục"
                    inputRef={nameRef}
                    defaultValue={blogCategoryDialog?.data?.name}
                    fullWidth
                />
                <TextField
                    label="Mô tả"
                    placeholder="Nhập mô tả"
                    inputRef={descriptionRef}
                    defaultValue={blogCategoryDialog?.data?.description}
                    fullWidth
                    minRows={3}
                    maxRows={5}
                    multiline
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="success"
                    disabled={isLoading}
                    fullWidth
                >
                    Lưu
                </Button>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="warning"
                    disabled={isLoading}
                    fullWidth
                >
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

BlogCategoryModal.displayName = "BlogCategoryModal";
export default BlogCategoryModal;
