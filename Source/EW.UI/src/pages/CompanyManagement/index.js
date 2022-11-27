import { Container, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { TabPanel } from "../../components";
import ListCompany from "./ListCompany";
import ListRecruiter from "./ListRecruiter";
import useTab from "../../hook/useTab";

const CompanyManagement = () => {
    const { value, handleChange, a11yProps } = useTab(0);

    return (
        <Container>
            <Box>
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
                        <Tab label="Quản lý công ti" {...a11yProps(0)} />
                        <Tab label="Quản lý nhà tuyển dụng" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <ListCompany />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ListRecruiter />
                </TabPanel>
            </Box>
        </Container>
    );
};

CompanyManagement.displayName = "CompanyManagement";

export default CompanyManagement;
