import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageName } from "../../common/nameApp";
import { Banner, FilterArea, Hero, ListCompany } from "../../components";
import { companiesRemainingSelector } from "../../redux/selectors";
import {
    getTopCompaniesThunk,
    topCompanySelector,
} from "../../redux/topCompany.slice";

const Companies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopCompaniesThunk());
        document.title = getPageName("Danh sách công ty");
    }, [dispatch]);
    const { status } = useSelector(topCompanySelector);
    const companies = useSelector(companiesRemainingSelector);
    return (
        <>
            <Hero hero="companyHero">
                <Banner
                    title="Công ty"
                    subtitle="Danh sách các công ty tại EWORK"
                ></Banner>
            </Hero>
            <Container>
                <FilterArea label="Tìm kiếm công ty theo tên, loại hình..." />
                <ListCompany status={status} companies={companies} />
            </Container>
        </>
    );
};

Companies.displayName = "Companies";
export default Companies;
