import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { getPageName } from "../../common/nameApp";
import { Hero } from "../../components";

const Unauthorized = () => {
    useEffect(() => {
        document.title = getPageName("Không có quyền");
    }, []);
    return (
        <Hero
            title="Không có quyền truy cập"
            subtitle="Bạn không có quyền truy cập trang web này, vui lòng truy cập vào đường dẫn khác"
        >
            <Button variant="primary">Quay về trang chủ</Button>
        </Hero>
    );
};

Unauthorized.displayName = "Unauthorized";

export default Unauthorized;
