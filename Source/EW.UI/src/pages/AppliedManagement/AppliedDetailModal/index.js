import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import useFileUpload from "../../../hook/useFileUpload";
import { ApplicationStatus, Status } from "../../../common/constants";
import { useDispatch, useSelector } from "react-redux";
import { appliedSelector, updateProgressAppliedThunk } from "../applied.slice";
import useNotify from "../../../hook/useNotify";
import { func, object } from "prop-types";

const DEFAULT_VALUE_STATUS = 1;

/**
 * Modal for update progress of application
 * @param {Object} object
 * @param {Object} object.appliedDetailDialog
 * @param {Function} object.setAppliedDetailDialog
 * @example
 * <AppliedDetailModal/>
 */
const AppliedDetailModal = ({
    appliedDetailDialog,
    setAppliedDetailDialog,
}) => {
    const dispatch = useDispatch();
    const { data } = appliedDetailDialog;
    const { setNotify } = useNotify();
    const { getFilePathUpload } = useFileUpload();
    const { status } = useSelector(appliedSelector);
    const [currentStatus, setCurrentStatus] = useState(DEFAULT_VALUE_STATUS);
    const handleClose = () => {
        setAppliedDetailDialog({
            ...appliedDetailDialog,
            isOpen: false,
        });
    };
    const descriptionRef = useRef();
    useEffect(() => {
        if (data) setCurrentStatus(data?.status);
    }, [data]);
    if (!data) {
        return (
            <>
                <Dialog
                    open={appliedDetailDialog.isOpen}
                    onClose={handleClose}
                    maxWidth={"md"}
                    fullWidth
                >
                    Không có dữ liệu
                </Dialog>
            </>
        );
    }
    const handleSubmit = async () => {
        if (data) {
            const obj = {
                id: data?.id,
                status: currentStatus,
                description: descriptionRef.current.value,
            };
            const resultDispatch = await dispatch(
                updateProgressAppliedThunk(obj)
            ).unwrap();
            setNotify({
                isOpen: true,
                message: resultDispatch?.message,
                type: resultDispatch?.isSuccess ? "success" : "error",
                title: "Cập nhật thông tin ứng tuyển",
            });

            handleClose();
        }
    };
    return (
        <Dialog
            open={appliedDetailDialog.isOpen}
            onClose={handleClose}
            maxWidth={"md"}
            fullWidth
        >
            <DialogTitle>Thông tin chi tiết</DialogTitle>
            <DialogContent>
                <Box className="applied-modal__row">
                    <InputLabel className="applied-modal__label">
                        Tên ứng viên
                    </InputLabel>
                    <Typography
                        variant="text"
                        className="applied-modal__header"
                    >
                        {data?.user?.fullName}
                    </Typography>
                </Box>
                <Box className="applied-modal__row">
                    <InputLabel className="applied-modal__label">
                        Email
                    </InputLabel>
                    <Typography
                        variant="text"
                        className="applied-modal__header"
                    >
                        {data?.user?.email}
                    </Typography>
                </Box>
                <Box className="applied-modal__row">
                    <InputLabel className="applied-modal__label">
                        Số điện thoại
                    </InputLabel>
                    <Typography
                        variant="text"
                        className="applied-modal__header"
                    >
                        {data?.user?.phoneNumber}
                    </Typography>
                </Box>
                <Box className="applied-modal__row">
                    <InputLabel className="applied-modal__label">
                        Hồ sơ ứng tuyển
                    </InputLabel>
                    <a
                        className="applied-modal__header text-link-row"
                        href={
                            data?.cv?.cvUrl
                                ? getFilePathUpload(data?.cv?.cvUrl)
                                : ""
                        }
                        target="_blank"
                        rel="noreferrer"
                    >
                        {data?.cv?.cvName}
                    </a>
                </Box>
                <Box className="applied-modal__row">
                    <InputLabel className="applied-modal__label">
                        Bài ứng tuyển
                    </InputLabel>
                    <Link
                        to={`/job-detail/${data?.post?.recruitmentPostId}`}
                        className="text-link-row applied-modal__header"
                    >
                        {data?.post?.jobTitle}
                    </Link>
                </Box>
                <Box className="applied-modal__row">
                    <InputLabel
                        id="applied-modal-status"
                        className="applied-modal__label"
                    >
                        Trạng thái ứng tuyển
                    </InputLabel>
                    <Select
                        labelId="applied-modal-status"
                        defaultValue={data?.status}
                        fullWidth
                        onChange={(e) => setCurrentStatus(e.target.value)}
                    >
                        {ApplicationStatus.map((item) => (
                            <MenuItem
                                key={JSON.stringify(item)}
                                value={item.value}
                            >
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Box className="applied-modal__row">
                    <TextField
                        defaultValue={data?.description}
                        label="Ghi chú"
                        placeholder="Vui lòng điền ghi chú cho ứng viên này(nếu có)"
                        multiline
                        minRows={5}
                        maxRows={10}
                        inputRef={descriptionRef}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Stack minWidth={"100%"}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleSubmit}
                        disabled={status === Status.loading}
                    >
                        Cập nhật trạng thái
                    </Button>
                    <LinearProgress
                        sx={{
                            display:
                                status === Status.loading ? "block" : "none",
                        }}
                    />
                </Stack>
            </DialogActions>
        </Dialog>
    );
};

AppliedDetailModal.displayName = "AppliedDetailModal";

AppliedDetailModal.propTypes = {
    appliedDetailDialog: object.isRequired,
    setAppliedDetailDialog: func.isRequired,
};

export default AppliedDetailModal;
