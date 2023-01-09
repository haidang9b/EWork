import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPageName } from "../../common/nameApp";
import {
    ApplicationRateChart,
    PostPerDayChart,
    RankingTechStackChart,
} from "../../components";
import {
    getNumberApplicationThunk,
    getNumberPostThunk,
    getNumberRankingTechStackThunk,
} from "../../redux/chart.slice";
import ApplicationRateCard from "./ApplicationRateCard";
import "./Dashboard.css";
const Dashboard = () => {
    const dispatch = useDispatch();
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
            <ApplicationRateCard />
            <Grid container>
                <ApplicationRateChart />
                <PostPerDayChart />
                <RankingTechStackChart />
            </Grid>
        </Container>
    );
};

export default Dashboard;
