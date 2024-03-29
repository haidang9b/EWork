import { SendSharp } from "@mui/icons-material";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Grid,
    LinearProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Status } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import { ValidateEmail } from "../../common/validator";
import useNotify from "../../hook/useNotify";
import {
    authSelector,
    handleRecoverAccountThunk,
} from "../../redux/auth.slice";
const RecoveryAccount = () => {
    const { setNotify } = useNotify();
    const dispatch = useDispatch();
    const { status } = useSelector(authSelector);
    const usernameRef = useRef();
    const emailRef = useRef();
    const formRef = useRef();
    useEffect(() => {
        document.title = getPageName("Khôi phục tài khoản");
    }, []);

    const handleRecover = async (e) => {
        e.preventDefault();
        if (usernameRef.current?.value.length === 0) {
            setNotify({
                type: "error",
                title: "Khôi phục tài khoản",
                isOpen: true,
                message: "Tài khoản không hợp lệ, vui lòng nhập lại",
            });
            usernameRef.current.focus();
            return;
        } else if (!ValidateEmail(emailRef.current.value)) {
            setNotify({
                type: "error",
                title: "Khôi phục tài khoản",
                isOpen: true,
                message: "Email không hợp lệ, vui lòng nhập lại",
            });
            emailRef.current.focus();
            return;
        }

        let obj = {
            email: emailRef.current.value,
            username: usernameRef.current.value,
        };
        let resultDispatch = await dispatch(
            handleRecoverAccountThunk(obj)
        ).unwrap();

        setNotify({
            isOpen: true,
            title: "Khôi phục tài khoản",
            message: resultDispatch?.message,
            type: resultDispatch?.isSuccess ? "success" : "error",
        });
        formRef.current.reset();
    };
    return (
        <Container>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                sx={{
                    padding: "2%",
                }}
            >
                <Card
                    sx={{
                        width: {
                            sx: "100%",
                            sm: "100%",
                            md: "60%",
                        },
                    }}
                >
                    <form ref={formRef} onSubmit={handleRecover}>
                        <CardContent>
                            <Box pb={2}>
                                <Typography variant="h3">
                                    Khôi phục mật khẩu
                                </Typography>
                                <TextField
                                    label="Tên người dùng"
                                    variant="standard"
                                    placeholder="Nhập username"
                                    fullWidth
                                    required
                                    inputRef={usernameRef}
                                />
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    placeholder="Nhập email"
                                    fullWidth
                                    required
                                    inputRef={emailRef}
                                />
                            </Box>
                            <Link to={"/login"} className="text-link">
                                Quay lại đăng nhập
                            </Link>
                        </CardContent>

                        <Divider />
                        <CardActions>
                            <Stack minWidth={"100%"}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth={true}
                                    type="submit"
                                    startIcon={<SendSharp />}
                                    disabled={status === Status.loading}
                                >
                                    Khôi phục
                                </Button>
                                <LinearProgress
                                    color="success"
                                    sx={{
                                        display:
                                            status === Status.loading
                                                ? "block"
                                                : "none",
                                    }}
                                />
                            </Stack>
                        </CardActions>
                    </form>
                </Card>
            </Grid>
        </Container>
    );
};

RecoveryAccount.dispalyName = "RecoveryAccount";

export default RecoveryAccount;
