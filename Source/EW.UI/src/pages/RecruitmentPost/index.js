import { Button, Container } from "@mui/material";
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
            <Button
                variant="contained"
                onClick={() => {
                    setRecruitmentPostModal({
                        ...recruitmentPostModal,
                        isOpen: true,
                        isUpdate: false,
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
        </Container>
    );
};

export default RecruitmentPost;
