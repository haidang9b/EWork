import { Add } from "@mui/icons-material";
import { Box, Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPageName } from "../../common/nameApp";
import { getCompaniesThunk } from "../CompanyManagement/company.slice";
import { getRecruitmentPostsThunk } from "./recruitmentPost.slice";
import RecruitmentPostModal from "./RecruitmentPostModal";
import TableRecruitmentPost from "./TableRecruitmentPost";

const RecruitmentPost = () => {
    const [recruitmentPostModal, setRecruitmentPostModal] = useState({
        isOpen: false,
        isUpdate: false, // update or add
        data: null,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = getPageName("Quản lý bài tuyển dụng");
        dispatch(getRecruitmentPostsThunk());
        dispatch(getCompaniesThunk());
    }, [dispatch]);
    return (
        <Container>
            <Box width="100%" marginTop={1}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => {
                        setRecruitmentPostModal({
                            ...recruitmentPostModal,
                            isOpen: true,
                            isUpdate: false,
                            data: null,
                        });
                    }}
                >
                    Thêm bài viết mới
                </Button>
                <TableRecruitmentPost
                    recruitmentPostModal={recruitmentPostModal}
                    setRecruitmentPostModal={setRecruitmentPostModal}
                />
                <RecruitmentPostModal
                    recruitmentPostModal={recruitmentPostModal}
                    setRecruitmentPostModal={setRecruitmentPostModal}
                />
            </Box>
        </Container>
    );
};
RecruitmentPost.displayName = "RecruitmentPost";
export default RecruitmentPost;
