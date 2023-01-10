import { Grid, Paper } from "@mui/material";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { ApplicationStatus } from "../../common/constants";
import { useSelector } from "react-redux";
import { chartSelector } from "../../redux/chart.slice";

ChartJS.register(ArcElement, Title, Tooltip, Legend);
const ApplicationRateChart = () => {
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
    const data = {
        labels: ApplicationStatus.map((item) => item.label),
        datasets: [
            {
                label: "# yêu cầu",
                data: getData().map((item) => item.number),
                backgroundColor: [
                    "#45aeb3",
                    "#f2651c",
                    "#f9ac7c",
                    "#ffce31",
                    "#aed6d8",
                ],
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Biểu đồ tỉ lệ sinh viên ứng tuyển",
            },
        },
    };
    return (
        <Grid item xs={12} sm={12} lg={4} md={4} padding={1}>
            <Paper>
                <Pie data={data} options={options} />
            </Paper>
        </Grid>
    );
};
ApplicationRateChart.displayName = "ApplicationRateChart";
export default ApplicationRateChart;
