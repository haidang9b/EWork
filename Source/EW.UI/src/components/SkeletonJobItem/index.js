import { Grid, Skeleton } from "@mui/material";
import React from "react";

import "../JobItem/jobitem.css";
const SkeletonJobItem = () => {
    return (
        <Grid container className="job-item">
            <Grid
                item
                sm={0}
                xs={0}
                md={3}
                lg={3}
                className="job-item__area-img"
            >
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    height={200}
                    width={250}
                />
            </Grid>
            <Grid item sm={12} xs={12} md={9} lg={9} className="job-item__body">
                <div className="job-item__title">
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "2rem",
                            minWidth: {
                                xs: "100%",
                                sm: "100%",
                                md: "60%",
                                lg: "60%",
                            },
                        }}
                    />
                </div>
                <div>
                    <div className="d-flex job-item__salary">
                        <Skeleton
                            variant="text"
                            sx={{
                                fontSize: "1rem",
                                minWidth: "100%",
                            }}
                        />
                    </div>
                </div>
                <div>
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "1rem",
                            minWidth: "100%",
                        }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "1rem",
                            minWidth: "100%",
                        }}
                    />
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "1rem",
                            minWidth: "100%",
                        }}
                    />
                </div>

                <div className="d-flex">
                    <Skeleton
                        variant="text"
                        sx={{
                            fontSize: "1rem",
                            minWidth: "100%",
                        }}
                    />
                </div>
            </Grid>
        </Grid>
    );
};

export default SkeletonJobItem;
