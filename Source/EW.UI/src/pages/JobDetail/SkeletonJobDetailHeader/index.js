import { Grid, Paper, Skeleton } from "@mui/material";
import React from "react";

const SkeletonJobDetailHeader = () => {
    return (
        <Paper className="job-detail">
            <Grid container padding={2}>
                <Grid item xs={12} sm={12} md={3} lg={3} padding={1}>
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        width="100%"
                        height="200px"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} padding={1}>
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "3rem",
                            maxWidth: "100%",
                        }}
                    />

                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "1.6rem",
                            maxWidth: "100%",
                        }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "1.6rem",
                            maxWidth: "100%",
                        }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "1.6rem",
                            maxWidth: "100%",
                        }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "1.6rem",
                            maxWidth: "100%",
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SkeletonJobDetailHeader;
