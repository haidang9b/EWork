import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPageName } from "../../common/nameApp";
import { Banner, Hero } from "../../components";

const Home = () => {
    useEffect(() => {
        document.title = getPageName("Trang chủ");
    }, []);
    return (
        <>
            <div>
                <Hero>
                    <Banner
                        title={"EWORK"}
                        subtitle="Trang hỗ trợ tìm kiếm việc làm cho TDTU"
                    >
                        <Link to="/jobs" className="btn-banner">
                            Tìm việc
                        </Link>
                    </Banner>
                </Hero>
            </div>
        </>
    );
};

Home.displayName = "Home";

export default Home;
