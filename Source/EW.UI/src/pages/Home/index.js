import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPageName } from "../../common/nameApp";
import { ListCompany, SearchBar } from "../../components";
import {
    topCompanySelector,
    getTopCompaniesThunk,
} from "../../redux/topCompany.slice";
import Benifit from "./Benifit";

const Home = () => {
    const dispatch = useDispatch();
    const { companies, status } = useSelector(topCompanySelector);
    useEffect(() => {
        document.title = getPageName("Trang chủ");
        dispatch(getTopCompaniesThunk());
    }, [dispatch]);
    return (
        <Container>
            <SearchBar />
            <Benifit />
            <ListCompany companies={companies} status={status} />
        </Container>
    );
};

Home.displayName = "Home";

export default Home;
