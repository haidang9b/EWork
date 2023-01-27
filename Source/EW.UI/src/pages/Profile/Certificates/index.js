import { Delete, Edit } from "@mui/icons-material";
import { Button, Divider, Grid, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialog, RichTextEditor } from "../../../components";
import useNotify from "../../../hook/useNotify";
import {
    addCertificateThunk,
    profileSelector,
    removeCertificateThunk,
    updateCertificateThunk,
} from "../profile.slice";
const DEFAULT_VALUE_ID = -1;

const CertificateInput = ({
    certificateName,
    from,
    to,
    description,
    isAdd,
    id,
}) => {
    const certificateNameRef = useRef();
    const [dateTo, setDateTo] = useState(to);
    const [dateFrom, setDateFrom] = useState(from);
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();
    const { setNotify } = useNotify();

    const handleSave = async () => {
        if (certificateNameRef.current?.value?.length < 3) {
            setNotify({
                isOpen: true,
                title: isAdd ? "Thêm chứng chỉ" : "Cập nhật chứng chỉ",
                message: "Vui lòng nhập tên chứng chỉ",
                type: "error",
            });
            certificateNameRef.current.focus();
            return;
        }
        if (isAdd && DEFAULT_VALUE_ID === id) {
            const obj = {
                from: moment(dateFrom).format(),
                to: moment(dateTo).format(),
                certificateName: certificateNameRef.current?.value,
                description: editor?.root?.innerHTML,
            };
            const resultDispatch = await dispatch(
                addCertificateThunk(obj)
            ).unwrap();

            setNotify({
                isOpen: true,
                title: "Thêm chứng chỉ",
                message: resultDispatch?.message,
                type: resultDispatch?.isSuccess ? "success" : "error",
            });
        } else {
            const obj = {
                from: moment(dateFrom).format(),
                to: moment(dateTo).format(),
                certificateName: certificateNameRef.current?.value,
                description: editor?.root?.innerHTML,
                id,
            };
            const resultDispatch = await dispatch(
                updateCertificateThunk(obj)
            ).unwrap();

            setNotify({
                isOpen: true,
                title: "Cập nhật chứng chỉ",
                message: resultDispatch?.message,
                type: resultDispatch?.isSuccess ? "success" : "error",
            });
        }
    };
    return (
        <>
            <Grid padding={2}>
                <Box>
                    <TextField
                        variant="outlined"
                        defaultValue={certificateName}
                        inputRef={certificateNameRef}
                        label="Tên chứng chỉ đạt được"
                        placeholder="Nhập tên chứng chỉ đạt được"
                        fullWidth
                    />
                </Box>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        paddingTop={1}
                        paddingBottom={1}
                    >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                                label="Từ"
                                inputFormat="DD/MM/YYYY"
                                value={dateFrom}
                                maxDate={moment()}
                                onChange={(value) => setDateFrom(value)}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        paddingTop={1}
                        paddingBottom={1}
                    >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                                label="Tới"
                                inputFormat="DD/MM/YYYY"
                                value={dateTo}
                                onChange={(value) => setDateTo(value)}
                                renderInput={(params) => (
                                    <TextField {...params} />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <RichTextEditor
                    editor={editor}
                    setEditor={setEditor}
                    initialHTML={description}
                />
                <Button variant="contained" fullWidth onClick={handleSave}>
                    Lưu chứng chỉ
                </Button>
            </Grid>
        </>
    );
};

const CertificateItem = ({ certificateName, from, to, description, id }) => {
    const { setNotify } = useNotify();
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "Xác nhận xóa chứng chỉ",
        subtitle: `Bạn có muốn xóa chứng chỉ ${certificateName} không?`,
    });
    const handleRemove = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            onConfirm: async () => {
                const resultDispatch = await dispatch(
                    removeCertificateThunk(id)
                ).unwrap();
                setNotify({
                    isOpen: true,
                    title: "Xóa chứng chỉ",
                    message: resultDispatch?.message,
                    type: resultDispatch?.isSuccess ? "success" : "error",
                });
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false,
                });
            },
        });
    };
    const handleEdit = () => {
        setIsEditing(true);
    };
    return (
        <>
            {isEditing ? (
                <>
                    <CertificateInput
                        isAdd={false}
                        certificateName={certificateName}
                        from={from}
                        to={to}
                        description={description}
                        id={id}
                    />
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                            setIsEditing(false);
                        }}
                    >
                        Hủy
                    </Button>
                </>
            ) : (
                <>
                    <div>
                        <div className="profile-work-history-item__company-name">
                            {certificateName}{" "}
                            <IconButton
                                disabled={isEditing}
                                onClick={handleEdit}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                onClick={handleRemove}
                                disabled={isEditing}
                            >
                                <Delete />
                            </IconButton>
                        </div>
                        <em>
                            {moment(from).format("MM/YYYY")} -{" "}
                            {moment(to).format("MM/YYYY")}
                        </em>
                        <div
                            className="article"
                            dangerouslySetInnerHTML={{
                                __html: description,
                            }}
                        ></div>
                    </div>
                </>
            )}

            <ConfirmDialog
                confirm={confirmDialog}
                setConfirm={setConfirmDialog}
            />
        </>
    );
};

const Certificates = () => {
    const { certificates } = useSelector(profileSelector);
    const [addForms, setAddForms] = useState([]);
    const handleAddForms = () => {
        const inputState = {
            certificateName: "",
            from: moment(),
            to: moment(),
            description: "",
        };
        setAddForms((prev) => [...prev, inputState]);
    };
    return (
        <>
            <div className="profile__header">Chứng chỉ</div>
            <div>
                {certificates?.map((item) => (
                    <CertificateItem
                        key={JSON.stringify(item)}
                        certificateName={item.certificateName}
                        from={item.from}
                        to={item.to}
                        description={item.description}
                        id={item.id}
                    />
                ))}
            </div>
            <Divider />
            <div>
                {addForms.map((item) => (
                    <CertificateInput
                        key={JSON.stringify(item)}
                        certificateName={item.certificateName}
                        from={item.from}
                        to={item.to}
                        description={item.description}
                        isAdd={true}
                        id={DEFAULT_VALUE_ID}
                    />
                ))}
            </div>
            <div>
                <Button
                    onClick={() => {
                        handleAddForms();
                    }}
                    variant="contained"
                    color="success"
                    className="profile-work-history-item__btn"
                >
                    Thêm mới
                </Button>
            </div>
        </>
    );
};

Certificates.displayName = "Certificates";

export default Certificates;
