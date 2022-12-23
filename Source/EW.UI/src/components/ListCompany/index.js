import { Grid } from "@mui/material";
import React from "react";
import { Status } from "../../common/constants";
import { SkeletonCompanyItem, CompanyItem } from "..";
import { array, string } from "prop-types";

/**
 * render List company
 * @param {object} object
 * @param {Array} object.companies
 * @param {string} object.status
 * @example
 * <ListCompany/>
 */
const ListCompany = ({ companies, status }) => {
    const displayLoading = () => {
        const tags = [];
        for (let i = 0; i < 8; i++) {
            tags.push(<SkeletonCompanyItem key={i} />);
        }
        return tags;
    };
    return (
        <Grid container alignItems={"stretch"}>
            {status === Status.loading ? (
                displayLoading()
            ) : (
                <>
                    {companies.map((item) => (
                        <CompanyItem
                            key={JSON.stringify(item)}
                            id={item.id}
                            name={item.companyName}
                            avatarUrl={item.avatarUrl}
                            companyType={item.companyType}
                            jobsHiring={item.jobsHiring}
                        />
                    ))}
                </>
            )}
        </Grid>
    );
};

ListCompany.displayName = "ListCompany";

ListCompany.propTypes = {
    companies: array,
    status: string,
};

ListCompany.defaultProps = {
    companies: [],
    status: Status.idle,
};
export default ListCompany;
