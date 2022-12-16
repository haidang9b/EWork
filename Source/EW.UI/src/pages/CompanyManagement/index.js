import { Container, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { ListRecruiter, TabPanel } from "../../components";
import ListCompany from "./ListCompany";
import useTab from "../../hook/useTab";
import { useDispatch } from "react-redux";
import { getRecruitersThunk } from "./recruiter.slice";
import { getCompaniesThunk } from "./company.slice";

const CompanyManagement = () => {
    const { value, handleChange, a11yProps } = useTab(0);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecruitersThunk());
        dispatch(getCompaniesThunk());
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
                        <Tab label="Quản lý công ty" {...a11yProps(0)} />
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
