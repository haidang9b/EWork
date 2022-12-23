import { Paper, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { JobItem, TabPanel } from "../../../components";
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
 * @param {string} object.avatarUrl
 * @returns
 */
const JobListTab = ({ name, posts, avatarUrl }) => {
    return (
        <>
            <div>
                <Typography variant="h5">
                    Công việc đang tuyển tại {name}
                </Typography>
            </div>
            <div>
                {posts?.length === 0 ? (
                    <Typography variant="h6">
                        Hiện đang không tuyển dụng
                    </Typography>
                ) : (
                    <>
                        <Typography variant="h6">
                            Hiện đang có {posts?.length} đang tuyển
                        </Typography>
                        <br />
                        {posts?.map((item) => (
                            <JobItem
                                key={JSON.stringify(item)}
                                id={item.id}
                                jobTitle={item.jobTitle}
                                salaryType={item.salaryType}
                                salaryFrom={item.salaryFrom}
                                salaryTo={item.salaryTo}
                                currency={item.currency}
                                techStacks={item.techStacks}
                                avatarUrl={avatarUrl}
                                jobDescription={item.jobDescription}
                                updatedDate={item.updatedDate}
                            />
                        ))}
                    </>
                )}
            </div>
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
