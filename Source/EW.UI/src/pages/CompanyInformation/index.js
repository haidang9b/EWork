import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../common/constants";
import { SkeletonProfile } from "../../components";
import {
    companyInformationSelector,
    getCompanyInformationThunk,
} from "./companyInformation.slice";
import "./companyinformation.css";
import InformationCard from "./InformationCard";
import HeaderCard from "./HeaderCard";
import { getPageName } from "../../common/nameApp";

const CompanyInformation = () => {
    const dispatch = useDispatch();
    const { status, information } = useSelector(companyInformationSelector);
    useEffect(() => {
        dispatch(getCompanyInformationThunk());
    }, [dispatch]);

    useEffect(() => {
        if (information?.companyName)
            document.title = getPageName(information.companyName);
    }, [information]);
    return (
        <>
            {status === Status.loading ? (
                <SkeletonProfile />
            ) : (
                <Container>
                    <Box width="100%">
                        <Box>
                            <HeaderCard />
                            <InformationCard />
                        </Box>
                    </Box>
                </Container>
            )}
        </>
    );
};

export default CompanyInformation;
