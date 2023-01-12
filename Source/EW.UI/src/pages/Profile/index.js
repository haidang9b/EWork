import { Grid, Paper, Button, Skeleton } from "@mui/material";
import { Container } from "@mui/system";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import Certificates from "./Certificates";
import Contacts from "./Contacts";
import Educations from "./Educations";
import "./Profile.css";
import { getProfileThunk, profileSelector } from "./profile.slice";
import Projects from "./Projects";
import SkeletonProfile from "./SkeletonProfile";
import WorkHistories from "./WorkHistories";
import { DocumentScanner } from "@mui/icons-material";

const PreviewMyProfile = React.lazy(() => import("./PreviewMyProfile"));

const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfileThunk());
    }, [dispatch]);
    useEffect(() => {
        document.title = getPageName("Thông tin chi tiết cá nhân");
    }, []);
    const { status } = useSelector(profileSelector);

    const [myProfileDialog, setMyProfileDialog] = useState({
        isOpen: false,
    });

    return (
        <Container>
            <Button
                onClick={() => {
                    setMyProfileDialog({
                        ...myProfileDialog,
                        isOpen: true,
                    });
                }}
                variant="contained"
                startIcon={<DocumentScanner />}
                sx={{
                    float: "right",
                    margin: "10px",
                    display: status === Status.loading ? "none" : "flex",
                }}
            >
                Tạo CV
            </Button>

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
            <Suspense
                fallback={
                    <Paper>
                        <Grid padding={2} margin={1}>
                            <Skeleton
                                variant="rounded"
                                sx={{
                                    width: "100%",
                                }}
                            />
                        </Grid>
                    </Paper>
                }
            >
                <PreviewMyProfile
                    myProfileDialog={myProfileDialog}
                    setMyProfileDialog={setMyProfileDialog}
                />
            </Suspense>
        </Container>
    );
};

Profile.displayName = "Profile";

export default Profile;
