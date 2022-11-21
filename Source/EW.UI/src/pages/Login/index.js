import React, { useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { GoogleLogin } from "react-google-login";
import {
    CardActions,
    CardContent,
    Divider,
    Grid,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { SendSharp } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import {
    handleLoginThunk,
    handleLoginGoogleThunk,
    authSelector,
} from "../../redux/auth.slice";
import { gapi } from "gapi-script";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { Status } from "../../common/constants";
import Notification from "../../components/Notification";
import { getPageName } from "../../common/nameApp";
const Login = () => {
    const auth = useSelector(authSelector);
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "error",
    });
    const dispatch = useDispatch();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const handleSubmit = async () => {
        if (usernameRef.current?.value?.length === 0) {
            setNotify({
                ...notify,
                isOpen: true,
                message: "Vui lòng nhập tài khoản",
                type: "error",
            });
            usernameRef.current.focus();
            return;
        } else if (passwordRef.current?.value?.length === 0) {
            setNotify({
                ...notify,
                isOpen: true,
                message: "Vui lòng nhập mật khẩu",
                type: "error",
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
            ...notify,
            isOpen: true,
            message: res.message,
            type: res.isSuccess ? "success" : "error",
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
                ...notify,
                isOpen: true,
                message: res.message,
                type: res.isSuccess ? "success" : "error",
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
    }, [clientId, auth]);

    return (
        <>
            {auth && auth.status === Status.succeeded ? (
                <Navigate to="/dashboard" replace />
            ) : auth.status === Status.loading ? (
                <Loading />
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
                                width: { sx: "100%", sm: "100%", md: "50%" },
                            }}
                            style={{
                                padding: "8px",
                            }}
                        >
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
                                    />
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Stack minWidth="100%">
                                    <Button
                                        type="button"
                                        variant="contained"
                                        startIcon={<SendSharp />}
                                        onClick={handleSubmit}
                                        sx={{
                                            minWidth: "100%",
                                        }}
                                    >
                                        Đăng nhập
                                    </Button>
                                    <br />
                                    <Divider>Hoặc</Divider>
                                    <br />
                                    <GoogleLogin
                                        clientId={clientId}
                                        buttonText="Đăng nhập Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={"single_host_origin"}
                                    />
                                </Stack>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Notification notify={notify} setNotify={setNotify} />
                </Container>
            )}
        </>
    );
};

export default Login;
