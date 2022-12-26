import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Status } from "../../common/constants";
import { Hero } from "../../components";
import { getJobDetailThunk, jobDetailSelector } from "./jobDetail.slice";

const JobDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJobDetailThunk(id));
    }, [id, dispatch]);

    const { status, job } = useSelector(jobDetailSelector);
    if (status === Status.loading) {
        return <>Đang tải....</>;
    }

    if (job) {
        return <>Có job {job?.jobTitle}</>;
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

export default JobDetail;
