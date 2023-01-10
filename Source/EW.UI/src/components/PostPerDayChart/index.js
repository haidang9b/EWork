import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { chartSelector } from "../../redux/chart.slice";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    indexAxis: "x",
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Biểu đồ số lượng bài viết gần đây",
        },
    },
};
const PostPerDayChart = () => {
    const { numberPosts } = useSelector(chartSelector);
    const data = {
        labels: numberPosts?.map((item) => item.label),
        datasets: [
            {
                label: "Số bài",
                data: numberPosts?.map((item) => item.value),
                backgroundColor: "rgba(53, 162, 235,0.7)",
            },
        ],
    };
    return (
        <Grid item xs={12} sm={12} lg={8} md={8} padding={1}>
            <Paper>
                <Bar data={data} options={options} />
            </Paper>
        </Grid>
    );
};
PostPerDayChart.displayName = "PostPerDayChart";
export default PostPerDayChart;
