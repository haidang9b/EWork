import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { getPageName } from "../../common/nameApp";
import SkeletonCompanyDetailHeader from "./SkeletonCompanyDetailHeader";
import "./companydetail.css";
import { useDispatch, useSelector } from "react-redux";
import {
    companyDetailSelector,
    getCompanyDetailByIdThunk,
} from "./companyDetail.slice";
import { Link, useParams } from "react-router-dom";
import { Status } from "../../common/constants";
import CompanyDetailHeader from "./CompanyDetailHeader";
import { Banner, Hero } from "../../components";
import SkeletonCompanyDetailBody from "./SkeletonCompanyDetailBody";
import CompanyDetailBody from "./CompanyDetailBody";
import SkeletonCompanyDetailFooter from "./SkeletonCompanyDetailFooter";
import CompanyDetailFooter from "./CompanyDetailFooter";

const CompanyDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { company, status } = useSelector(companyDetailSelector);
    useEffect(() => {
        dispatch(getCompanyDetailByIdThunk(id));
    }, [dispatch, id]);
    useEffect(() => {
        if (company) {
            document.title = getPageName(`${company?.companyName}`);
        } else {
            document.title = getPageName("Không tìm thấy");
        }
    }, [company]);
    if (status === Status.loading) {
        return (
            <>
                <Container>
                    <SkeletonCompanyDetailHeader />
                    <SkeletonCompanyDetailBody />
                    <SkeletonCompanyDetailFooter />
                </Container>
            </>
        );
    }
    if (company) {
        return (
            <>
                <Container>
                    <CompanyDetailHeader />
                    <CompanyDetailBody />
                    <CompanyDetailFooter />
                </Container>
            </>
        );
    }
    return (
        <>
            <Hero hero="notFoundHero">
                <Banner
                    title="Không tìm thấy công ty"
                    subtitle="Không có công ty nào từ đường dẫn này, vui lòng thử lại"
                >
                    <Link to={"/"} className="btn-banner">
                        Trang chủ
                    </Link>
                </Banner>
            </Hero>
        </>
    );
};

CompanyDetail.displayName = "CompanyDetail";
export default CompanyDetail;
