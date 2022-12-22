import { Grid, Paper, Skeleton } from "@mui/material";
import React from "react";

const SkeletonGeneralInformation = () => {
    return (
        <Paper className="company-detail-block">
            <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={4} padding={2}>
                    <Skeleton
                        variant="rounded"
                        width={"100%"}
                        height={150}
                        animation="wave"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} padding={2}>
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{
                            fontSize: "3rem",
                            maxWidth: {
                                sx: "100%",
                                sm: "100%",
                                md: "30%",
                                lg: "30%",
                            },
                        }}
                    />
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{
                            fontSize: "1rem",
                            maxWidth: {
                                sx: "100%",
                                sm: "100%",
                                md: "80%",
                                lg: "80%",
                            },
                        }}
                    />
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{
                            fontSize: "1rem",
                            maxWidth: {
                                sx: "100%",
                                sm: "100%",
                                md: "80%",
                                lg: "80%",
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SkeletonGeneralInformation;
