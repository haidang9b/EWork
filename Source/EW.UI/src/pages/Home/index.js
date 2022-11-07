import { Container } from "@mui/system";
import React from "react";
import SearchBar from "../../components/SearchBar";
import Benifit from "./Benifit";
import ListCompanySponsor from "./ListCompanySponsor";

const Home = () => {
    return (
        <Container>
            <SearchBar />
            <Benifit />
            <ListCompanySponsor />
        </Container>
    );
};

export default Home;
