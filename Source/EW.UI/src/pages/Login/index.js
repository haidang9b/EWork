import React, { useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { GoogleLogin } from "react-google-login";
import {
    CardActions,
    CardContent,
    Divider,
    Grid,
    LinearProgress,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { SendSharp } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { gapi } from "gapi-script";
import {
    handleLoginThunk,
    handleLoginGoogleThunk,
    authSelector,
} from "../../redux/auth.slice";
import { Link, Navigate } from "react-router-dom";
import { Status } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import useNotify from "../../hook/useNotify";
import useAuth from "../../hook/useAuth";

const Login = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const { user } = useAuth();
    const { status } = useSelector(authSelector);
    const { setNotify } = useNotify();
    const dispatch = useDispatch();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usernameRef.current?.value?.length === 0) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập tài khoản",
                type: "error",
                title: "Đăng nhập",
            });
            usernameRef.current.focus();
            return;
        } else if (passwordRef.current?.value?.length === 0) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập mật khẩu",
                type: "error",
                title: "Đăng nhập",
            });
            passwordRef.current.focus();
            return;
        }
        let obj = {
            Username: usernameRef.current.value,
            Password: passwordRef.current.value,
        };
        let res = await dispatch(handleLoginThunk(obj)).unwrap();
        setNotify({
            isOpen: true,
            message: res.message,
            type: res.isSuccess ? "success" : "error",
            title: "Đăng nhập",
        });
    };

    const responseGoogle = async (response) => {
        if (response.googleId !== "") {
            let { email, imageUrl, name, googleId } = response.profileObj;
            let obj = {
                email,
                imageUrl,
                name,
                googleId,
            };
            let res = await dispatch(handleLoginGoogleThunk(obj)).unwrap();
            setNotify({
                isOpen: true,
                message: res.message,
                type: res.isSuccess ? "success" : "error",
                title: "Đăng nhập",
            });
        }
    };
    useEffect(() => {
        document.title = getPageName("Đăng nhập");
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            });
        };
        gapi.load("client:auth2", initClient);
    }, [clientId]);

    return (
        <>
            {status === Status.succeeded && user ? (
                <Navigate to="/" replace />
            ) : (
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
                                    md: "50%",
                                },
                            }}
                            style={{
                                padding: "8px",
                            }}
                        >
                            <form>
                                <CardContent>
                                    <Typography variant="h3" gutterBottom>
                                        Thông tin đăng nhập
                                    </Typography>
                                    <Box pb={2}>
                                        <TextField
                                            label="Tài khoản"
                                            variant="standard"
                                            fullWidth
                                            required
                                            inputRef={usernameRef}
                                        />
                                        <TextField
                                            label="Mật khẩu"
                                            variant="standard"
                                            fullWidth
                                            required
                                            type="password"
                                            inputRef={passwordRef}
                                            autoComplete={"on"}
                                        />
                                    </Box>
                                    <Link
                                        to={"/recover"}
                                        className="text-link "
                                    >
                                        Quên mật khẩu?
                                    </Link>
                                </CardContent>
                                <CardActions>
                                    <Stack minWidth="100%">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="success"
                                            startIcon={<SendSharp />}
                                            onClick={handleSubmit}
                                            sx={{
                                                minWidth: "100%",
                                            }}
                                            disabled={status === Status.loading}
                                        >
                                            Đăng nhập
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
                                        <br />
                                        <Divider>Hoặc</Divider>
                                        <br />
                                        <GoogleLogin
                                            disabled={status === Status.loading}
                                            clientId={clientId}
                                            buttonText="Đăng nhập Google"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={"single_host_origin"}
                                        />
                                    </Stack>
                                </CardActions>
                            </form>
                        </Card>
                    </Grid>
                </Container>
            )}
        </>
    );
};

Login.displayName = "Login";

export default Login;
