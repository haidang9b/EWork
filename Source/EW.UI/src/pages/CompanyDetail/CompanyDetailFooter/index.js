import { Email, Phone, Place } from "@mui/icons-material";
import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { companyDetailSelector } from "../companyDetail.slice";

const CompanyDetailFooter = () => {
    const { company } = useSelector(companyDetailSelector);
    return (
        <Paper>
            <Grid padding={3} container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h5">
                        Thông tin liên hệ của {company?.companyName}
                    </Typography>
                    <br />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <div className="d-flex company-detail-footer__row">
                        <div>
                            <Place color="action" className="icon-flex" />
                        </div>
                        <div>Địa chỉ: {company?.address}</div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <div className="d-flex company-detail-footer__row">
                        <div>
                            <Email color="action" className="icon-flex" />
                        </div>
                        <div>Email: {company?.email}</div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <div className="d-flex company-detail-footer__row">
                        <div>
                            <Phone color="action" className="icon-flex" />
                        </div>
                        <div>Địa chỉ: {company?.phoneNumber}</div>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
};
CompanyDetailFooter.displayName = "CompanyDetailFooter";
export default CompanyDetailFooter;
