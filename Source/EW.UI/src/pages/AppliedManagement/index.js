import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPageName } from "../../common/nameApp";
import { FilterArea, SelectorApplied } from "../../components";
import { getCompaniesThunk } from "../CompanyManagement/company.slice";
import { getRecruitmentPostsThunk } from "../RecruitmentPost/recruitmentPost.slice";
import { getAppliedByBusinessThunk } from "./applied.slice";

import "./AppliedManagement.css";
import TableApplied from "./TableApplied";

const AppliedManagement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecruitmentPostsThunk());
        dispatch(getAppliedByBusinessThunk());
        dispatch(getCompaniesThunk());
    }, [dispatch]);
    useEffect(() => {
        document.title = getPageName("Quản lý ứng tuyển");
    }, []);
    return (
        <Container>
            <FilterArea label="Tìm kiếm theo tên, email,..." />
            <SelectorApplied />
            <TableApplied />
        </Container>
    );
};
AppliedManagement.displayName = "AppliedManagement";
export default AppliedManagement;
