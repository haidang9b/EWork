import { createSelector } from "@reduxjs/toolkit";
import { CompanyTypes, Status } from "../common/constants";
import { filterSelector } from "../components/FilterArea/filter.slice";
import { appliedFilterSelector } from "../components/SelectorApplied/appliedFilter.slice";
import { blogsFilterSelector } from "../components/SelectorBlogs/blogsFilter.slice";
import { jobFilterSelector } from "../components/SelectorJobsArea/jobFilter.slice";
import { appliedSelector } from "../pages/AppliedManagement/applied.slice";
import { blogsSelector } from "../pages/BlogManagement/blogs.slice";
import { jobsSelector } from "../pages/Jobs/jobs.slice";
import { searchCandidateSelector } from "../pages/SearchCandidate/searchCandidate.slice";
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

export const appliedsRemainingSelector = createSelector(
    filterSelector,
    appliedSelector,
    appliedFilterSelector,
    (filter, applies, selectors) => {
        const { text } = filter;
        const { applieds } = applies;
        const { postIds, statusSelected } = selectors;
        let appliedsRemaining = [...applieds];
        if (text) {
            appliedsRemaining = appliedsRemaining.filter(
                (item) =>
                    item.user?.fullName
                        .toLowerCase()
                        .includes(text.toLowerCase()) ||
                    item.user?.email.toLowerCase().includes(text.toLowerCase())
            );
        }

        if (postIds.length > 0) {
            appliedsRemaining = appliedsRemaining.filter((item) =>
                postIds.includes(item.post?.recruitmentPostId)
            );
        }

        if (statusSelected.length > 0) {
            appliedsRemaining = appliedsRemaining.filter((item) =>
                statusSelected.includes(item.status)
            );
        }

        return appliedsRemaining;
    }
);

export const candidateRemainingSelector = createSelector(
    filterSelector,
    searchCandidateSelector,
    (filter, searchCandidate) => {
        const { text } = filter;
        const { candidates } = searchCandidate;
        let candidateRemaining = [...candidates];
        if (text) {
            candidateRemaining = candidateRemaining.filter(
                (item) =>
                    item.fullName?.toLowerCase().includes(text.toLowerCase()) ||
                    item.emailContact
                        ?.toLowerCase()
                        .includes(text.toLowerCase()) ||
                    item.skills?.toLowerCase().includes(text.toLowerCase())
            );
        }
        return candidateRemaining;
    }
);

export const blogsRemaningSelector = createSelector(
    filterSelector,
    blogsFilterSelector,
    blogsSelector,
    (filter, categories, blogsData) => {
        const { text } = filter;
        const { blogCategories } = categories;
        const { blogs } = blogsData;
        let blogsRemaining = [...blogs];
        if (text) {
            blogsRemaining = blogsRemaining?.filter(
                (item) =>
                    item.title.toLowerCase().includes(text.toLowerCase()) ||
                    item.author.toLowerCase().includes(text.toLowerCase())
            );
        }
        if (blogCategories?.length > 0) {
            blogsRemaining = blogsRemaining.filter((item) =>
                blogCategories.includes(item.blogCategoryId)
            );
        }
        return blogsRemaining;
    }
);
