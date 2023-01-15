import { Grid, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blogCategoriesSelector } from "../../pages/BlogManagement/blogCategories.slice";
import { blogFilterActions } from "./blogsFilter.slice";

const SelectorBlogs = () => {
    const dispatch = useDispatch();
    const [currentSelectedCategories, setCurrentSelectedCategories] =
        React.useState([]);
    const { blogCategories } = useSelector(blogCategoriesSelector);
    const handleChangeSelector = (e) => {
        const {
            target: { value },
        } = e;
        setCurrentSelectedCategories(value);
        dispatch(blogFilterActions.setBlogCategories(value));
    };

    useEffect(() => {
        setCurrentSelectedCategories([]);
        dispatch(blogFilterActions.setBlogCategories([]));
    }, [dispatch]);
    return (
        <Paper>
            <Grid padding={2} marginTop={1}>
                <InputLabel id="filter-blog-selector">
                    Danh mục bài viết
                </InputLabel>
                <Select
                    labelId="filter-blog-selector"
                    fullWidth
                    multiple
                    value={currentSelectedCategories}
                    onChange={handleChangeSelector}
                >
                    {blogCategories.map((blogCategory) => (
                        <MenuItem value={blogCategory.id} key={blogCategory.id}>
                            {blogCategory.name}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
        </Paper>
    );
};

SelectorBlogs.displayName = "SelectorBlogs";
export default SelectorBlogs;
