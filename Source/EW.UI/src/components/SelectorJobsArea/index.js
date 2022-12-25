import { Grid, InputLabel, MenuItem, Paper, Select } from "@mui/material";
import { number } from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CompanyTypes, WorkingTypes } from "../../common/constants";
import { jobFilterActions } from "./jobFilter.slice";

const DEFAULT_VALUE_MIN_SALARY = 0;

/**
 * UI of job filter with working types, company type, salary
 * @example
 * <SelectorJobsArea salaryMax={1000} />
 */
const SelectorJobsArea = () => {
    const dispatch = useDispatch();
    const [currentWorkingTypes, setCurrentWorkingTypes] = useState([
        ...WorkingTypes,
    ]);
    const [currentCompanyTypes, setCurrentCompanyTypes] = useState([
        ...CompanyTypes,
    ]);
    const [currentRangeSalary, setCurrentRangeSalary] = useState(
        DEFAULT_VALUE_MIN_SALARY
    );
    const handleChangeWorkingTypes = (event) => {
        const {
            target: { value },
        } = event;
        setCurrentWorkingTypes(value);
        dispatch(
            jobFilterActions.workingTypesFilterChange(
                value.map((item) => item.value)
            )
        );
    };

    const handleChangeCurrentCompanyTypes = (event) => {
        const {
            target: { value },
        } = event;
        setCurrentCompanyTypes(value);
        dispatch(
            jobFilterActions.companyTypesFilterChange(
                value.map((item) => item.value)
            )
        );
    };

    const handleChangeSalary = (event) => {
        const {
            target: { value },
        } = event;
        setCurrentRangeSalary(value);
        dispatch(jobFilterActions.salaryFilterChange(value));
    };
    return (
        <Paper>
            <Grid container padding={2} marginTop={1}>
                <Grid item xs={12} sm={12} md={3} lg={3} padding={1}>
                    <InputLabel id="selector-job-area-working-type">
                        Hình thức làm việc
                    </InputLabel>
                    <Select
                        labelId="selector-job-area-working-type"
                        multiple
                        value={currentWorkingTypes}
                        fullWidth
                        onChange={handleChangeWorkingTypes}
                        renderValue={(selected) =>
                            selected.map((item) => item.label)?.join(",")
                        }
                    >
                        {WorkingTypes.map((item) => (
                            <MenuItem key={JSON.stringify(item)} value={item}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} padding={1}>
                    <InputLabel id="selector-job-area-company-type">
                        Loại hình công ty
                    </InputLabel>
                    <Select
                        labelId="selector-job-area-company-type"
                        multiple
                        value={currentCompanyTypes}
                        fullWidth
                        onChange={handleChangeCurrentCompanyTypes}
                        renderValue={(selected) =>
                            selected.map((item) => item.label)?.join(",")
                        }
                    >
                        {CompanyTypes.map((item) => (
                            <MenuItem key={JSON.stringify(item)} value={item}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} padding={1}>
                    <InputLabel id="selector-job-area-salary-range">
                        Lương (USD)
                    </InputLabel>
                    <Select
                        labelId="selector-job-area-salary-range"
                        value={currentRangeSalary}
                        fullWidth
                        onChange={handleChangeSalary}
                    >
                        <MenuItem
                            value={DEFAULT_VALUE_MIN_SALARY}
                        >{`Mặc định`}</MenuItem>
                        <MenuItem value={500}>{`Từ 500 USD`}</MenuItem>
                        <MenuItem value={1000}>{`Từ 1000 USD`}</MenuItem>
                        <MenuItem value={2000}>{`Từ 2000 USD`}</MenuItem>
                        <MenuItem value={3000}>{`Từ 3000 USD`}</MenuItem>
                        <MenuItem value={4000}>{`Từ 4000 USD`}</MenuItem>
                        <MenuItem value={5000}>{`Từ 5000 USD`}</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        </Paper>
    );
};

SelectorJobsArea.displayName = "SelectorJobsArea";
SelectorJobsArea.propTypes = {
    salaryMax: number.isRequired,
};
SelectorJobsArea.defaultProps = {
    salaryMax: 1000,
};
export default SelectorJobsArea;
