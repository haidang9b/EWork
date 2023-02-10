import { Grid } from "@mui/material";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { convertHTMLToText } from "../../common/utils";
import "./BlogItem.css";
/**
 * render blog item
 *
 * @param {*} param0
 * @param {object} param0.blog
 * @param {number} param0.blog.id
 * @param {string} param0.blog.title
 * @param {string} param0.blog.content
 * @param {string} param0.blog.createdDate
 * @param {string} param0.blog.updatedDate
 * @param {string} param0.blog.author
 * @param {string} param0.blog.blogCategoryName
 * @example
 * <BlogItem />
 */
const BlogItem = ({
    blog: {
        id,
        title,
        content,
        createdDate,
        updatedDate,
        author,
        blogCategoryName,
    },
}) => {
    return (
        <Grid padding={2} className="blog-item">
            <Link to={`/blog/${id}`} className="blog-item__title text-link">
                {title}
            </Link>
            <div className="short-article">{convertHTMLToText(content)}</div>
            <Grid container>
                <Grid item xs={6}>
                    <div>
                        <i>
                            Danh mục: <u>{blogCategoryName}</u>
                        </i>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <i>
                            Tác giả: <u>{author}</u>, Đăng vào:{" "}
                            <u>{moment(createdDate).fromNow()}</u>
                        </i>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};
BlogItem.displayName = "BlogItem";
export default BlogItem;
