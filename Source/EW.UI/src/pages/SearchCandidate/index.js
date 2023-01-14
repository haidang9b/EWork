import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPageName } from "../../common/nameApp";
import { Banner, FilterArea, Hero } from "../../components";
import { getRecruitmentPostsThunk } from "../RecruitmentPost/recruitmentPost.slice";
import { getCandidatesThunk } from "./searchCandidate.slice";
import TableCandidate from "./TableCandidate";

const SearchCandidate = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = getPageName("Tìm kiếm sinh viên");
    }, []);
    useEffect(() => {
        dispatch(getCandidatesThunk());
        dispatch(getRecruitmentPostsThunk());
    }, [dispatch]);
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
                <TableCandidate />
            </Box>
        </Container>
    );
};
SearchCandidate.displayName = "SearchCandidate";
export default SearchCandidate;
