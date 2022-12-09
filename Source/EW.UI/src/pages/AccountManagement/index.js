import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getRolesThunk, getUsersThunk, usersSelector } from "./users.slice";
import { getPageName } from "../../common/nameApp";
import ListAccount from "./ListAccount";
import UserDialog from "./UserModal";

const AccountManagement = () => {
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);
    useEffect(() => {
        document.title = getPageName("Quản lý tài khoản");
        dispatch(getUsersThunk());
        dispatch(getRolesThunk());
    }, [dispatch]);
    const [userDialog, setUserDialog] = useState({
        isOpen: false,
        title: "",
        roles: users?.roles,
    });

    const addNewAccount = () => {
        setUserDialog({
            ...userDialog,
            isOpen: true,
            roles: users?.roles,
            title: "Thêm tài khoản",
        });
    };

    return (
        <Container
            sx={{
                marginTop: "2%",
            }}
        >
            <Button variant="contained" onClick={addNewAccount}>
                Thêm tài khoản
            </Button>
            <ListAccount />
            <UserDialog userDialog={userDialog} setUserDialog={setUserDialog} />
        </Container>
    );
};

export default AccountManagement;
