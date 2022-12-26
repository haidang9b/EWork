import { Grid, Paper, Skeleton } from "@mui/material";
import React from "react";

const SkeletonJobDetailBody = () => {
    return (
        <Grid container>
            <Grid item sm={12} xs={12} lg={8} md={8} padding={1}>
                <Paper className="job-detail">
                    <Grid padding={2}>
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "2rem", maxWidth: "80%" }}
                        />
                    </Grid>
                    <Grid paddingBottom={1}>
                        <Skeleton
                            variant="rounded"
                            sx={{
                                minHeight: "60vh",
                                margin: "0 16px 16px 16px",
                            }}
                            animation="wave"
                        />
                    </Grid>
                </Paper>
            </Grid>
            <Grid sm={12} xs={12} lg={4} md={4} padding={1} item>
                <Paper className="job-detail">
                    <Grid padding={2}>
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: "2rem", maxWidth: "100%" }}
                        />
                    </Grid>
                    <Grid paddingBottom={1}>
                        <Skeleton
                            variant="rounded"
                            sx={{
                                minHeight: "30vh",
                                margin: "0 16px 16px 16px",
                            }}
                            animation="wave"
                        />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

SkeletonJobDetailBody.displayName = "SkeletonJobDetailBody";

export default SkeletonJobDetailBody;
