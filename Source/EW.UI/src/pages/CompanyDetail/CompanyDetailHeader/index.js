import { Group, Language, Place, Settings } from "@mui/icons-material";
import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { CompanyType, TeamSizeType } from "../../../common/constants";
import countryList from "../../../common/countryList";
import useFileUpload from "../../../hook/useFileUpload";
import { companyDetailSelector } from "../companyDetail.slice";
import ImageDefault from "../../../assets/images/company-default.webp";

const CompanyDetailHeader = () => {
    const { getFilePathUpload } = useFileUpload();
    const { company } = useSelector(companyDetailSelector);
    return (
        <Paper className="company-detail-header">
            <Grid container>
                <Grid item xs={12} sm={12} md={4} lg={4} padding={2}>
                    <img
                        className="company-detail-header__img"
                        src={
                            company?.avatarUrl
                                ? getFilePathUpload(company?.avatarUrl)
                                : ImageDefault
                        }
                        style={{
                            maxWidth: "100%",
                        }}
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
                        <Place color="action" /> Địa chỉ: {company?.address}
                        <br />
                        <Language color="action" /> Đến từ:{" "}
                        {countryList().getLabel(company?.country)}
                    </Grid>
                    <Grid xs={12} sm={12} md={6} lg={6} item>
                        <Settings color="action" /> Loại hình công ty:{" "}
                        {
                            CompanyType.find(
                                (item) => item.value === company?.companyType
                            )?.label
                        }
                        <br />
                        <Group color="action" /> Số nhân viên:{" "}
                        {
                            TeamSizeType.find(
                                (item) => item.value === company?.teamSize
                            )?.label
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

CompanyDetailHeader.displayName = "CompanyDetailHeader";

export default CompanyDetailHeader;
