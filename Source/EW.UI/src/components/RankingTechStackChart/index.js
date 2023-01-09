import { Grid, Paper } from "@mui/material";
import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { chartSelector } from "../../redux/chart.slice";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Xếp hạng công nghệ sử dụng nhiều",
        },
    },
};
const RankingTechStackChart = () => {
    const { techStacks } = useSelector(chartSelector);
    const data = {
        labels: techStacks
            ?.filter((item) => item.value > 0)
            .map((item) => item.label),
        datasets: [
            {
                label: "Bài tuyển dụng",
                data: techStacks
                    ?.filter((item) => item.value > 0)
                    .map((item) => item.value),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };
    return (
        <Grid item xs={12} sm={12} lg={12} md={12} padding={1}>
            <Paper>
                <Line data={data} options={options} />
            </Paper>
        </Grid>
    );
};
RankingTechStackChart.displayName = "RankingTechStackChart";
export default RankingTechStackChart;
