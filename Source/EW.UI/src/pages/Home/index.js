import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPageName } from "../../common/nameApp";
import { Banner, FeaturedCompanies, Hero, Services } from "../../components";
import { getTopCompaniesThunk } from "../../redux/topCompany.slice";

const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = getPageName("Trang chủ");
        dispatch(getTopCompaniesThunk());
    }, [dispatch]);
    return (
        <>
            <div>
                <Hero>
                    <Banner
                        title={"EWORK"}
                        subtitle="Trang hỗ trợ tìm kiếm việc làm cho sinh viên TDTU"
                    >
                        <Link to="/jobs" className="btn-banner">
                            Tìm việc
                        </Link>
                    </Banner>
                </Hero>
                <Services />
                <FeaturedCompanies />
            </div>
        </>
    );
};

Home.displayName = "Home";

export default Home;
