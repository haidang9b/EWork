import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import React, { useState } from "react";
import "./create-recruiter.css";
import RecruitmentImgDefault from "../../assets/images/recruitment-img.jpg";
import { Send } from "@mui/icons-material";
import Notification from "../../components/Notification";
import { ValidateEmail } from "../../common/validateEmail";
const CreateRecruiter = () => {
    const [fullName, setFullName] = useState("");
    const [position, setPosition] = useState("");
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "error",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (fullName.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập họ và tên",
                type: "error",
            });
        } else if (position.length < 2) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập chức vụ",
                type: "error",
            });
        } else if (phoneNumber.length < 10) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập số điện thoại hợp lệ",
                type: "error",
            });
        } else if (ValidateEmail(email) === false) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập email công ti hợp lệ",
                type: "error",
            });
        } else if (companyName.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập tên công ty hợp lệ",
                type: "error",
            });
        } else if (address.length < 6) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập địa chỉ công ty hợp lệ",
                type: "error",
            });
        }
        if (error.length > 0) {
        }
    };
    return (
        <Container>
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
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <TextField
                            label="Chức vụ"
                            variant="standard"
                            placeholder="Chức vụ"
                            fullWidth
                            required
                            onChange={(e) => setPosition(e.target.value)}
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
                                onChange={(e) => setPhoneNumber(e.target.value)}
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
                                onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setCompanyName(e.target.value)}
                        />

                        <TextField
                            label="Địa chỉ công ty"
                            variant="standard"
                            placeholder="Địa chỉ công ty"
                            fullWidth
                            required
                            onChange={(e) => setAddress(e.target.value)}
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
            <Notification notify={notify} setNotify={setNotify} />
        </Container>
    );
};

export default CreateRecruiter;
