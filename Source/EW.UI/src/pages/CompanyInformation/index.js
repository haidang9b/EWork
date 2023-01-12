import { Box, Container } from "@mui/system";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../common/constants";
import { SkeletonProfile } from "../../components";
import {
    companyInformationSelector,
    getCompanyInformationThunk,
} from "./companyInformation.slice";
import "./CompanyInformation.css";
import { getPageName } from "../../common/nameApp";
const InformationCard = React.lazy(() => import("./InformationCard"));
const HeaderCard = React.lazy(() => import("./HeaderCard"));

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
                <Suspense fallback={<SkeletonProfile />}>
                    <Container>
                        <Box width="100%" marginTop={1}>
                            <HeaderCard />
                            <InformationCard />
                        </Box>
                    </Container>
                </Suspense>
            )}
        </>
    );
};

CompanyInformation.displayName = "CompanyInformation";

export default CompanyInformation;
