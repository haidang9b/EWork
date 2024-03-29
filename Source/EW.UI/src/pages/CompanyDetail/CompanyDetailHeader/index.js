import { Group, Language, Place, Settings } from "@mui/icons-material";
import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { CompanyTypes, TeamSizeTypes } from "../../../common/constants";
import countryList from "../../../common/countryList";
import useFileUpload from "../../../hook/useFileUpload";
import { companyDetailSelector } from "../companyDetail.slice";
import ImageDefault from "../../../assets/images/company-default.png";

const CompanyDetailHeader = () => {
    const { getFilePathUpload } = useFileUpload();
    const { company } = useSelector(companyDetailSelector);
    return (
        <Paper className="company-detail-header">
            <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={4} padding={2}>
                    <img
                        className="company-detail-header__img"
                        height="200px"
                        width="100%"
                        src={
                            company?.avatarUrl
                                ? getFilePathUpload(company?.avatarUrl)
                                : ImageDefault
                        }
                        alt={company?.companyName}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={8} lg={8} padding={2} container>
                    <Grid xs={12} sm={12} md={12} lg={12} item>
                        <Typography variant="h4">
                            {company?.companyName}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6} item>
                        <div className="d-flex">
                            <div>
                                <Place color="action" className="icon-flex" />
                            </div>
                            <div>Địa chỉ: {company?.address}</div>
                        </div>
                        <div className="d-flex">
                            <div>
                                <Language
                                    color="action"
                                    className="icon-flex"
                                />
                            </div>
                            <div>
                                Đến từ:{" "}
                                {countryList().getLabel(company?.country)}
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6} item>
                        <div className="d-flex">
                            <div>
                                <Settings
                                    color="action"
                                    className="icon-flex"
                                />
                            </div>
                            <div>
                                Loại hình công ty:{" "}
                                {
                                    CompanyTypes.find(
                                        (item) =>
                                            item.value === company?.companyType
                                    )?.label
                                }
                            </div>
                        </div>
                        <div className="d-flex">
                            <div>
                                <Group color="action" className="icon-flex" />
                            </div>
                            <div>
                                Số nhân viên:{" "}
                                {
                                    TeamSizeTypes.find(
                                        (item) =>
                                            item.value === company?.teamSize
                                    )?.label
                                }
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

CompanyDetailHeader.displayName = "CompanyDetailHeader";

export default CompanyDetailHeader;
