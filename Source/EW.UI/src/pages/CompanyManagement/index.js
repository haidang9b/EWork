import { Container, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { TabPanel } from "../../components";
import ListCompany from "./ListCompany";
import ListRecruiter from "./ListRecruiter";
import useTab from "../../hook/useTab";
import { useDispatch } from "react-redux";
import { getCompaniesThunk, getRecruitersThunk } from "./recruiter.slice";

const CompanyManagement = () => {
    const { value, handleChange, a11yProps } = useTab(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCompaniesThunk());
        dispatch(getRecruitersThunk());
    }, [dispatch]);
    return (
        <Container>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1 }}>
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
                    <ListRecruiter />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ListCompany />
                </TabPanel>
            </Box>
        </Container>
    );
};

CompanyManagement.displayName = "CompanyManagement";

export default CompanyManagement;
