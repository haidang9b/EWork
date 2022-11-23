import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import PropTypes from "prop-types";
import useAuth from "../../hook/useAuth";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
const Profile = () => {
    const { user } = useAuth();
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Container>
                <Box sx={{ width: "100%" }}>
                    <Box>
                        <Card
                            sx={{
                                textAlign: "Center",
                                marginTop: "4px",
                            }}
                        >
                            <CardHeader>Thông tin cá nhân</CardHeader>
                            <CardContent
                                sx={{
                                    textAlign: "center",
                                }}
                            >
                                <Avatar
                                    alt="Avatar"
                                    src={
                                        user?.certthumbprint
                                            ? user?.certthumbprint
                                            : "/static/images/avatar/2.jpg"
                                    }
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
                                        margin: "auto",
                                    }}
                                />
                                <Typography variant="h6">
                                    {user.given_name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: "background.paper",
                        }}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs"
                        >
                            <Tab label="Item One" {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Box>
            </Container>
        </>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default Profile;
