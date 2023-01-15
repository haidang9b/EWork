import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RichTextEditor } from "../../../components";
import useNotify from "../../../hook/useNotify";
import { blogCategoriesSelector } from "../blogCategories.slice";
import { addBlogThunk, updateBlogThunk } from "../blogs.slice";

const DEFAULT_VALUE_BLOG_CATEGORY = 0;

/**
 * Dialog thêm, cập nhật bài viết
 * @param {*} param0
 * @param {*} param0.isOpen
 * @param {*} param0.isUpdate
 * @param {*} param0.data
 * @param {*} param1
 * @param {*} param1.setBlogDialog
 * @returns
 * @example
 * <BlogModal
 *    blogDialog={{
 *       isOpen: true,
 *      isUpdate: true,
 *    data: {
 *      id: 1,
 *   title: "Bài viết 1",
 * content: "Nội dung bài viết 1",
 * categoryId: 1,
 * },
 * }}
 * setBlogDialog={(value) => setBlogDialog(value)}
 * />
 */
const BlogModal = ({ blogDialog, setBlogDialog }) => {
    const { setNotify } = useNotify();
    const titleRef = React.useRef(null);
    const [currentCategory, setCurrentCategory] = React.useState(
        DEFAULT_VALUE_BLOG_CATEGORY
    );
    const [editor, setEditor] = React.useState(null);
    const { blogCategories } = useSelector(blogCategoriesSelector);
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();

    const handleClose = () => {
        setBlogDialog({ ...blogDialog, isOpen: false });
    };
    const handleSubmit = async () => {
        if (currentCategory === DEFAULT_VALUE_BLOG_CATEGORY) {
            setNotify({
                isOpen: true,
                type: "error",
                title: blogDialog?.isUpdate
                    ? "Cập nhật bài viết"
                    : "Thêm bài viết",
                message: "Vui lòng chọn danh mục bài viết",
            });
            return;
        }
        if (!titleRef.current.value) {
            setNotify({
                isOpen: true,
                type: "error",
                title: blogDialog?.isUpdate
                    ? "Cập nhật bài viết"
                    : "Thêm bài viết",
                message: "Vui lòng nhập tiêu đề",
            });
            titleRef.current.focus();
            return;
        }
        if (!editor || editor?.root?.innerHTML.length < 5) {
            setNotify({
                isOpen: true,
                type: "error",
                title: blogDialog?.isUpdate
                    ? "Cập nhật bài viết"
                    : "Thêm bài viết",
                message: "Vui lòng nhập nội dung",
            });
            return;
        }
        setIsLoading(true);
        if (blogDialog.isUpdate) {
            // Update blog
            const data = {
                ...blogDialog.data,
                title: titleRef.current.value,
                content: editor.root.innerHTML,
                blogCategoryId: currentCategory,
            };

            const resultDispatch = await dispatch(
                updateBlogThunk(data)
            ).unwrap();
            setNotify({
                isOpen: true,
                type: resultDispatch?.isSuccess ? "success" : "error",
                title: "Cập nhật bài viết",
                message: resultDispatch.message,
            });

            if (resultDispatch?.isSuccess) {
                handleClose();
            }
        } else {
            const data = {
                title: titleRef.current.value,
                content: editor.root?.innerHTML,
                blogCategoryId: currentCategory,
            };
            // Create blog
            const resultDispatch = await dispatch(addBlogThunk(data)).unwrap();
            setNotify({
                isOpen: true,
                type: resultDispatch?.isSuccess ? "success" : "error",
                title: "Thêm bài viết",
                message: resultDispatch.message,
            });
            if (resultDispatch?.isSuccess) {
                handleClose();
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (blogDialog?.data) {
            setCurrentCategory(blogDialog?.data?.blogCategoryId);
        } else {
            setCurrentCategory(DEFAULT_VALUE_BLOG_CATEGORY);
        }
    }, [blogDialog?.data]);
    return (
        <Dialog
            open={blogDialog.isOpen}
            onClose={handleClose}
            maxWidth={"lg"}
            fullWidth
        >
            <DialogTitle>
                {blogDialog.isUpdate ? "Cập nhật bài viết" : "Thêm bài viết"}
                <LinearProgress
                    sx={{
                        visibility: isLoading ? "visible" : "hidden",
                    }}
                    color="success"
                />
            </DialogTitle>
            <DialogContent>
                <InputLabel id="selector-category-blog-label">
                    Chọn danh mục bài viết
                </InputLabel>
                <Select
                    fullWidth
                    value={currentCategory}
                    onChange={(e) => setCurrentCategory(e.target.value)}
                    labelId="selector-category-blog-label"
                >
                    <MenuItem value={DEFAULT_VALUE_BLOG_CATEGORY}>
                        <em>Chọn danh mục bài viết</em>
                    </MenuItem>
                    {blogCategories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    sx={{ marginBottom: "1rem", marginTop: "1rem" }}
                    label="Tiêu đề"
                    placeholder="Nhập tiêu đề"
                    inputRef={titleRef}
                    defaultValue={blogDialog?.data?.title}
                    fullWidth
                />

                <InputLabel id="content-blog-label">
                    Nội dung bài viết
                </InputLabel>
                <RichTextEditor
                    editor={editor}
                    setEditor={setEditor}
                    initialHTML={blogDialog?.data?.content}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSubmit}
                    fullWidth
                    variant="contained"
                    color="success"
                    disabled={isLoading}
                >
                    Lưu
                </Button>
                <Button
                    onClick={handleClose}
                    fullWidth
                    variant="outlined"
                    color="warning"
                    disabled={isLoading}
                >
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

BlogModal.displayName = "BlogModal";

export default BlogModal;
