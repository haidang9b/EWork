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
import { useDispatch } from "react-redux";
import { handleLogin, handleLoginGoogle } from "../../redux/auth.slice";
import useAuth from "../../hook/useAuth";
import { gapi } from "gapi-script";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const { user } = useAuth();
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
            let data = dispatch(handleLoginGoogle(obj));
            console.log(data);
        }
    };
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: "",
            });
        };
        gapi.load("client:auth2", initClient);
    });
    // if (user) {
    //     navigate("/", { replace: true });
    // }
    return (
        <Container>
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
                            Login
                        </Typography>
                        <Box pb={2}>
                            <TextField
                                label="Username"
                                variant="standard"
                                fullWidth
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                variant="standard"
                                fullWidth
                                required
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
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
                                Login
                            </Button>
                            <br />
                            <Divider>Login with</Divider>
                            <br />
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="Login With Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={"single_host_origin"}
                            />
                        </Stack>
                    </CardActions>
                </Card>
            </Grid>
        </Container>
    );
};

export default Login;
