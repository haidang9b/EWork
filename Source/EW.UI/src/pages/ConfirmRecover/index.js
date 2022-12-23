import { SendSharp } from "@mui/icons-material";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid,
    LinearProgress,
    TextField,
    Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Status } from "../../common/constants";
import { Hero } from "../../components";
import useNotify from "../../hook/useNotify";
import {
    authSelector,
    handleResetPasswordThunk,
    handleValidateCodeRecoverThunk,
} from "../../redux/auth.slice";
import SkeletonRecover from "./SkeletonRecover";

const ConfirmRecover = () => {
    const { setNotify } = useNotify();
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const { status } = useSelector(authSelector);
    const passwordRef = useRef();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const resultDispatch = await dispatch(
                handleValidateCodeRecoverThunk({
                    username: username,
                    code: code,
                })
            ).unwrap();
            setData(resultDispatch);
        };
        if (searchParams.get("username") && searchParams.get("code")) {
            setUsername(searchParams.get("username"));
            setCode(searchParams.get("code"));
            fetchData();
        } else {
            navigate("/login");
        }
    }, [dispatch, searchParams, username, code, navigate]);

    const handleRecover = async () => {
        if (passwordRef.current.value.length < 6) {
            setNotify({
                isOpen: true,
                message: "Mật khẩu phải từ 6 kí tự trở lên, vui lòng nhập lại",
                type: "error",
                title: "Khôi phục tài khoản",
            });
            passwordRef.current.focus();
            return;
        }

        const resultDispatch = await dispatch(
            handleResetPasswordThunk({
                username: username,
                password: passwordRef.current.value,
                code: code,
            })
        ).unwrap();

        setNotify({
            isOpen: true,
            message: resultDispatch.message,
            type: resultDispatch?.isSuccess ? "success" : "error",
            title: "Khôi phục tài khoản",
        });
    };
    if (status === Status.loading) {
        return (
            <>
                <SkeletonRecover />
            </>
        );
    }
    if (data?.isSuccess) {
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
                        <CardContent>
                            <Box pb={2}>
                                <Typography variant="h3">
                                    Khôi phục mật khẩu
                                </Typography>
                                <TextField
                                    label="Mật khẩu mới"
                                    variant="standard"
                                    placeholder="Nhập mật khẩu mới"
                                    fullWidth
                                    required
                                    inputRef={passwordRef}
                                    type="password"
                                />
                            </Box>
                        </CardContent>

                        <Divider />
                        <CardActions>
                            <Stack minWidth={"100%"}>
                                <Button
                                    variant="contained"
                                    fullWidth={true}
                                    onClick={handleRecover}
                                    startIcon={<SendSharp />}
                                    disabled={status === Status.loading}
                                >
                                    Khôi phục
                                </Button>
                                <LinearProgress
                                    sx={{
                                        display:
                                            status === Status.loading
                                                ? "block"
                                                : "none",
                                    }}
                                />
                            </Stack>
                        </CardActions>
                    </Card>
                </Grid>
            </Container>
        );
    }
    return (
        <Hero
            title={"Mã này không tồn tại"}
            subtitle={
                "Có vẻ như liên kết này đã hết hạn, vui lòng gửi yêu cầu mới để có liên kết mới"
            }
            children={<Link to="/recover">Quay về trang khôi phục</Link>}
        />
    );
};

ConfirmRecover.displayName = "ConfirmRecover";

export default ConfirmRecover;
