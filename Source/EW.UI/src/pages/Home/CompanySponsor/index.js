import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ImageDefault from "../../../assets/images/company-default.webp";
const CompanySponsor = () => {
    return (
        <Card
            sx={{
                width: {
                    sx: "80%",
                    md: "20%",
                    lg: "20%",
                },
            }}
        >
            <CardContent>
                <Box textAlign="center">
                    <img src={ImageDefault} />
                    <Typography variant="h5">Samsung</Typography>
                    <p>
                        <Button>5 cong viec</Button> - Ho Chi Minh
                    </p>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CompanySponsor;
