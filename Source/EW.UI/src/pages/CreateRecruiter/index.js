import {
    Button,
    Grid,
    TextField,
    Typography,
    Card,
    Divider,
    LinearProgress,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useRef, useEffect } from "react";
import RecruitmentImgDefault from "../../assets/images/recruitment-img.jpg";
import { Send } from "@mui/icons-material";
import { ValidateEmail, ValidatePhoneNumber } from "../../common/validator";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import "./createrecruiter.css";
import useNotify from "../../hook/useNotify";
import {
    recruiterRegisterSelector,
    recruiterRegisterThunk,
} from "./recruiterRegister.slice";

const CreateRecruiter = () => {
    const { setNotify } = useNotify();
    const dispatch = useDispatch();
    const recruiterRegister = useSelector(recruiterRegisterSelector);
    const fullnameRef = useRef(null);
    const positionRef = useRef(null);
    const emailRef = useRef(null);
    const companyNameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const addressRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    useEffect(() => {
        document.title = getPageName("Nhà tuyển dụng");
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (fullnameRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập họ và tên",
                type: "error",
                title: "Tạo tài khoản doanh nghiệp",
            });
            fullnameRef.current.focus();
            return;
        } else if (positionRef.current.value?.length < 2) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập chức vụ",
                type: "error",
                title: "Tạo tài khoản doanh nghiệp",
            });
            positionRef.current.focus();
            return;
        } else if (!ValidatePhoneNumber(phoneNumberRef.current.value)) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập số điện thoại hợp lệ",
                type: "error",
                title: "Tạo tài khoản doanh nghiệp",
            });
            phoneNumberRef.current.focus();
            return;
        } else if (!ValidateEmail(emailRef.current?.value)) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập email công ty hợp lệ",
                type: "error",
                title: "Tạo tài khoản doanh nghiệp",
            });
            emailRef.current.focus();
            return;
        } else if (companyNameRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập tên công ty hợp lệ",
                type: "error",
                title: "Tạo tài khoản doanh nghiệp",
            });
            companyNameRef.current.focus();
            return;
        } else if (addressRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập địa chỉ công ty hợp lệ",
                type: "error",
                title: "Tạo tài khoản doanh nghiệp",
            });
            addressRef.current.focus();
            return;
        } else if (usernameRef.current.value?.length < 2) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập tên đăng nhập hợp lệ",
                type: "error",
                title: "Tạo tài khoản doanh nghiệp",
            });
            usernameRef.current.focus();
            return;
        } else if (passwordRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập mật khẩu hợp lệ",
                type: "error",
                title: "Tạo tài khoản doanh nghiệp",
            });
            passwordRef.current.focus();
            return;
        } else if (confirmPasswordRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập xác nhận nhập mật khẩu hợp lệ",
                type: "error",
                title: "Tạo tài khoản doanh nghiệp",
            });
            confirmPasswordRef.current.focus();
            return;
        } else if (
            confirmPasswordRef.current.value !== passwordRef.current.value
        ) {
            setNotify({
                isOpen: true,
                message: "Mật khẩu và xác minh mật khẩu không khớp",
                type: "error",
                title: "Tạo tài khoản doanh nghiệp",
            });
            confirmPasswordRef.current.focus();
            return;
        }
        let data = {
            fullName: fullnameRef.current.value,
            position: positionRef.current.value,
            PhoneNumber: phoneNumberRef.current.value,
            email: emailRef.current.value,
            companyName: companyNameRef.current.value,
            address: addressRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };
        let result = await dispatch(recruiterRegisterThunk(data)).unwrap();

        setNotify({
            isOpen: true,
            message: result.message,
            type: result.isSuccess ? "success" : "error",
            title: "Tạo tài khoản doanh nghiệp",
        });
    };
    return (
        <Container>
            <Card
                sx={{
                    marginTop: "10px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                }}
            >
                <Stack
                    direction="row"
                    divider={
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "block",
                                },
                            }}
                        />
                    }
                    spacing={1}
                >
                    <Grid
                        sx={{
                            minWidth: {
                                xs: "0%",
                                md: "50%",
                            },
                            display: {
                                xs: "none",
                                md: "block",
                            },
                        }}
                        className="recruitment-img"
                    >
                        <img
                            src={RecruitmentImgDefault}
                            alt="EWork is the best recruitment place"
                            loading="lazy"
                        />
                    </Grid>
                    <Grid
                        sx={{
                            minWidth: {
                                xs: "100%",
                                md: "50%",
                            },
                            display: {
                                xs: "block",
                                md: "block",
                            },
                            paddingLeft: "2%",
                            paddingRight: "2%",
                        }}
                    >
                        <form>
                            <Typography variant="h5">
                                Thông tin doanh nghiệp
                            </Typography>
                            <TextField
                                label="Họ và tên"
                                variant="standard"
                                placeholder="Họ và tên"
                                fullWidth
                                required
                                inputRef={fullnameRef}
                            />
                            <TextField
                                label="Chức vụ"
                                variant="standard"
                                placeholder="Chức vụ"
                                fullWidth
                                required
                                inputRef={positionRef}
                            />
                            <Stack
                                sx={{
                                    flexDirection: {
                                        xs: "column",
                                        md: "row",
                                    },
                                }}
                            >
                                <TextField
                                    label="Số điện thoại"
                                    variant="standard"
                                    placeholder="Số điện thoại"
                                    required
                                    inputRef={phoneNumberRef}
                                    sx={{
                                        minWidth: {
                                            xs: "100%",
                                            md: "40%",
                                        },
                                        paddingRight: {
                                            md: "6px",
                                        },
                                    }}
                                />
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    placeholder="Email công ty"
                                    required
                                    inputRef={emailRef}
                                    sx={{
                                        minWidth: {
                                            xs: "100%",
                                            md: "60%",
                                        },
                                    }}
                                    type="email"
                                />
                            </Stack>

                            <TextField
                                label="Tên công ty"
                                variant="standard"
                                placeholder="Tên công ty"
                                fullWidth
                                required
                                inputRef={companyNameRef}
                            />

                            <TextField
                                label="Địa chỉ công ty"
                                variant="standard"
                                placeholder="Địa chỉ công ty"
                                fullWidth
                                required
                                inputRef={addressRef}
                            />

                            <TextField
                                label="Tài khoản"
                                variant="standard"
                                placeholder="Tài khoản đăng nhập"
                                fullWidth
                                required
                                inputRef={usernameRef}
                            />

                            <TextField
                                label="Mật khẩu"
                                variant="standard"
                                placeholder="Mật khẩu đăng nhập"
                                fullWidth
                                required
                                inputRef={passwordRef}
                                type="password"
                            />

                            <TextField
                                label="Nhập lại mật khẩu"
                                variant="standard"
                                placeholder="Nhập lại mật khẩu đăng nhập"
                                fullWidth
                                required
                                inputRef={confirmPasswordRef}
                                type="password"
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<Send />}
                                onClick={handleSubmit}
                                sx={{
                                    minWidth: "100%",
                                    marginTop: "10px",
                                }}
                                disabled={
                                    recruiterRegister.status === Status.loading
                                }
                            >
                                Gửi thông tin đăng ký
                            </Button>
                            <LinearProgress
                                sx={{
                                    display:
                                        recruiterRegister.status ===
                                        Status.loading
                                            ? "block"
                                            : "none",
                                }}
                            />
                        </form>
                    </Grid>
                </Stack>
            </Card>
        </Container>
    );
};

CreateRecruiter.displayName = "CreateRecruiter";

export default CreateRecruiter;
