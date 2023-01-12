import {
    Switch,
    Grid,
    Paper,
    Button,
    Skeleton,
    FormGroup,
    FormControlLabel,
    Box,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import Certificates from "./Certificates";
import Contacts from "./Contacts";
import Educations from "./Educations";
import "./Profile.css";
import {
    getProfileThunk,
    profileSelector,
    updateOpenForWorkThunk,
} from "./profile.slice";
import Projects from "./Projects";
import SkeletonProfile from "./SkeletonProfile";
import WorkHistories from "./WorkHistories";
import { DocumentScanner } from "@mui/icons-material";
import { ConfirmDialog } from "../../components";
import useNotify from "../../hook/useNotify";

const PreviewMyProfile = React.lazy(() => import("./PreviewMyProfile"));

const Profile = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfileThunk());
    }, [dispatch]);
    useEffect(() => {
        document.title = getPageName("Thông tin chi tiết cá nhân");
    }, []);
    const { status, profile } = useSelector(profileSelector);
    const [myProfileDialog, setMyProfileDialog] = useState({
        isOpen: false,
    });
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "Thay đổi trạng thái tìm việc",
        subtitle: "Bạn có chắc chắn muốn thay đổi trạng thái tìm việc?",
        onConfirm: () => {},
    });
    const { setNotify } = useNotify();
    const onChangeStatusOpenForWork = (event) => {
        const toggleStatus = event.target.checked;
        setConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: "Thay đổi trạng thái tìm việc",
            subtitle: `Bạn có chắc chắn muốn ${
                toggleStatus ? "bật" : "tắt"
            } trạng thái tìm việc?`,
            onConfirm: async () => {
                const resultDispatch = await dispatch(
                    updateOpenForWorkThunk({
                        isOpenForWork: toggleStatus,
                    })
                ).unwrap();
                setNotify({
                    isOpen: true,
                    type: resultDispatch?.isSuccess ? "success" : "error",
                    message: resultDispatch?.message,
                    title: "Thay đổi trạng thái tìm việc",
                });
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false,
                });
            },
        });
    };
    return (
        <Container>
            <Box width={"100%"} marginTop={1}>
                {status === Status.loading ? (
                    <Skeleton
                        sx={{
                            //set css to right
                            marginLeft: "auto",
                        }}
                    >
                        <Button></Button>
                    </Skeleton>
                ) : (
                    <FormGroup>
                        <FormControlLabel
                            sx={{
                                marginLeft: "auto",
                            }}
                            control={
                                <Switch
                                    checked={profile?.isOpenForWork}
                                    onChange={onChangeStatusOpenForWork}
                                />
                            }
                            label="Trạng thái tìm việc"
                        />
                    </FormGroup>
                )}
            </Box>
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
            <ConfirmDialog
                confirm={confirmDialog}
                setConfirm={setConfirmDialog}
            />
        </Container>
    );
};

Profile.displayName = "Profile";

export default Profile;
