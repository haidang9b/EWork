import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageName } from "../../common/nameApp";
import {
    Banner,
    FilterArea,
    Hero,
    ListBlog,
    SelectorBlogs,
} from "../../components";
import { blogsRemaningSelector } from "../../redux/selectors";
import { getBlogCategoriesThunk } from "../BlogManagement/blogCategories.slice";
import { getBlogsThunk } from "../BlogManagement/blogs.slice";

const Blogs = () => {
    const dispatch = useDispatch();
    const blogs = useSelector(blogsRemaningSelector);
    useEffect(() => {
        dispatch(getBlogsThunk());
        dispatch(getBlogCategoriesThunk());
    }, [dispatch]);
    useEffect(() => {
        document.title = getPageName("Blogs");
    }, []);
    return (
        <>
            <Hero hero="blogHero">
                <Banner
                    title="Blogs"
                    subtitle="Danh sách các blogs tại EWORK"
                ></Banner>
            </Hero>
            <Container>
                <FilterArea label="Nhập tên bài viết bạn muốn tìm kiếm..." />
                <SelectorBlogs />

                <ListBlog blogs={blogs} />
            </Container>
        </>
    );
};

export default Blogs;
