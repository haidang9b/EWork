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
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import useNotify from "../../hook/useNotify";
import { authSelector, updatePasswordThunk } from "../../redux/auth.slice";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const { status } = useSelector(authSelector);
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();
    const formRef = useRef();
    const { setNotify } = useNotify();
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (oldPasswordRef.current.value?.length < 3) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập mật khẩu hợp lệ",
                type: "error",
                title: "Đổi mật khẩu",
            });
            oldPasswordRef.current.focus();
            return;
        }
        if (newPasswordRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                message: "Mật khẩu phải từ 6 kí tự trở lên, vui lòng nhập lại",
                type: "error",
                title: "Đổi mật khẩu",
            });
            newPasswordRef.current.focus();
            return;
        }
        if (confirmPasswordRef.current.value !== newPasswordRef.current.value) {
            setNotify({
                isOpen: true,
                message: "Mật khẩu không khớp, vui lòng nhập lại",
                type: "error",
                title: "Đổi mật khẩu",
            });
            confirmPasswordRef.current.focus();
            return;
        }
        const resultDispatch = await dispatch(
            updatePasswordThunk({
                oldPassword: oldPasswordRef.current.value,
                newPassword: newPasswordRef.current.value,
                confirmPassword: confirmPasswordRef.current.value,
            })
        ).unwrap();
        setNotify({
            isOpen: true,
            message: resultDispatch.message,
            type: resultDispatch?.isSuccess ? "success" : "error",
            title: "Đổi mật khẩu",
        });
        formRef.current.reset();
    };

    useEffect(() => {
        document.title = getPageName("Đổi mật khẩu");
    }, []);
    return (
        <Container>
            <Box width="100%" marginTop={1}>
                <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={0}
                    direction="column"
                >
                    <Card
                        sx={{
                            width: {
                                sx: "100%",
                                sm: "100%",
                                md: "50%",
                            },
                        }}
                    >
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <CardContent>
                                <Typography variant="h3">
                                    Đổi mật khẩu
                                </Typography>
                                <Typography variant="caption">
                                    Hãy sửa dụng mật khẩu mà bạn chưa từng dùng
                                    ở đâu. Nên đặt mật khẩu có ít nhất 1 ký tự
                                    chữ viết hoa, 1 ký tự số và 1 ký tự đặc biệt
                                    để đảm bảo an toàn cho tài khoản.
                                </Typography>
                                <Divider />
                                <TextField
                                    sx={{
                                        marginTop: "8px",
                                    }}
                                    label="Mật khẩu cũ"
                                    placeholder="Nhập mật khẩu cũ"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    type="password"
                                    inputRef={oldPasswordRef}
                                    autoComplete={"on"}
                                />
                                <TextField
                                    sx={{
                                        marginTop: "8px",
                                    }}
                                    label="Mật khẩu mới"
                                    placeholder="Nhập mật khẩu mới"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    type="password"
                                    inputRef={newPasswordRef}
                                    autoComplete={"on"}
                                />
                                <TextField
                                    sx={{
                                        marginTop: "8px",
                                    }}
                                    label="Mật khẩu xác minh"
                                    placeholder="Nhập mật khẩu xác minh"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    type="password"
                                    inputRef={confirmPasswordRef}
                                    autoComplete={"on"}
                                />
                            </CardContent>
                            <CardActions>
                                <Stack minWidth="100%">
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        color="success"
                                        fullWidth
                                        disabled={status === Status.loading}
                                    >
                                        Cập nhật mật khẩu
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
            </Box>
        </Container>
    );
};
UpdatePassword.displayName = "UpdatePassword";
export default UpdatePassword;
