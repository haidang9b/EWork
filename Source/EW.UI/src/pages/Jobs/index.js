import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import { Banner, FilterArea, Hero, ListJob } from "../../components";
import SelectorJobsArea from "../../components/SelectorJobsArea";
import SkeletonJobItem from "../../components/SkeletonJobItem";
import { jobsRemainingSelector } from "../../redux/selectors";
import { getJobsThunk, jobsSelector } from "./jobs.slice";

const Jobs = () => {
    const dispatch = useDispatch();
    const { status } = useSelector(jobsSelector);
    const posts = useSelector(jobsRemainingSelector);
    useEffect(() => {
        dispatch(getJobsThunk());
        document.title = getPageName("Tìm kiếm công việc");
    }, [dispatch]);
    return (
        <>
            <Hero hero="jobHero">
                <Banner
                    title="Công việc"
                    subtitle="Danh sách công việc đang tuyển dụng tại EWork"
                ></Banner>
            </Hero>
            <Container>
                <FilterArea label="Tìm kiếm việc theo tên công việc, kỹ năng, công ty..." />
                <SelectorJobsArea />
                <Paper
                    sx={{
                        marginTop: "16px",
                    }}
                >
                    <Grid padding={3}>
                        {status === Status.loading ? (
                            <SkeletonJobItem />
                        ) : (
                            <ListJob posts={posts} />
                        )}
                    </Grid>
                </Paper>
            </Container>
        </>
    );
};
Jobs.displayName = "Jobs";
export default Jobs;
