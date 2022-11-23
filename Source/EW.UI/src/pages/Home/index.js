import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { getPageName } from "../../common/nameApp";
import SearchBar from "../../components/SearchBar";
import Benifit from "./Benifit";
import ListCompanySponsor from "./ListCompanySponsor";

const Home = () => {
    useEffect(() => {
        document.title = getPageName("Trang chủ");
    }, []);
    return (
        <Container>
            <SearchBar />
            <Benifit />
            <ListCompanySponsor />
        </Container>
    );
};

Home.displayName = "Home";

export default Home;
