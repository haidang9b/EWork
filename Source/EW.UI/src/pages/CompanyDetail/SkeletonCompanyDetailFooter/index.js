import { Grid, Paper, Skeleton } from "@mui/material";
import React from "react";

const SkeletonCompanyDetailFooter = () => {
    return (
        <Paper className="company-detail-footer">
            <Grid padding={2}>
                <Skeleton
                    variant="text"
                    sx={{
                        minWidth: "80%",
                        fontSize: "1rem",
                        paddingBottom: "8px",
                    }}
                />
                <Skeleton
                    variant="text"
                    sx={{
                        minWidth: "80%",
                        fontSize: "1rem",
                        paddingBottom: "8px",
                    }}
                />
                <Skeleton
                    variant="text"
                    sx={{
                        minWidth: "80%",
                        fontSize: "1rem",
                        paddingBottom: "8px",
                    }}
                />
            </Grid>
        </Paper>
    );
};

SkeletonCompanyDetailFooter.displayName = "SkeletonCompanyDetailFooter";
export default SkeletonCompanyDetailFooter;
