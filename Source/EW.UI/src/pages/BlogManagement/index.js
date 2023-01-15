import { Box, Container, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPageName } from "../../common/nameApp";
import { TabPanel } from "../../components";
import useTab from "../../hook/useTab";
import { getBlogCategoriesThunk } from "./blogCategories.slice";
import { getBlogsThunk } from "./blogs.slice";
import TableBlogCategories from "./TableBlogCategories";
import TableBlogs from "./TableBlogs";

const BlogManagement = () => {
    const { value, handleChange, a11yProps } = useTab(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBlogCategoriesThunk());
        dispatch(getBlogsThunk());
    }, [dispatch]);
    useEffect(() => {
        document.title = getPageName("Quản lý bài viết blog");
    }, []);
    return (
        <Container>
            <Box width="100%" marginTop={1}>
                <Box sx={{ borderBottom: 1 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs"
                    >
                        <Tab label="Quản lý bài viết blog" {...a11yProps(0)} />
                        <Tab label="Quản lý danh mục blog" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <TableBlogs />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableBlogCategories />
                </TabPanel>
            </Box>
        </Container>
    );
};

BlogManagement.displayName = "BlogManagement";
export default BlogManagement;
