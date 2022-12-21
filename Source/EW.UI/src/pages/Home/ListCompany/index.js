import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import { SkeletonCompanyItem } from "../../../components";
import { companySelector } from "../../CompanyManagement/company.slice";
import CompanyItem from "../CompanyItem";

const ListCompany = () => {
    const { companies, status } = useSelector(companySelector);
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
                        />
                    ))}
                </>
            )}
        </Grid>
    );
};

export default ListCompany;
