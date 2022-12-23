import { Avatar, Card, CardContent, Skeleton } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

const SkeletonProfile = () => {
    return (
        <Container>
            <Box width="100%">
                <Box>
                    <Card
                        sx={{
                            textAlign: "center",
                            marginTop: "4px",
                        }}
                    >
                        <CardContent
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <Skeleton
                                sx={{
                                    margin: "auto",
                                }}
                            >
                                <Avatar
                                    alt="Avatar"
                                    src="/static/images/avatar/2.jpg"
                                    sx={{
                                        border: "solid 1px #f0f2f5",
                                        height: {
                                            md: "160px",
                                            xs: "80px",
                                        },
                                        width: {
                                            md: "160px",
                                            xs: "80px",
                                        },
                                    }}
                                />
                            </Skeleton>

                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: "2rem",
                                    width: "30%",
                                    margin: "auto",
                                }}
                            />
                        </CardContent>
                    </Card>

                    <Card
                        sx={{
                            marginTop: "20px",
                        }}
                    >
                        <CardContent
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: "2rem",
                                }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: "2rem",
                                }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: "2rem",
                                }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: "2rem",
                                }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{
                                    fontSize: "2rem",
                                }}
                            />
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
};

SkeletonProfile.displayName = "SkeletonProfile";

export default SkeletonProfile;
