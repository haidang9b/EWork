import React, { useEffect } from "react";
import { getPageName } from "../../common/nameApp";
const RecruiterManagement = () => {
    useEffect(() => {
        document.title = getPageName("Quản lý nhà tuyển dụng");
    }, []);
    return <div>RecruiterManagement</div>;
};

export default RecruiterManagement;
