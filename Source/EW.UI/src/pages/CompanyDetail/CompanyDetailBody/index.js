import { Paper, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { ListJob, TabPanel } from "../../../components";
import { companyDetailSelector } from "../companyDetail.slice";
import useTab from "../../../hook/useTab";

/**
 * Display UI introduce company
 * @param {object} object
 * @param {string} object.name
 * @param {string} object.description
 * @example
 * <CompanyDescription name description/>
 */
const CompanyDescriptionTab = ({ name, description }) => {
    return (
        <>
            <div>
                <Typography variant="h5">Giới thiệu về {name}</Typography>
            </div>
            <div
                className="article"
                dangerouslySetInnerHTML={{
                    __html: description,
                }}
            ></div>
        </>
    );
};

/**
 * @param {object} object
 * @param {string} object.name
 * @param {Array} object.posts
 * @returns
 */
const JobListTab = ({ name, posts }) => {
    return (
        <>
            <div>
                <Typography variant="h5">
                    Công việc đang tuyển tại {name}
                </Typography>
            </div>
            <ListJob posts={posts} />
        </>
    );
};

const CompanyDetailBody = () => {
    const { value, handleChange, a11yProps } = useTab(0);
    const { company } = useSelector(companyDetailSelector);
    return (
        <Paper
            className="company-detail-header"
            sx={{
                padding: 2,
            }}
        >
            <Box sx={{ width: "100%" }}>
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="company-detail-tabs"
                    >
                        <Tab label="Thông tin" {...a11yProps(0)} />
                        <Tab label="Tuyển dụng" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <CompanyDescriptionTab
                        name={company?.companyName}
                        description={company?.description}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <JobListTab
                        name={company?.companyName}
                        posts={company?.posts}
                        avatarUrl={company?.avatarUrl}
                    />
                </TabPanel>
            </Box>
        </Paper>
    );
};
CompanyDetailBody.displayName = "CompanyDetailBody";
export default CompanyDetailBody;
