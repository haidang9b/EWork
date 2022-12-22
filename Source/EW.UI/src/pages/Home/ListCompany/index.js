import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import { SkeletonCompanyItem } from "../../../components";
import CompanyItem from "../CompanyItem";
import { topCompanySelector } from "./topCompany.slice";

const ListCompany = () => {
    const { companies, status } = useSelector(topCompanySelector);
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

export default ListCompany;
