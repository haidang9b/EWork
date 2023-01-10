import { Card, Grid, Paper, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const SkeletonDashboard = () => {
    const loadingApplicationRateCard = () => {
        const tags = [];
        for (let i = 0; i < 6; i++) {
            tags.push(
                <Grid key={i} item xs={6} sm={6} lg={2} md={2} padding={1}>
                    <Card
                        className="application-rate-cart-item"
                        sx={{
                            padding: "10px",
                        }}
                    >
                        <Skeleton
                            variant="text"
                            animation="wave"
                            sx={{
                                fontSize: "2rem",
                            }}
                        />
                        <Skeleton
                            variant="rounded"
                            sx={{
                                height: "20vh",
                            }}
                        />
                    </Card>
                </Grid>
            );
        }
        return tags;
    };
    return (
        <Box>
            <Grid container>{loadingApplicationRateCard()}</Grid>
            <Grid container>
                <Grid item xs={12} sm={12} lg={4} md={4} padding={1}>
                    <Paper
                        sx={{
                            marginTop: "16px",
                            padding: "10px",
                        }}
                    >
                        <Skeleton
                            variant="text"
                            animation="wave"
                            sx={{
                                fontSize: "2rem",
                            }}
                        />
                        <Skeleton
                            variant="rounded"
                            sx={{
                                height: "40vh",
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} lg={8} md={8} padding={1}>
                    <Paper
                        sx={{
                            marginTop: "16px",
                            padding: "10px",
                        }}
                    >
                        <Skeleton
                            variant="text"
                            animation="wave"
                            sx={{
                                fontSize: "2rem",
                            }}
                        />
                        <Skeleton
                            variant="rounded"
                            sx={{
                                height: "40vh",
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} lg={12} md={12} padding={1}>
                    <Paper
                        sx={{
                            padding: "10px",
                        }}
                    >
                        <Skeleton
                            variant="text"
                            animation="wave"
                            sx={{
                                fontSize: "2rem",
                            }}
                        />
                        <Skeleton
                            variant="rounded"
                            sx={{
                                height: "40vh",
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SkeletonDashboard;
