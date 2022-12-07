import { Button, Container } from "@mui/material";
import React, { useEffect } from "react";
import { getPageName } from "../../common/nameApp";

const RecruitmentPost = () => {
    useEffect(() => {
        document.title = getPageName("Quản lý bài tuyển dụng");
    }, []);
    return (
        <Container>
            <Button variant="contained">Thêm bài viết mới</Button>
        </Container>
    );
};

export default RecruitmentPost;
