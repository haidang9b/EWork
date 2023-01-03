import { Delete, Edit } from "@mui/icons-material";
import { Button, Divider, Grid, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialog, RichTextEditor } from "../../../components";
import useNotify from "../../../hook/useNotify";
import {
    addEducationThunk,
    profileSelector,
    removeEducationThunk,
    updateEducationThunk,
} from "../profile.slice";
const DEFAULT_VALUE_ID = -1;

const EducationInput = ({ orgName, from, to, description, isAdd, id }) => {
    const orgNameRef = useRef();
    const [dateTo, setDateTo] = useState(to);
    const [dateFrom, setDateFrom] = useState(from);
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();
    const { setNotify } = useNotify();

    const handleSave = async () => {
        if (orgNameRef.current?.value?.length < 3) {
            setNotify({
                isOpen: true,
                title: isAdd ? "Thêm học vấn" : "Cập nhật học vấn",
                message: "Vui lòng nhập tên trung tâm giáo dục",
                type: "error",
            });
            orgNameRef.current.focus();
            return;
        }
        if (isAdd && DEFAULT_VALUE_ID === id) {
            const obj = {
                from: moment(dateFrom).format(),
                to: moment(dateTo).format(),
                orgName: orgNameRef.current?.value,
                description: editor?.root?.innerHTML,
            };
            const resultDispatch = await dispatch(
                addEducationThunk(obj)
            ).unwrap();

            setNotify({
                isOpen: true,
                title: "Thêm học vấn",
                message: resultDispatch?.message,
                type: resultDispatch?.isSuccess ? "success" : "error",
            });
        } else {
            const obj = {
                from: moment(dateFrom).format(),
                to: moment(dateTo).format(),
                orgName: orgNameRef.current?.value,
                description: editor?.root?.innerHTML,
                id,
            };
            const resultDispatch = await dispatch(
                updateEducationThunk(obj)
            ).unwrap();

            setNotify({
                isOpen: true,
                title: "Cập nhật học vấn",
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
                        defaultValue={orgName}
                        inputRef={orgNameRef}
                        label="Tên tổ chức giáo dục"
                        placeholder="Nhập tên tổ chức giáo dục"
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
                    Lưu học vấn
                </Button>
            </Grid>
        </>
    );
};

const EducationItem = ({ orgName, from, to, description, id }) => {
    const { setNotify } = useNotify();
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "Xác nhận học vấn",
        subtitle: `Bạn có muốn xóa học vấn tại ${orgName} không?`,
    });
    const handleRemove = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            onConfirm: async () => {
                const resultDispatch = await dispatch(
                    removeEducationThunk(id)
                ).unwrap();
                setNotify({
                    isOpen: true,
                    title: "Xóa học vấn",
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
                    <EducationInput
                        isAdd={false}
                        orgName={orgName}
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
                            {orgName}{" "}
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

const Educations = () => {
    const { educations } = useSelector(profileSelector);
    const [addForms, setAddForms] = useState([]);
    const handleAddForms = () => {
        const inputState = {
            orgName: "",
            from: moment(),
            to: moment(),
            description: "",
        };
        setAddForms((prev) => [...prev, inputState]);
    };
    return (
        <>
            <div className="profile__header">Học vấn</div>
            <div>
                {educations.map((item) => (
                    <EducationItem
                        key={JSON.stringify(item)}
                        orgName={item.orgName}
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
                    <EducationInput
                        key={JSON.stringify(item)}
                        orgName={item.orgName}
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

export default Educations;
