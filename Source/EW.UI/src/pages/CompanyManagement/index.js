import { Container, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { TableRecruiter, TabPanel } from "../../components";
import TableCompany from "./TableCompany";
import useTab from "../../hook/useTab";
import { useDispatch } from "react-redux";
import { getRecruitersThunk } from "../../redux/recruiter.slice";
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
            <Box width="100%" marginTop={1}>
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
                    <TableCompany />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableRecruiter />
                </TabPanel>
            </Box>
        </Container>
    );
};

CompanyManagement.displayName = "CompanyManagement";

export default CompanyManagement;
