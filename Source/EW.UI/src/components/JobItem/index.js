import { Grid } from "@mui/material";
import { number, string } from "prop-types";
import React from "react";

/**
 * Display job item from data input
 * @param {object} object
 * @param {number} object.id
 * @param {string} object.jobTitle
 * @param {string} object.techStacks
 * @param {string} object.avatarUrl
 * @param {number} object.salaryType
 * @param {number} object.salaryFrom
 * @param {number} object.salaryFrom
 * @example
 * <JobItem />
 */

const JobItem = ({
    id,
    jobTitle,
    avatarUrl,
    techStacks,
    salaryType,
    salaryFrom,
    salaryTo,
}) => {
    return (
        <Grid container>
            <Grid item sm={0} xs={0} md={3} lg={3}>
                {" "}
            </Grid>
            <Grid item sm={12} xs={12} md={9} lg={9}></Grid>
        </Grid>
    );
};

JobItem.displayName = "JobItem";
JobItem.propTypes = {
    id: number.isRequired,
    jobTitle: string.isRequired,
    avatarUrl: string.isRequired,
    techStacks: string.isRequired,
    salaryType: number.isRequired,
    salaryFrom: number,
    salaryTo: number,
};

export default JobItem;
