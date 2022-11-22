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
                    key={Math.random()}
                    variant="rounded"
                    width="10%"
                    height={40}
                    animation="wave"
                />
                <Skeleton
                    key={Math.random()}
                    variant="rounded"
                    width="10%"
                    height={40}
                    animation="wave"
                />
                <Skeleton
                    key={Math.random()}
                    variant="rounded"
                    width="10%"
                    height={40}
                    animation="wave"
                />
                <Skeleton
                    key={Math.random()}
                    variant="rounded"
                    width="10%"
                    height={40}
                    animation="wave"
                />
            </Stack>
            {Array.apply(0, Array(10)).map(function (x, index) {
                return (
                    <>
                        <Divider />
                        <Skeleton
                            key={Math.random()}
                            variant="rounded"
                            sx={{
                                margin: "1% 2% 1% 2%",
                            }}
                            width={"96%"}
                            height={40}
                            animation="wave"
                        />
                    </>
                );
            })}
        </Paper>
    );
};
export default SkeletonTable;
