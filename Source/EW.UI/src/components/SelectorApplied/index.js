import { Grid, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStatus } from "../../common/constants";
import { recruitmentPostSelector } from "../../pages/RecruitmentPost/recruitmentPost.slice";
import { appliedFilterActions } from "./appliedFilter.slice";

/**
 * Filter for applied list, this using filter by status of apply or recruitment post
 * @example
 * <SelectorApplied/>
 */
const SelectorApplied = () => {
    const [statusSelected, setStatusSelected] = useState([]);
    const [jobsSelected, setJobsSelected] = useState([]);
    const { posts } = useSelector(recruitmentPostSelector);
    const dispatch = useDispatch();
    const handleChangeStatusSelected = (event) => {
        const {
            target: { value },
        } = event;
        dispatch(
            appliedFilterActions.statusSelectedChange(
                value.map((item) => item.value)
            )
        );
        setStatusSelected(value);
    };
    const handleChangeJobSelected = (event) => {
        const {
            target: { value },
        } = event;
        dispatch(
            appliedFilterActions.postIdsChange(value.map((item) => item.id))
        );
        setJobsSelected(value);
    };
    useEffect(() => {
        dispatch(appliedFilterActions.postIdsChange([]));
        dispatch(appliedFilterActions.statusSelectedChange([]));
    }, [dispatch]);
    return (
        <Paper>
            <Grid container padding={2} marginTop={1}>
                <Grid item xs={12} sm={12} md={8} lg={8} padding={1}>
                    <InputLabel id="selector-job-area-working-type">
                        Bài tuyển dụng
                    </InputLabel>
                    <Select
                        labelId="selector-job-area-working-type"
                        multiple
                        placeholder="Chọn bài tuyển dụng"
                        value={jobsSelected}
                        fullWidth
                        onChange={handleChangeJobSelected}
                        renderValue={(selected) =>
                            selected.map((item) => item.jobTitle)?.join(", ")
                        }
                    >
                        {posts.map((item) => (
                            <MenuItem key={JSON.stringify(item)} value={item}>
                                {item.jobTitle}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} padding={1}>
                    <InputLabel id="selector-job-area-working-type">
                        Trạng thái
                    </InputLabel>
                    <Select
                        labelId="selector-job-area-working-type"
                        multiple
                        placeholder="Chọn bài trạng thái"
                        value={statusSelected}
                        fullWidth
                        onChange={handleChangeStatusSelected}
                        renderValue={(selected) =>
                            selected.map((item) => item.label)?.join(", ")
                        }
                    >
                        {ApplicationStatus.map((item) => (
                            <MenuItem key={JSON.stringify(item)} value={item}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
        </Paper>
    );
};
SelectorApplied.displayName = "SelectorApplied";
export default SelectorApplied;
