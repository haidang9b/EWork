import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { getPageName } from "../../common/nameApp";
import SkeletonGeneralInformation from "./SkeletonGeneralInformation";
import "./companydetail.css";
const CompanyDetail = () => {
    useEffect(() => {
        document.title = getPageName("Thông tin chi tiết");
    }, []);
    return (
        <>
            <Container>
                <SkeletonGeneralInformation />
            </Container>
        </>
    );
};

export default CompanyDetail;
