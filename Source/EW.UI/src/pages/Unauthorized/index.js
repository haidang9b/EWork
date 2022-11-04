import React from "react";
import Hero from "../../components/Hero";

function Unauthorized() {
    return (
        <Hero
            title="Không có quyền truy cập"
            subtitle="Bạn không có quyền truy cập trang web này, vui lòng truy cập vào đường dẫn khác"
        ></Hero>
    );
}

export default Unauthorized;
