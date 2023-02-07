import { Grid, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationStatus } from "../../common/constants";
import useAuth from "../../hook/useAuth";
import { companySelector } from "../../pages/CompanyManagement/company.slice";
import { recruitmentPostSelector } from "../../pages/RecruitmentPost/recruitmentPost.slice";
import { appliedFilterActions } from "./appliedFilter.slice";

/**
 * Filter for applied list, this using filter by status of apply or recruitment post
 * @example
 * <SelectorApplied/>
 */
const SelectorApplied = () => {
    const { isFaculty } = useAuth();
    const [statusSelected, setStatusSelected] = useState([]);
    const [jobsSelected, setJobsSelected] = useState([]);
    const [companiesSelected, setCompaniesSelected] = useState([]);
    const { posts } = useSelector(recruitmentPostSelector);
    const { companies } = useSelector(companySelector);
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

    const handleChangeCompaniesSelected = (event) => {
        const {
            target: { value },
        } = event;
        dispatch(
            appliedFilterActions.companySelectedChange(
                value.map((item) => item.id)
            )
        );
        setCompaniesSelected(value);
    };
    useEffect(() => {
        dispatch(appliedFilterActions.postIdsChange([]));
        dispatch(appliedFilterActions.statusSelectedChange([]));
        dispatch(appliedFilterActions.companySelectedChange([]));
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
            {isFaculty ? (
                <Grid
                    container
                    paddingLeft={2}
                    paddingRight={2}
                    paddingBottom={2}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        paddingLeft={1}
                        paddingRight={1}
                        paddingBottom={1}
                    >
                        <InputLabel id="selector-companies-applied-working-type">
                            Công ty
                        </InputLabel>
                        <Select
                            labelId="selector-companies-applied-working-type"
                            multiple
                            placeholder="Chọn bài trạng thái"
                            value={companiesSelected}
                            fullWidth
                            onChange={handleChangeCompaniesSelected}
                            renderValue={(selected) =>
                                selected
                                    .map((item) => item.companyName)
                                    ?.join(", ")
                            }
                        >
                            {companies.map((item) => (
                                <MenuItem
                                    key={JSON.stringify(item)}
                                    value={item}
                                >
                                    {item.companyName}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
            ) : null}
        </Paper>
    );
};
SelectorApplied.displayName = "SelectorApplied";
export default SelectorApplied;
