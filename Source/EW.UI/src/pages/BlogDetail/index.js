import { Grid, Paper, Skeleton } from "@mui/material";
import { Container } from "@mui/system";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import httpClient from "../../common/apis/httpClient";
import { GET_BLOGS_URL } from "../../common/apiUrl";
import { getPageName } from "../../common/nameApp";
import { Banner, Hero } from "../../components";

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await httpClient.get(`${GET_BLOGS_URL}/${id}`);
                if (response.data) {
                    const { data, isSuccess, message } = response.data;
                    if (isSuccess) {
                        setBlog(data);
                    } else {
                        setError(message);
                    }
                } else {
                    setError("Something went wrong");
                }
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchBlog();
    }, [id]);
    useEffect(() => {
        if (blog) document.title = getPageName(blog?.title);
    }, [blog]);
    if (loading)
        return (
            <Container>
                <Paper>
                    <Grid margin={1} padding={2}>
                        <Skeleton
                            variant="text"
                            width="100%"
                            sx={{
                                fontSize: 30,
                            }}
                        />
                        <Skeleton
                            variant="text"
                            width="100%"
                            sx={{
                                fontSize: 30,
                            }}
                        />
                        <Skeleton
                            variant="text"
                            width="100%"
                            sx={{
                                fontSize: 30,
                            }}
                        />
                        <Skeleton
                            variant="text"
                            width="100%"
                            sx={{
                                fontSize: 30,
                            }}
                        />
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={500}
                        />
                    </Grid>
                </Paper>
            </Container>
        );
    if (error)
        return (
            <Container>
                <Hero hero="notFoundHero">
                    <Banner title={error} subtitle="Blog not found"></Banner>
                </Hero>
            </Container>
        );
    if (!blog) return <div>Blog not found</div>;

    return (
        <>
            <Hero hero="blogHero">
                <Banner title={blog.title}>
                    <Link to="/blogs" className="btn-banner">
                        Các bài viết khác
                    </Link>
                </Banner>
            </Hero>

            <Container>
                <Paper
                    sx={{
                        marginTop: 2,
                        padding: 2,
                    }}
                >
                    <h1>{blog.title}</h1>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <div>
                                <i>
                                    Danh mục: <u>{blog?.blogCategoryName}</u>
                                </i>
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={12} md={6} lg={6}>
                            <div>
                                <i>
                                    Tác giả: <u>{blog?.author}</u>, Đăng vào:{" "}
                                    <u>{moment(blog?.createdDate).fromNow()}</u>
                                </i>
                            </div>
                        </Grid>
                    </Grid>
                    <div
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                        className="article"
                    ></div>
                </Paper>
            </Container>
        </>
    );
};

export default BlogDetail;
