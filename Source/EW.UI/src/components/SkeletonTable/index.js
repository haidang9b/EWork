import React from "react";
import { Stack } from "@mui/system";
import { Paper, Skeleton, Divider } from "@mui/material";

const SkeletonTable = () => {
    return (
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "8px" }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                sx={{
                    padding: "2% 2% 1% 2%",
                }}
            >
                <Skeleton
                    variant="rounded"
                    width="10%"
                    height={20}
                    animation="wave"
                />
                <Skeleton
                    variant="rounded"
                    width="10%"
                    height={20}
                    animation="wave"
                />
                <Skeleton
                    variant="rounded"
                    width="10%"
                    height={20}
                    animation="wave"
                />
                <Skeleton
                    variant="rounded"
                    width="10%"
                    height={20}
                    animation="wave"
                />
            </Stack>
            <Divider />
            <Skeleton
                variant="rounded"
                sx={{
                    margin: "1% 2% 1% 2%",
                }}
                width={"96%"}
                height={20}
                animation="wave"
            />
            <Divider />
            <Skeleton
                variant="rounded"
                sx={{
                    margin: "1% 2% 1% 2%",
                }}
                width={"96%"}
                height={20}
                animation="wave"
            />
            <Divider />
            <Skeleton
                variant="rounded"
                sx={{
                    margin: "1% 2% 1% 2%",
                }}
                width={"96%"}
                height={20}
                animation="wave"
            />
            <Divider />
            <Skeleton
                variant="rounded"
                sx={{
                    margin: "1% 2% 1% 2%",
                }}
                width={"96%"}
                height={20}
                animation="wave"
            />
            <Divider />
            <Skeleton
                variant="rounded"
                sx={{
                    margin: "1% 2% 1% 2%",
                }}
                width={"96%"}
                height={20}
                animation="wave"
            />
            <Divider />
            <Skeleton
                variant="rounded"
                sx={{
                    margin: "1% 2% 1% 2%",
                }}
                width={"96%"}
                height={20}
                animation="wave"
            />
            <Divider />
            <Skeleton
                variant="rounded"
                sx={{
                    margin: "1% 2% 1% 2%",
                }}
                width={"96%"}
                height={20}
                animation="wave"
            />
            <Divider />
            <Skeleton
                variant="rounded"
                sx={{
                    margin: "1% 2% 1% 2%",
                }}
                width={"96%"}
                height={20}
                animation="wave"
            />
            <Divider />
            <Skeleton
                variant="rounded"
                sx={{
                    margin: "1% 2% 1% 2%",
                }}
                width={"96%"}
                height={20}
                animation="wave"
            />
            <Divider />
            <Skeleton
                variant="rounded"
                sx={{
                    margin: "1% 2% 1% 2%",
                }}
                width={"96%"}
                height={20}
                animation="wave"
            />
        </Paper>
    );
};
export default SkeletonTable;
