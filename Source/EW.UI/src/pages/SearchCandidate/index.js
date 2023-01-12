import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import { getPageName } from "../../common/nameApp";
import { Banner, FilterArea, Hero } from "../../components";

const SearchCandidate = () => {
    useEffect(() => {
        document.title = getPageName("Tìm kiếm sinh viên");
    }, []);
    return (
        <Container>
            <Box sx={{ width: "100%" }} marginTop={1}>
                <Hero hero="searchCandidateHero">
                    <Banner
                        title="Tìm kiếm sinh viên"
                        subtitle="Tìm kiếm ứng viên đang có nhu cầu tìm việc"
                    ></Banner>
                </Hero>
                <FilterArea label={"Tìm kiếm theo tên, kỹ năng,..."} />
            </Box>
        </Container>
    );
};

export default SearchCandidate;
