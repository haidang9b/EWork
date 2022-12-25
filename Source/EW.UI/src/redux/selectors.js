import { createSelector } from "@reduxjs/toolkit";
import { CompanyTypes, Status } from "../common/constants";
import { filterSelector } from "../components/FilterArea/filter.slice";
import { jobFilterSelector } from "../components/SelectorJobsArea/jobFilter.slice";
import { jobsSelector } from "../pages/Jobs/jobs.slice";
import { topCompanySelector } from "./topCompany.slice";
export const statusAuthCurrentSelector = (state) => state.auth.status;
export const statusUsersCurrentSelector = (state) => state.users.status;
const RATE_USD = 24000;
const E_VALUE_VND = 0;
const E_VALUE_NEGOTIATE = 1;
export const isLoadingSelector = createSelector(
    statusAuthCurrentSelector,
    statusUsersCurrentSelector,
    (statusAuth, statusUsers) => {
        return statusAuth === Status.loading || statusUsers === Status.loading;
    }
);

export const companiesRemainingSelector = createSelector(
    topCompanySelector,
    filterSelector,
    (topComapny, filter) => {
        const { companies } = topComapny;
        const { text } = filter;
        if (text) {
            return companies?.filter(
                (item) =>
                    item.companyName
                        ?.toLowerCase()
                        .includes(text?.toLowerCase()) ||
                    CompanyTypes.filter(
                        (type) => type.value === item?.companyType
                    )[0]
                        ?.label.toLowerCase()
                        .includes(text?.toLowerCase())
            );
        }
        return companies;
    }
);

export const salaryMaxSelector = createSelector(jobsSelector, (jobs) => {
    const { posts } = jobs;
    let listSalaryUSD = posts.map((item) => {
        if (item.currency === E_VALUE_VND) {
            return Math.max(
                item.salaryFrom / RATE_USD,
                item.salaryTo / RATE_USD
            );
        }
        return Math.max(item.salaryFrom, item.salaryTo);
    });
    return Math.max.apply(Math, listSalaryUSD);
});

export const jobsRemainingSelector = createSelector(
    jobsSelector,
    filterSelector,
    jobFilterSelector,
    (jobs, filter, selectors) => {
        const { posts } = jobs;
        const { text } = filter;
        const { salary, workingTypes, companyTypes } = selectors;
        let jobsRemaining = [...posts];
        if (text) {
            jobsRemaining = jobsRemaining.filter(
                (item) =>
                    item.jobTitle.toLowerCase().includes(text.toLowerCase()) ||
                    item.companyName
                        .toLowerCase()
                        .includes(text.toLowerCase()) ||
                    item.techStacks.toLowerCase().includes(text.toLowerCase())
            );
        }
        if (salary >= 0) {
            jobsRemaining = jobsRemaining.filter(
                (post) =>
                    post.salaryType === E_VALUE_NEGOTIATE ||
                    post.salaryFrom >= salary ||
                    post.salaryTo >= salary
            );
        }
        if (workingTypes.length > 0) {
            jobsRemaining = jobsRemaining.filter((item) =>
                workingTypes.includes(item.workingType)
            );
        }

        if (companyTypes.length > 0) {
            jobsRemaining = jobsRemaining.filter((item) =>
                companyTypes.includes(item.companyType)
            );
        }
        return jobsRemaining;
    }
);
