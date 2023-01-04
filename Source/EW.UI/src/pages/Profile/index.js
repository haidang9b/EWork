import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import Certificates from "./Certificates";
import Contacts from "./Contacts";
import Educations from "./Educations";
import "./profile.css";
import { getProfileThunk, profileSelector } from "./profile.slice";
import Projects from "./Projects";
import SkeletonProfile from "./SkeletonProfile";
import WorkHistories from "./WorkHistories";
const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfileThunk());
    }, [dispatch]);
    useEffect(() => {
        document.title = getPageName("Thông tin chi tiết cá nhân");
    }, []);
    const { status } = useSelector(profileSelector);
    return (
        <Container>
            <Paper>
                <Grid padding={2} marginTop={1}>
                    {status === Status.loading ? (
                        <SkeletonProfile />
                    ) : (
                        <Contacts />
                    )}
                </Grid>
            </Paper>

            <Paper>
                <Grid padding={2} marginTop={1}>
                    {status === Status.loading ? (
                        <SkeletonProfile />
                    ) : (
                        <WorkHistories />
                    )}
                </Grid>
            </Paper>
            <Paper>
                <Grid padding={2} marginTop={1}>
                    {status === Status.loading ? (
                        <SkeletonProfile />
                    ) : (
                        <Educations />
                    )}
                </Grid>
            </Paper>
            <Paper>
                <Grid padding={2} marginTop={1}>
                    {status === Status.loading ? (
                        <SkeletonProfile />
                    ) : (
                        <Certificates />
                    )}
                </Grid>
            </Paper>
            <Paper>
                <Grid padding={2} marginTop={1}>
                    {status === Status.loading ? (
                        <SkeletonProfile />
                    ) : (
                        <Projects />
                    )}
                </Grid>
            </Paper>
        </Container>
    );
};

Profile.displayName = "Profile";

export default Profile;
