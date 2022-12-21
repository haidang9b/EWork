import { Card, Grid, Skeleton, CardContent } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const SkeletonCompanyItem = () => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} padding={1}>
            <Card>
                <CardContent>
                    <Box textAlign="center">
                        <Skeleton
                            variant="rounded"
                            width={"100%"}
                            height={150}
                            animation="wave"
                        />

                        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default SkeletonCompanyItem;
