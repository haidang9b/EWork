import {
    Edit,
    Email,
    GitHub,
    LinkedIn,
    Phone,
    Place,
} from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ValidateEmail, ValidatePhoneNumber } from "../../../common/validator";
import useAuth from "../../../hook/useAuth";
import useNotify from "../../../hook/useNotify";

import { profileSelector, updateContactThunk } from "../profile.slice";

const Contacts = () => {
    const { user } = useAuth();
    const { setNotify } = useNotify();
    const { profile } = useSelector(profileSelector);
    const [isEditing, setIsEditing] = useState(false);
    const addressRef = useRef();
    const githubRef = useRef();
    const linkedinRef = useRef();
    const emailContactRef = useRef();
    const phoneNumberRef = useRef();
    const objectiveRef = useRef();
    const dispatch = useDispatch();
    const onClickUpdate = async () => {
        if (addressRef.current?.value < 3) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập địa chỉ hợp lệ",
                title: "Chỉnh sửa thông tin liên hệ",
                type: "error",
            });
            addressRef.current.focus();
            return;
        }
        if (githubRef.current?.value < 3) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập đường dẫn github hợp lệ",
                title: "Chỉnh sửa thông tin liên hệ",
                type: "error",
            });
            githubRef.current.focus();
            return;
        }
        if (linkedinRef.current?.value < 3) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập đường dẫn LinkedIn hợp lệ",
                title: "Chỉnh sửa thông tin liên hệ",
                type: "error",
            });
            linkedinRef.current.focus();
            return;
        }
        if (!ValidateEmail(emailContactRef.current.value)) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập email liên hệ hợp lệ",
                title: "Chỉnh sửa thông tin liên hệ",
                type: "error",
            });
            emailContactRef.current.focus();
            return;
        }
        if (!ValidatePhoneNumber(phoneNumberRef.current.value)) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập số điện thoại liên hệ hợp lệ",
                title: "Chỉnh sửa thông tin liên hệ",
                type: "error",
            });
            phoneNumberRef.current.focus();
            return;
        }
        if (objectiveRef.current?.value < 3) {
            setNotify({
                isOpen: true,
                message: "Vui lòng nhập mục tiêu nghề nghiệp hợp lệ",
                title: "Chỉnh sửa thông tin liên hệ",
                type: "error",
            });
            objectiveRef.current.focus();
            return;
        }
        let obj = {
            github: githubRef.current?.value,
            address: addressRef.current?.value,
            phoneNumber: phoneNumberRef.current?.value,
            linkedin: linkedinRef.current?.value,
            emailContact: emailContactRef.current?.value,
            objective: objectiveRef.current?.value,
        };

        const resultDispatch = await dispatch(updateContactThunk(obj)).unwrap();
        setIsEditing(false);
        setNotify({
            isOpen: true,
            message: resultDispatch.message,
            title: "Chỉnh sửa thông tin liên hệ",
            type: resultDispatch.isSuccess ? "success" : "error",
        });
    };
    return (
        <>
            <div className="profile__header">
                Thông tin liên hệ{" "}
                <IconButton
                    aria-label="edit"
                    size="small"
                    disabled={isEditing}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    <Edit />
                </IconButton>
            </div>
            <div className="profile-contact__name">{user?.given_name}</div>

            <div className="d-flex profile-contact__row">
                <div className="profile__icon">
                    <Place />
                </div>
                <div className="profile-contact__input">
                    {isEditing ? (
                        <TextField
                            label="Địa chỉ"
                            placeholder="Nhập địa chỉ"
                            required
                            fullWidth
                            defaultValue={profile?.address}
                            inputRef={addressRef}
                            variant="outlined"
                        />
                    ) : (
                        <>
                            {profile?.address ? (
                                profile?.address
                            ) : (
                                <em>Chưa có thông tin</em>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="d-flex profile-contact__row">
                <div className="profile__icon">
                    <GitHub />
                </div>
                <div className="profile-contact__input">
                    {isEditing ? (
                        <TextField
                            label="Đường dẫn Github"
                            placeholder="Đường dẫn Github"
                            required
                            fullWidth
                            defaultValue={profile?.github}
                            inputRef={githubRef}
                            variant="outlined"
                        />
                    ) : (
                        <>
                            {profile?.github ? (
                                profile?.github
                            ) : (
                                <em>Chưa có thông tin</em>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="d-flex profile-contact__row">
                <div className="profile__icon">
                    <LinkedIn />
                </div>
                <div className="profile-contact__input">
                    {isEditing ? (
                        <TextField
                            label="Đường dẫn LinkedIn"
                            placeholder="Đường dẫn LinkedIn"
                            required
                            fullWidth
                            defaultValue={profile?.linkedin}
                            inputRef={linkedinRef}
                            variant="outlined"
                        />
                    ) : (
                        <>
                            {profile?.linkedin ? (
                                profile?.linkedin
                            ) : (
                                <em>Chưa có thông tin</em>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="d-flex profile-contact__row">
                <div className="profile__icon">
                    <Email />
                </div>
                <div className="profile-contact__input">
                    {isEditing ? (
                        <TextField
                            label="Địa chỉ Email"
                            placeholder="Địa chỉ Email"
                            required
                            fullWidth
                            defaultValue={profile?.emailContact}
                            inputRef={emailContactRef}
                            variant="outlined"
                        />
                    ) : (
                        <>
                            {profile?.emailContact ? (
                                profile?.emailContact
                            ) : (
                                <em>Chưa có thông tin</em>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="d-flex profile-contact__row">
                <div className="profile__icon">
                    <Phone />
                </div>
                <div className="profile-contact__input">
                    {isEditing ? (
                        <TextField
                            label="Số điện thoại liên hệ"
                            placeholder="Số điện thoại liên hệ"
                            required
                            fullWidth
                            defaultValue={profile?.phoneNumber}
                            inputRef={phoneNumberRef}
                            variant="outlined"
                        />
                    ) : (
                        <>
                            {profile?.phoneNumber ? (
                                profile?.phoneNumber
                            ) : (
                                <em>Chưa có thông tin</em>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="profile-contact__row">
                <div style={{ fontSize: "1.3rem" }}>Mục tiêu</div>
                <div className="profile-contact__input">
                    {isEditing ? (
                        <TextField
                            label="Mục tiêu nghề nghiệp"
                            placeholder="Mục tiêu nghề nghiệp"
                            required
                            fullWidth
                            multiline
                            minRows={5}
                            maxRows={5}
                            defaultValue={profile?.objective}
                            inputRef={objectiveRef}
                            variant="outlined"
                        />
                    ) : (
                        <>
                            {profile?.objective ? (
                                profile?.objective
                            ) : (
                                <em>Chưa có thông tin</em>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div
                style={{
                    display: isEditing ? "flex" : "none",
                    marginLeft: "16px",
                }}
            >
                <div>
                    <Button
                        color="success"
                        variant="contained"
                        onClick={onClickUpdate}
                    >
                        Cập nhật
                    </Button>
                </div>
                <div>
                    <Button
                        color="warning"
                        variant="outlined"
                        onClick={() => setIsEditing(!isEditing)}
                        sx={{
                            marginLeft: "8px",
                        }}
                    >
                        Hủy
                    </Button>
                </div>
            </div>
        </>
    );
};

Contacts.displayName = "Contacts";
export default Contacts;
