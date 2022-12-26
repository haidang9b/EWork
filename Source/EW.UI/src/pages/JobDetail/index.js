import { Container } from "@mui/system";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Status } from "../../common/constants";
import { Hero } from "../../components";
import { getJobDetailThunk, jobDetailSelector } from "./jobDetail.slice";
import JobDetailBody from "./JobDetailBody";
import JobDetailHeader from "./JobDetailHeader";
import "./jobdetail.css";
import SkeletonJobDetailHeader from "./SkeletonJobDetailHeader";
import { getPageName } from "../../common/nameApp";
import SkeletonJobDetailBody from "./SkeletonJobDetailBody";
const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status, job } = useSelector(jobDetailSelector);
    useEffect(() => {
        dispatch(getJobDetailThunk(id));
    }, [id, dispatch]);
    useEffect(() => {
        if (job?.jobTitle) {
            document.title = getPageName(`Công việc ${job.jobTitle}`);
        } else {
            document.title = getPageName("Không tìm thấy công việc");
        }
    }, [job]);
    if (status === Status.loading) {
        return (
            <Container>
                <SkeletonJobDetailHeader />
                <SkeletonJobDetailBody />
            </Container>
        );
    }

    if (job) {
        return (
            <Container>
                <JobDetailHeader />
                <JobDetailBody />
            </Container>
        );
    }
    return (
        <>
            <Hero
                title="Không tìm thấy công việc"
                subtitle="Không có công việc nào từ đường dẫn này, vui lòng thử lại"
            >
                <Button onClick={() => navigate("/")}>
                    Quay lại trang chủ
                </Button>
            </Hero>
        </>
    );
};
JobDetail.displayName = "JobDetail";
export default JobDetail;
