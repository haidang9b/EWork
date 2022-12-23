import { Grid, Paper, Skeleton } from "@mui/material";
import React from "react";

const SkeletonCompanyDetailBody = () => {
    return (
        <Paper className="company-detail-body">
            <Grid container paddingTop={2} paddingLeft={2} paddingRight={2}>
                <Grid item sm={6} xs={6} md={6} lg={6}>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "2rem", maxWidth: "30%" }}
                    />
                </Grid>
                <Grid item sm={6} xs={6} md={6} lg={6}>
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: "2rem", maxWidth: "30%" }}
                    />
                </Grid>
            </Grid>
            <br />
            <Skeleton
                variant="rounded"
                sx={{
                    minHeight: "60vh",
                    margin: "0 16px 16px 16px",
                    paddingBottom: "2%",
                }}
                animation="wave"
            />
        </Paper>
    );
};

SkeletonCompanyDetailBody.displayName = "SkeletonCompanyDetailBody";

export default SkeletonCompanyDetailBody;
