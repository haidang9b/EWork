import React, { useEffect } from "react";
import { getPageName } from "../../common/nameApp";
import Hero from "../../components/Hero";

const Missing = () => {
    useEffect(() => {
        document.title = getPageName("Không tìm thấy");
    }, []);
    return (
        <Hero
            title="Đường dẫn không hợp lệ"
            subtitle="Đường dẫn không hợp lệ, vui lòng truy cập vào đường dẫn hợp lệ"
        ></Hero>
    );
};

Missing.displayName = "Missing";

export default Missing;
