import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Status } from "../../common/constants";
import { topCompanySelector } from "../../redux/topCompany.slice";
import CompanyItem from "../CompanyItem";
import Title from "../Title";
import { Grid } from "@mui/material";
import SkeletonCompanyItem from "../SkeletonCompanyItem";

const FeaturedCompanies = () => {
    const { status, companies } = useSelector(topCompanySelector);
    const featuredCompanies = companies.filter((item) => item.featured);
    const displayLoading = () => {
        const tags = [];
        for (let i = 0; i < 3; i++) {
            tags.push(<SkeletonCompanyItem key={i} />);
        }
        return tags;
    };
    return (
        <section className="featured-companies">
            <Title title={"Top companies"} />
            <div className="divider"></div>
            <div className="featured-companies-center">
                {status === Status.loading ? (
                    displayLoading()
                ) : (
                    <Grid container>
                        {featuredCompanies.map((item) => (
                            <CompanyItem
                                key={JSON.stringify(item)}
                                id={item.id}
                                name={item.companyName}
                                avatarUrl={item.avatarUrl}
                                companyType={item.companyType}
                                jobsHiring={item.jobsHiring}
                            />
                        ))}
                    </Grid>
                )}
            </div>
            <Grid container justifyContent="center">
                <Link className="btn-banner" to={"/companies"}>
                    Xem thêm công ty
                </Link>
            </Grid>
        </section>
    );
};

FeaturedCompanies.displayName = "FeaturedCompanies";
export default FeaturedCompanies;
