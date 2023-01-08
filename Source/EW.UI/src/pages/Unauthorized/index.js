import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPageName } from "../../common/nameApp";
import { Banner, Hero } from "../../components";

const Unauthorized = () => {
    useEffect(() => {
        document.title = getPageName("Không có quyền");
    }, []);
    return (
        <Hero hero="authHero">
            <Banner
                title="Không có quyền truy cập"
                subtitle="Bạn không có quyền truy cập trang web này, vui lòng truy cập vào đường dẫn khác"
            >
                <Link className="btn-banner" to={"/"}>
                    Trang chủ
                </Link>
            </Banner>
        </Hero>
    );
};

Unauthorized.displayName = "Unauthorized";

export default Unauthorized;
