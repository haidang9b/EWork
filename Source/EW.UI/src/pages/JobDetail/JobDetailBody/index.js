import { Group, Language, Place, Settings } from "@mui/icons-material";
import { Button, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CompanyTypes, TeamSizeTypes } from "../../../common/constants";
import countryList from "../../../common/countryList";
import { jobDetailSelector } from "../jobDetail.slice";
import useAuth from "../../../hook/useAuth";
import { applicationSelector } from "../ApplyModal/application.slice";

const ApplyModal = React.lazy(() => import("../ApplyModal"));

const JobDetailBody = () => {
    const { job } = useSelector(jobDetailSelector);
    const { user, isStudent } = useAuth();
    const { applications } = useSelector(applicationSelector);
    const [applyDialog, setApplyDialog] = useState({
        isOpen: false,
        jobTitle: "",
        jobId: job?.id,
    });
    const handleOpenApply = () => {
        setApplyDialog({
            ...applyDialog,
            isOpen: true,
            jobTitle: job?.jobTitle,
            jobId: job?.id,
        });
    };
    const isApplied = () => {
        let data = applications?.find(
            (item) => item.recruitmentPostId === job.id
        );
        return data ? true : false;
    };
    return (
        <>
            <Grid container>
                <Grid item sm={12} xs={12} lg={8} md={8}>
                    <Paper className="job-detail">
                        <Grid padding={2}>
                            {moment().isAfter(job?.deadline) ? (
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    fullWidth
                                    disabled
                                >
                                    Việc làm đã hết hạn nộp
                                </Button>
                            ) : user && isStudent && !isApplied() ? (
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleOpenApply}
                                >
                                    Ứng tuyển
                                </Button>
                            ) : isApplied() ? (
                                <>
                                    <Button
                                        variant="outlined"
                                        color="warning"
                                        fullWidth
                                        disabled
                                    >
                                        Bạn đã nộp đơn ứng tuyển
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="warning"
                                    component={Link}
                                    to="/login"
                                >
                                    Đăng nhập để ứng tuyển
                                </Button>
                            )}
                            <Grid container>
                                <Grid item padding={1}>
                                    <Typography variant="h5">
                                        Mô tả công việc {job?.jobTitle}
                                    </Typography>
                                    <br />
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: job?.jobDescription,
                                        }}
                                    ></div>
                                </Grid>
                                <Grid item padding={1}>
                                    <Typography variant="h5">
                                        Giới thiệu công ty{" "}
                                        {job?.company?.companyName}
                                    </Typography>
                                    <br />
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: job?.company?.description,
                                        }}
                                    ></div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item sm={12} xs={12} lg={4} md={4} paddingLeft={1}>
                    <Paper className="job-detail">
                        <Grid padding={2} container>
                            <Grid item sm={12} xs={12} lg={12} md={12}>
                                <Link
                                    to={`/company-detail/${job?.company.id}`}
                                    className="text-link job-detail-header__company"
                                >
                                    <Typography variant="h6">
                                        {job?.company?.companyName}
                                    </Typography>
                                </Link>
                                <br />
                            </Grid>
                            <Grid item sm={12} xs={12} lg={12} md={12}>
                                <div className="d-flex">
                                    <div>
                                        <Group color="action" />
                                    </div>
                                    <div>
                                        Số nhân viên:{" "}
                                        {
                                            TeamSizeTypes.find(
                                                (item) =>
                                                    item.value ===
                                                    job?.company?.teamSize
                                            )?.label
                                        }
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div>
                                        <Language color="action" />
                                    </div>
                                    <div>
                                        Đến từ:{" "}
                                        {countryList().getLabel(
                                            job?.company?.country
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div>
                                        <Settings color="action" />
                                    </div>
                                    <div>
                                        Loại hình công ty:{" "}
                                        {
                                            CompanyTypes.find(
                                                (item) =>
                                                    item.value ===
                                                    job?.company?.companyType
                                            )?.label
                                        }
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div>
                                        <Place color="action" />
                                    </div>
                                    <div>
                                        Địa chỉ:
                                        {job?.company?.address}
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            {user && isStudent ? (
                <Suspense fallback="Loading...">
                    <ApplyModal
                        applyDialog={applyDialog}
                        setApplyDialog={setApplyDialog}
                    />
                </Suspense>
            ) : null}
        </>
    );
};

JobDetailBody.displayName = "JobDetailBody";

export default JobDetailBody;
