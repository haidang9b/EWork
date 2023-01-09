import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Status } from "../../common/constants";
import { Banner, Hero } from "../../components";
import { getJobDetailThunk, jobDetailSelector } from "./jobDetail.slice";
import JobDetailBody from "./JobDetailBody";
import JobDetailHeader from "./JobDetailHeader";
import "./JobDetail.css";
import SkeletonJobDetailHeader from "./SkeletonJobDetailHeader";
import { getPageName } from "../../common/nameApp";
import SkeletonJobDetailBody from "./SkeletonJobDetailBody";
import { getDocumentThunk } from "../CVManagement/document.slice";
import { getApplicationOfUserThunk } from "./ApplyModal/application.slice";

const JobDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { status, job } = useSelector(jobDetailSelector);
    useEffect(() => {
        dispatch(getJobDetailThunk(id));
        dispatch(getDocumentThunk());
        dispatch(getApplicationOfUserThunk());
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
            <Hero hero="notFoundHero">
                <Banner
                    title="Không tìm thấy công việc"
                    subtitle="Không có công việc nào từ đường dẫn này, vui lòng thử lại"
                >
                    <Link to={"/"} className="btn-banner">
                        Trang chủ
                    </Link>
                </Banner>
            </Hero>
        </>
    );
};

JobDetail.displayName = "JobDetail";
export default JobDetail;
