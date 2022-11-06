import { Button, Grid, TextField, Typography, Box } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useState, useRef } from "react";
import "./create-recruiter.css";
import RecruitmentImgDefault from "../../assets/images/recruitment-img.jpg";
import { Send } from "@mui/icons-material";
import Notification from "../../components/Notification";
import { ValidateEmail, ValidatePhoneNumber } from "../../common/validator";

const CreateRecruiter = () => {
    const fullnameRef = useRef(null);
    const positionRef = useRef(null);
    const emailRef = useRef(null);
    const companyNameRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const addressRef = useRef(null);

    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "error",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (fullnameRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập họ và tên",
                type: "error",
            });
            fullnameRef.current.focus();
        } else if (positionRef.current.value?.length < 2) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập chức vụ",
                type: "error",
            });
            positionRef.current.focus();
        } else if (
            ValidatePhoneNumber(phoneNumberRef.current.value) === false
        ) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập số điện thoại hợp lệ",
                type: "error",
            });
            phoneNumberRef.current.focus();
        } else if (ValidateEmail(emailRef.current?.value) === false) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập email công ti hợp lệ",
                type: "error",
            });
            emailRef.current.focus();
        } else if (companyNameRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập tên công ty hợp lệ",
                type: "error",
            });
            companyNameRef.current.focus();
        } else if (addressRef.current.value?.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập địa chỉ công ty hợp lệ",
                type: "error",
            });
            addressRef.current.focus();
        }
    };
    return (
        <Container>
            <Box sx={{ borderRadius: 1 }}>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        marginTop: "10px",
                    }}
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
                            <Typography variant="h5">Doanh nghiệp</Typography>
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

                            <Button
                                type="submit"
                                variant="contained"
                                startIcon={<Send />}
                                onClick={handleSubmit}
                                sx={{
                                    minWidth: "100%",
                                    marginTop: "10px",
                                }}
                            >
                                Gửi thông tin liên hệ
                            </Button>
                        </form>
                    </Grid>
                </Stack>
            </Box>

            <Notification notify={notify} setNotify={setNotify} />
        </Container>
    );
};

export default CreateRecruiter;
