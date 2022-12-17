import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { getRolesThunk, getUsersThunk } from "./users.slice";
import { getPageName } from "../../common/nameApp";
import TableAccount from "./TableAccount";
import UserDialog from "./UserModal";

const AccountManagement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = getPageName("Quản lý tài khoản");
        dispatch(getUsersThunk());
        dispatch(getRolesThunk());
    }, [dispatch]);
    const [userDialog, setUserDialog] = useState({
        isOpen: false,
        title: "",
        data: null,
        isUpdate: false,
    });

    const addNewAccount = () => {
        setUserDialog({
            ...userDialog,
            isOpen: true,
            isUpdate: false,
            data: null,
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
            <TableAccount
                userDialog={userDialog}
                setUserDialog={setUserDialog}
            />
            <UserDialog userDialog={userDialog} setUserDialog={setUserDialog} />
        </Container>
    );
};

export default AccountManagement;
