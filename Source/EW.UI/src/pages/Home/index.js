import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPageName } from "../../common/nameApp";
import { SearchBar } from "../../components";
import { getCompaniesThunk } from "../CompanyManagement/company.slice";
import Benifit from "./Benifit";
import ListCompany from "./ListCompany";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = getPageName("Trang chủ");
        dispatch(getCompaniesThunk());
    }, [dispatch]);
    return (
        <Container>
            <SearchBar />
            <Benifit />
            <ListCompany />
        </Container>
    );
};

Home.displayName = "Home";

export default Home;
