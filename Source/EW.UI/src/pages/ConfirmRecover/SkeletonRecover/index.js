import {
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Skeleton,
} from "@mui/material";
import React from "react";

const SkeletonRecover = () => {
    return (
        <Container>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                sx={{
                    padding: "2%",
                }}
            >
                <Card
                    sx={{
                        width: {
                            sx: "100%",
                            sm: "100%",
                            md: "60%",
                        },
                    }}
                >
                    <CardContent>
                        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                    </CardContent>
                </Card>
            </Grid>
        </Container>
    );
};

SkeletonRecover.displayName = "SkeletonRecover";

export default SkeletonRecover;
