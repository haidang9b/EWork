import { Button, Container, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import { SkeletonTable } from "../../components";
import {
    getRecruitmentPostsThunk,
    recruitmentPostSelector,
} from "./recruitmentPost.slice";

const ListRecruitmentPost = () => {
    const recruitmentPosts = useSelector(recruitmentPostSelector);
    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "jobTitle", headerName: "Tiêu đề bài viết", width: 200 },
        { field: "companyName", headerName: "Tên công ty", width: 200 },
        { field: "salary", headerName: "Lương", width: 200 },
        { field: "updateBy", headerName: "Cập nhật bởi", width: 200 },
        { field: "deadline", headerName: "Hạn chót", width: 200 },
        { field: "isActive", headerName: "Trạng thái", width: "200" },
    ];
    return (
        <>
            {recruitmentPosts.status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper style={{ width: "100%" }}>
                    <DataGrid
                        rows={recruitmentPosts.posts}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight={true}
                        disableSelectionOnClick
                    />
                </Paper>
            )}
        </>
    );
};

const RecruitmentPost = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = getPageName("Quản lý bài tuyển dụng");
        dispatch(getRecruitmentPostsThunk());
    }, [dispatch]);
    return (
        <Container>
            <Button variant="contained">Thêm bài viết mới</Button>
            <ListRecruitmentPost />
        </Container>
    );
};

export default RecruitmentPost;
