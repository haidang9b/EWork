import React, { useState, useEffect } from "react";
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
    handleLogin,
    handleLoginGoogle,
    authSelector,
} from "../../redux/auth.slice";
import { gapi } from "gapi-script";
import { Navigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { Status } from "../../common/constants";
import CustomAlert from "../../components/CustomAlert";
const Login = () => {
    const auth = useSelector(authSelector);
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => {
        dispatch(handleLogin({ username, password }));
    };

    const responseGoogle = (response) => {
        if (response.googleId !== "") {
            let { email, imageUrl, name, googleId } = response.profileObj;
            let obj = {
                email,
                imageUrl,
                name,
                googleId,
            };
            dispatch(handleLoginGoogle(obj));
        }
    };
    useEffect(() => {
        document.title = "Đăng nhập";
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            });
        };
        gapi.load("client:auth2", initClient);
    }, []);

    return (
        <>
            {auth && auth.status === Status.succeeded ? (
                <Navigate to="/dashboard" replace />
            ) : auth.status === Status.loading ? (
                <Loading />
            ) : (
                <Container>
                    {auth.status === Status.failed && (
                        <CustomAlert
                            message="Tài khoản hoặc mật khẩu không chính xác"
                            type="error"
                        />
                    )}
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
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
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                    <TextField
                                        label="Mật khẩu"
                                        variant="standard"
                                        fullWidth
                                        required
                                        type="password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
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
                </Container>
            )}
        </>
    );
};

export default Login;
