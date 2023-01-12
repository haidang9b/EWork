import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPageName } from "../../common/nameApp";
import { TableRecruiter } from "../../components";
import { getRecruitersThunk } from "../../redux/recruiter.slice";
const HRManagement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecruitersThunk());
        document.title = getPageName("Quản lý nhà tuyển dụng");
    }, [dispatch]);
    return (
        <Container>
            <Box width="100%" marginTop={1}>
                <TableRecruiter />
            </Box>
        </Container>
    );
};

HRManagement.displayName = "HRManagement";

export default HRManagement;
