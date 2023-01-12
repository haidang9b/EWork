import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import {
    ApplicationRateChart,
    PostPerDayChart,
    RankingTechStackChart,
} from "../../components";
import {
    chartSelector,
    getNumberApplicationThunk,
    getNumberPostThunk,
    getNumberRankingTechStackThunk,
} from "../../redux/chart.slice";
import ApplicationRateCard from "./ApplicationRateCard";
import "./Dashboard.css";
import SkeletonDashboard from "./SkeletonDashboard";
const Dashboard = () => {
    const dispatch = useDispatch();
    const { status } = useSelector(chartSelector);
    useEffect(() => {
        dispatch(getNumberApplicationThunk());
        dispatch(getNumberPostThunk());
        dispatch(getNumberRankingTechStackThunk());
    }, [dispatch]);

    useEffect(() => {
        document.title = getPageName("Dashboard");
    }, []);
    return (
        <Container>
            <Box width="100%" marginTop={1}>
                {status === Status.loading ? (
                    <SkeletonDashboard />
                ) : (
                    <>
                        <ApplicationRateCard />
                        <Grid container>
                            <ApplicationRateChart />
                            <PostPerDayChart />
                            <RankingTechStackChart />
                        </Grid>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default Dashboard;
