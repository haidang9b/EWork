import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../redux/auth.slice";
import useAuth from "../../hook/useAuth";
const Login = () => {
    const { user } = useAuth();
    console.log(user);
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => {
        console.log(username, password);
        dispatch(handleLogin({ username, password }));
    };

    const handleLoginGoogle = () => {
        console.log("Login with google");
    };
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
                            <Button
                                type="button"
                                variant="outlined"
                                startIcon={<GoogleIcon />}
                                onClick={handleLoginGoogle}
                                sx={{
                                    minWidth: "100%",
                                }}
                            >
                                Google
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
            </Grid>
        </Container>
    );
};

export default Login;
