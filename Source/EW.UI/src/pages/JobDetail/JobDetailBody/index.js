import { MonetizationOnOutlined } from "@mui/icons-material";
import { Button, Grid, Paper, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Currency } from "../../../common/constants";
import { jobDetailSelector } from "../jobDetail.slice";

const JobDetailBody = () => {
    const { job } = useSelector(jobDetailSelector);
    const getSalary = () => {
        const { currency, salaryFrom, salaryTo, salaryType } = job;
        let currencyLabel = Currency.find(
            (item) => item.value === currency
        )?.label;

        switch (salaryType) {
            case 1:
                return "Thương Lượng";
            case 2:
                return `Từ ${salaryFrom} đến ${salaryTo} ${currencyLabel}`;
            case 3:
                return `Lên tới ${salaryTo} ${currencyLabel}`;
            case 4:
                return `Tối thiểu ${salaryFrom} ${currencyLabel}`;
            default:
                return "Thương lượng";
        }
    };
    return (
        <Paper className="job-detail">
            <Grid padding={2}>
                {moment().isAfter(job?.deadline) ? (
                    <Button
                        variant="outlined"
                        color="warning"
                        fullWidth
                        disabled
                    >
                        Việc làm đã Hết hạn
                    </Button>
                ) : (
                    <Button variant="contained" fullWidth>
                        Ứng tuyển
                    </Button>
                )}

                <Grid container>
                    <Grid item padding={1}>
                        <div className="d-flex">
                            <div>
                                <MonetizationOnOutlined color="action" />
                            </div>
                            <div className="job-detail-body__salary">
                                {getSalary()}
                            </div>
                        </div>
                    </Grid>
                    <Grid item padding={1}>
                        <Typography variant="h5">
                            Mô tả công việc {job?.jobTitle} tại{" "}
                            {job?.company?.companyName}
                        </Typography>
                        <br />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: job?.jobDescription,
                            }}
                        ></div>
                    </Grid>
                    <Grid item padding={1}>
                        <Typography variant="h5">
                            Giới thiệu công ty {job?.company?.companyName}
                        </Typography>
                        <br />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: job?.company?.description,
                            }}
                        ></div>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default JobDetailBody;
