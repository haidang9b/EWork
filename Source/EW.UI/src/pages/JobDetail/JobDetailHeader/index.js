import { DataObjectOutlined, Place, Work } from "@mui/icons-material";
import { Chip, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { WorkingTypes } from "../../../common/constants";
import useFileUpload from "../../../hook/useFileUpload";
import { jobDetailSelector } from "../jobDetail.slice";

const JobDetailHeader = () => {
    const { job } = useSelector(jobDetailSelector);
    const { getFilePathUpload } = useFileUpload();
    const getTechStacks = () => {
        let arr = job?.techStacks.split(",");
        return arr.filter((item) => item !== "");
    };
    return (
        <Paper className="job-detail">
            <Grid container padding={2}>
                <Grid item xs={12} sm={12} md={3} lg={3} padding={1}>
                    <img
                        src={
                            job?.company?.avatarUrl
                                ? getFilePathUpload(job?.company?.avatarUrl)
                                : ""
                        }
                        alt={`${job?.jobTitle} - ${job?.company?.companyName}`}
                        width="100%"
                        height="200px"
                        className="job-detail-header__img"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={9} lg={9} padding={1} container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant="h4">{job?.jobTitle}</Typography>
                        <Link
                            to={`/company-detail/${job?.company.id}`}
                            className="text-link job-detail-header__company"
                        >
                            <Typography variant="h6">
                                {job?.company?.companyName}
                            </Typography>
                        </Link>
                        <br />
                        <div className="d-flex">
                            <div>
                                <Place color="action" />
                            </div>
                            <div>
                                <strong>Địa chỉ:</strong>{" "}
                                {job?.company?.address}
                            </div>
                        </div>
                        <div className="d-flex">
                            <div>
                                <Work color="action" />
                            </div>
                            <div>
                                <strong>Hình thức: </strong>
                                {
                                    WorkingTypes.find(
                                        (item) =>
                                            item.value === job?.workingType
                                    )?.label
                                }
                            </div>
                        </div>
                        <div className="d-flex">
                            <div>
                                <DataObjectOutlined color="action" />
                            </div>
                            <div>
                                <strong>Số năm kinh nghiệm: </strong>
                                {job?.yearExperience === 0
                                    ? "Không yêu cầu"
                                    : `${job?.yearExperience} năm`}
                            </div>
                        </div>
                        <div>
                            {getTechStacks().map((item) => (
                                <Chip
                                    key={item}
                                    label={item}
                                    sx={{ marginRight: "4px" }}
                                />
                            ))}
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}></Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default JobDetailHeader;
