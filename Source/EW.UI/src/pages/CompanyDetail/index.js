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
import { useNavigate, useParams } from "react-router-dom";
import { Status } from "../../common/constants";
import CompanyDetailHeader from "./CompanyDetailHeader";
import { Hero } from "../../components";
import { Button } from "@mui/material";
import SkeletonCompanyDetailBody from "./SkeletonCompanyDetailBody";
import CompanyDetailBody from "./CompanyDetailBody";

const CompanyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
                </Container>
            </>
        );
    }
    return (
        <>
            <Hero
                title="Không tìm thấy công ty"
                subtitle="Không có công ty nào từ đường dẫn này, vui lòng thử lại"
            >
                <Button onClick={() => navigate("/")}>
                    Quay lại trang chủ
                </Button>
            </Hero>
        </>
    );
};

CompanyDetail.displayName = "CompanyDetail";
export default CompanyDetail;
