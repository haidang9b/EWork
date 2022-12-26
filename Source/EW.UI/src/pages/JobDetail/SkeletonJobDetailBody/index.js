import { Grid, Paper, Skeleton } from "@mui/material";
import React from "react";

const SkeletonJobDetailBody = () => {
    return (
        <Paper className="job-detail">
            <Grid paddingTop={2} paddingLeft={2} paddingRight={2}>
                <Skeleton
                    variant="text"
                    sx={{ fontSize: "2rem", maxWidth: "80%" }}
                />
            </Grid>
            <br />
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
    );
};

export default SkeletonJobDetailBody;
