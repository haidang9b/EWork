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
    addProjectThunk,
    profileSelector,
    removeProjectThunk,
    updateProjectThunk,
} from "../profile.slice";

const DEFAULT_VALUE_ID = -1;

const ProjectInput = ({
    projectName,
    customerName,
    from,
    to,
    description,
    isAdd,
    id,
}) => {
    const projectNameRef = useRef();
    const customerNameRef = useRef();
    const [dateTo, setDateTo] = useState(to);
    const [dateFrom, setDateFrom] = useState(from);
    const [editor, setEditor] = useState(null);
    const dispatch = useDispatch();
    const { setNotify } = useNotify();
    const handleSave = async () => {
        if (projectNameRef.current?.value?.length < 3) {
            setNotify({
                isOpen: true,
                title: isAdd ? "Thêm dự án đã làm" : "Cập nhật dự án đã làm",
                message: "Vui lòng nhập tên dự án đã làm",
                type: "error",
            });
            projectNameRef.current.focus();
            return;
        }

        if (customerNameRef.current.value?.length < 3) {
            setNotify({
                isOpen: true,
                title: isAdd ? "Thêm dự án đã làm" : "Cập nhật dự án đã làm",
                message: "Vui lòng nhập tên khách hàng của dự án",
                type: "error",
            });
            customerNameRef.current.focus();
            return;
        }
        if (isAdd && DEFAULT_VALUE_ID === id) {
            const obj = {
                from: moment(dateFrom).format(),
                to: moment(dateTo).format(),
                projectName: projectNameRef.current?.value,
                customerName: customerNameRef.current?.value,
                description: editor?.root?.innerHTML,
            };
            const resultDispatch = await dispatch(
                addProjectThunk(obj)
            ).unwrap();

            setNotify({
                isOpen: true,
                title: "Thêm dự án đã làm",
                message: resultDispatch?.message,
                type: resultDispatch?.isSuccess ? "success" : "error",
            });
        } else {
            const obj = {
                from: moment(dateFrom).format(),
                to: moment(dateTo).format(),
                projectName: projectNameRef.current?.value,
                customerName: customerNameRef.current?.value,
                description: editor?.root?.innerHTML,
                id,
            };
            const resultDispatch = await dispatch(
                updateProjectThunk(obj)
            ).unwrap();

            setNotify({
                isOpen: true,
                title: "Cập nhật dự án đã làm",
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
                        defaultValue={projectName}
                        inputRef={projectNameRef}
                        label="Tên dự án đã làm"
                        placeholder="Nhập tên dự án đã làm"
                        fullWidth
                    />
                </Box>
                <Box marginTop={1} marginBottom={1}>
                    <TextField
                        variant="outlined"
                        defaultValue={customerName}
                        inputRef={customerNameRef}
                        label="Tên khách hàng của dự án"
                        placeholder="Nhập tên khách hàng của dự án"
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
                    Lưu dự án
                </Button>
            </Grid>
        </>
    );
};

const ProjectItem = ({
    projectName,
    customerName,
    from,
    to,
    description,
    id,
}) => {
    const { setNotify } = useNotify();
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "Xác nhận xóa dự án đã làm",
        subtitle: `Bạn có muốn xóa dự án ${projectName} không?`,
    });
    const handleRemove = () => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            onConfirm: async () => {
                const resultDispatch = await dispatch(
                    removeProjectThunk(id)
                ).unwrap();
                setNotify({
                    isOpen: true,
                    title: "Xóa dự án đã làm",
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
                    <ProjectInput
                        isAdd={false}
                        customerName={customerName}
                        projectName={projectName}
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
                            {projectName}
                            {" - "} {customerName}
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

const Projects = () => {
    const { projects } = useSelector(profileSelector);
    const [addForms, setAddForms] = useState([]);
    const handleAddForms = () => {
        const inputState = {
            customerName: "",
            projectName: "",
            from: moment(),
            to: moment(),
            description: "",
        };
        setAddForms((prev) => [...prev, inputState]);
    };
    return (
        <>
            <div className="profile__header">Dự án đã làm</div>
            <div>
                {projects.map((item) => (
                    <ProjectItem
                        key={JSON.stringify(item)}
                        customerName={item.customerName}
                        projectName={item.projectName}
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
                    <ProjectInput
                        key={JSON.stringify(item)}
                        customerName={item.customerName}
                        projectName={item.projectName}
                        from={item.from}
                        to={item.to}
                        description={item.description}
                        id={DEFAULT_VALUE_ID}
                        isAdd={true}
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
Projects.displayName = "Projects";

export default Projects;
