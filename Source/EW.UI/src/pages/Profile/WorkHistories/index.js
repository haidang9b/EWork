import {
    Button,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    Switch,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addWorkHistoryThunk,
    profileSelector,
    removeWorkHistoryThunk,
    updateWorkHistoryThunk,
} from "../profile.slice";
import RichTextEditor from "../../../components/RichTextEditor";
import useNotify from "../../../hook/useNotify";
import { Delete, Edit } from "@mui/icons-material";
import { ConfirmDialog } from "../../../components";

const DEFAULT_VALUE_ID = -1;

const WorkHistoryInput = ({
    companyName,
    isWorking,
    from,
    to,
    description,
    isAdd,
    id,
}) => {
    const { setNotify } = useNotify();
    const companyNameRef = useRef();
    const [isWorkingToggle, setIsWorkingToggle] = useState(isWorking);
    const [dateTo, setDateTo] = useState(to);
    const [dateFrom, setDateFrom] = useState(from);
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();
    const handleSave = async () => {
        if (companyNameRef.current?.value?.length < 3) {
            setNotify({
                isOpen: true,
                title: isAdd
                    ? "Thêm kinh nghiệm làm việc"
                    : "Cập nhật kinh nghiệm làm việc",
                message: "Vui lòng nhập tên công ty hợp lệ",
                type: "error",
            });
            companyNameRef.current.focus();
            return;
        }
        if (isAdd && DEFAULT_VALUE_ID === id) {
            const obj = {
                isWorking: isWorkingToggle,
                from: moment(dateFrom).format(),
                to: moment(dateTo).format(),
                companyName: companyNameRef.current?.value,
                description: editor?.root?.innerHTML,
            };
            const resultDispatch = await dispatch(
                addWorkHistoryThunk(obj)
            ).unwrap();

            setNotify({
                isOpen: true,
                title: "Thêm kinh nghiệm làm việc",
                message: resultDispatch?.message,
                type: resultDispatch?.isSuccess ? "success" : "error",
            });
        } else {
            const obj = {
                isWorking: isWorkingToggle,
                from: moment(dateFrom).format(),
                to: moment(dateTo).format(),
                companyName: companyNameRef.current?.value,
                description: editor?.root?.innerHTML,
                id,
            };
            const resultDispatch = await dispatch(
                updateWorkHistoryThunk(obj)
            ).unwrap();

            setNotify({
                isOpen: true,
                title: "Cập nhật kinh nghiệm làm việc",
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
                        defaultValue={companyName}
                        inputRef={companyNameRef}
                        label="Tên công ty"
                        placeholder="Nhập tên công ty"
                        fullWidth
                    />
                </Box>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={5}
                        lg={5}
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
                        md={5}
                        lg={5}
                        paddingTop={1}
                        paddingBottom={1}
                    >
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DesktopDatePicker
                                label="Tới"
                                disabled={isWorkingToggle}
                                inputFormat="DD/MM/YYYY"
                                value={dateTo}
                                onChange={(value) => setDateTo(value)}
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
                        md={2}
                        lg={2}
                        paddingTop={1}
                        paddingBottom={1}
                    >
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isWorkingToggle}
                                    onChange={() => {
                                        setIsWorkingToggle(!isWorkingToggle);
                                    }}
                                />
                            }
                            label="Đang làm việc tại đây"
                        />
                    </Grid>
                </Grid>
                <RichTextEditor
                    editor={editor}
                    setEditor={setEditor}
                    initialHTML={description}
                />
                <Button variant="contained" fullWidth onClick={handleSave}>
                    Lưu kinh nghiệm
                </Button>
            </Grid>
        </>
    );
};

const WorkHistoryItem = ({
    companyName,
    isWorking,
    from,
    to,
    description,
    id,
}) => {
    const { setNotify } = useNotify();
    const dispatch = useDispatch();
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "Xác nhận xóa kinh nghiệm",
        subtitle: `Bạn có muốn xóa việc làm tại ${companyName} không?`,
    });
    const [isEditing, setIsEditing] = useState(false);
    const handleRemove = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            onConfirm: async () => {
                const resultDispatch = await dispatch(
                    removeWorkHistoryThunk(id)
                );
                setNotify({
                    isOpen: true,
                    title: "Xóa kinh nghiệm làm việc",
                    message: resultDispatch.message,
                    type: resultDispatch.isSuccess ? "success" : "error",
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
                    <WorkHistoryInput
                        isAdd={false}
                        companyName={companyName}
                        isWorking={isWorking}
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
                            {companyName}{" "}
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
                            {isWorking
                                ? "Hiện tại"
                                : moment(to).format("MM/YYYY")}
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

const WorkHistories = () => {
    const { workHistory } = useSelector(profileSelector);
    const [addForms, setAddForms] = useState([]);
    const handleAddForms = () => {
        const inputState = {
            companyName: "",
            isWorking: true,
            from: moment(),
            to: moment(),
            description: "",
        };
        setAddForms((prev) => [...prev, inputState]);
    };
    return (
        <>
            <div className="profile__header">Kinh nghiệm làm việc</div>
            <div>
                {workHistory.map((item) => (
                    <WorkHistoryItem
                        key={JSON.stringify(item)}
                        companyName={item.companyName}
                        isWorking={item.isWorking}
                        from={item.from}
                        to={item.to}
                        description={item.description}
                        id={item.id}
                    />
                ))}
            </div>
            <Divider />
            <div className="profile-history__form-add">
                {addForms.map((item) => (
                    <WorkHistoryInput
                        key={JSON.stringify(item)}
                        companyName={item.companyName}
                        isWorking={item.isWorking}
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

export default WorkHistories;
