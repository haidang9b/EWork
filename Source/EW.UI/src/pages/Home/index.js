import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPageName } from "../../common/nameApp";
import { SearchBar } from "../../components";
import Benifit from "./Benifit";
import ListCompany from "./ListCompany";
import { getTopCompaniesThunk } from "./ListCompany/topCompany.slice";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = getPageName("Trang chủ");
        dispatch(getTopCompaniesThunk());
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
