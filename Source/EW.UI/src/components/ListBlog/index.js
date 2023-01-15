import { Paper, Typography } from "@mui/material";
import React from "react";
import BlogItem from "../BlogItem";

/**
 * render list blog
 * @param {*} param0
 * @param {object[]} param0.blogs
 * @returns
 */
const ListBlog = ({ blogs }) => {
    return (
        <Paper>
            <Typography variant="h5" component="h2" padding={2}>
                Hiện tại đang có {blogs.length} bài viết
            </Typography>
            {blogs.map((blog) => (
                <BlogItem blog={blog} key={blog.id} />
            ))}
        </Paper>
    );
};
ListBlog.displayName = "ListBlog";
export default ListBlog;
