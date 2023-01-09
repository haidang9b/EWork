import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { ApplicationStatus } from "../../../common/constants";
import { chartSelector } from "../../../redux/chart.slice";

const ApplicationRateCard = () => {
    const { numberApplications } = useSelector(chartSelector);
    const getData = () => {
        return ApplicationStatus.map((item) => {
            let dataRow = numberApplications?.find(
                (element) => element.type === item.value
            );
            return {
                id: item.value,
                title: item.label,
                subtitle: `Tổng số sinh viên ${item.label.toLowerCase()}`,
                number: dataRow ? dataRow.number : 0,
            };
        });
    };
    return (
        <Box>
            <Grid container>
                {getData().map((item) => (
                    <Grid
                        key={item.id}
                        item
                        xs={6}
                        sm={6}
                        lg={2}
                        md={2}
                        padding={1}
                    >
                        <Card className="application-rate-cart-item">
                            <CardHeader
                                title={item.title}
                                subheader={item.subtitle}
                            />
                            <CardContent>
                                <Typography variant="h3" align="center">
                                    {item.number}
                                </Typography>
                                <Typography variant="subtitle2" align="center">
                                    Sinh viên
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                <Grid item xs={6} sm={6} lg={2} md={2} padding={1}>
                    <Card className="application-rate-cart-item">
                        <CardHeader
                            title="Tổng"
                            subheader="Tổng các sinh viên đang sử dụng hệ thống"
                        />
                        <CardContent>
                            <Typography variant="h3" align="center">
                                {getData().reduce(
                                    (partialSum, item) =>
                                        partialSum + item.number,
                                    0
                                )}
                            </Typography>
                            <Typography variant="subtitle2" align="center">
                                Sinh viên
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ApplicationRateCard;
