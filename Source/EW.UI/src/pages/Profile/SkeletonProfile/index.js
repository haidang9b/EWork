import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonProfile = () => {
    return (
        <>
            <Skeleton
                variant="text"
                sx={{
                    fontSize: "2.4rem",
                    minWidth: "40%",
                }}
            />
            <Skeleton
                variant="text"
                sx={{
                    fontSize: "1rem",
                    minWidth: "100%%",
                }}
            />
            <Skeleton
                variant="text"
                sx={{
                    fontSize: "1rem",
                    minWidth: "100%%",
                }}
            />
            <Skeleton
                variant="text"
                sx={{
                    fontSize: "1rem",
                    minWidth: "100%%",
                }}
            />
        </>
    );
};

export default SkeletonProfile;
