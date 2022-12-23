import { createSelector } from "@reduxjs/toolkit";
import { CompanyType, Status } from "../common/constants";
import { filterSelector } from "../components/FilterArea/filter.slice";
import { topCompanySelector } from "./topCompany.slice";
export const statusAuthCurrentSelector = (state) => state.auth.status;
export const statusUsersCurrentSelector = (state) => state.users.status;

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
                    CompanyType.filter(
                        (type) => type.value === item?.companyType
                    )[0]
                        ?.label.toLowerCase()
                        .includes(text?.toLowerCase())
            );
        }
        return companies;
    }
);
