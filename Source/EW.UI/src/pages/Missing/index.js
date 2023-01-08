import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPageName } from "../../common/nameApp";
import { Banner, Hero } from "../../components";

const Missing = () => {
    useEffect(() => {
        document.title = getPageName("Không tìm thấy");
    }, []);
    return (
        <Hero hero="notFoundHero">
            <Banner
                title="Đường dẫn không hợp lệ"
                subtitle="Đường dẫn không hợp lệ, vui lòng truy cập vào đường dẫn hợp lệ"
            >
                <Link to={"/"} className="btn-banner">
                    Trang chủ
                </Link>
            </Banner>
        </Hero>
    );
};

Missing.displayName = "Missing";

export default Missing;
