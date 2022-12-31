import { Send } from "@mui/icons-material";
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
    Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { func, object } from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import { RichTextEditor } from "../../../components";
import useNotify from "../../../hook/useNotify";
import { documentSelector } from "../../CVManagement/document.slice";
import { addApplicationThunk, applicationSelector } from "./application.slice";

const DEFAULT_VALUE_ID_CV_SELECTED = -1;
/**
 * UI Apply for Student
 * @param {Object} object
 * @param {Object} object.applyDialog
 * @param {Function} object.setApplyDialog
 * @returns
 * @example
 * <ApplyModal applyDialog setApplyDialog />
 */
const ApplyModal = ({ applyDialog, setApplyDialog }) => {
    const [currentCV, setCurrentCV] = useState(DEFAULT_VALUE_ID_CV_SELECTED);
    const { coverLetter, cvs } = useSelector(documentSelector);
    const { setNotify } = useNotify();
    const [editor, setEditor] = useState(null);
    const { status } = useSelector(applicationSelector);
    const dispatch = useDispatch();
    const handleClose = () => {
        setApplyDialog({
            ...applyDialog,
            isOpen: false,
        });
    };
    const handleApply = async () => {
        if (currentCV === DEFAULT_VALUE_ID_CV_SELECTED) {
            setNotify({
                isOpen: true,
                title: `Ứng tuyển công việc ${applyDialog?.jobTitle}`,
                message: "Vui lòng chọn CV hợp lệ",
                type: "error",
            });
            return;
        }
        const obj = {
            userCVId: currentCV,
            recruitmentPostId: applyDialog?.jobId,
            coverLetter: editor?.root.innerHTML,
        };
        const resultDispatch = await dispatch(
            addApplicationThunk(obj)
        ).unwrap();

        setNotify({
            isOpen: true,
            type: resultDispatch?.isSuccess ? "success" : "error",
            message: resultDispatch?.message,
            title: `Ứng tuyển công việc ${applyDialog?.jobTitle}`,
        });
        setApplyDialog({
            ...applyDialog,
            isOpen: false,
        });
    };
    return (
        <Dialog
            open={applyDialog.isOpen}
            aria-labelledby="apply-dialog-title"
            aria-describedby="apply-dialog-description"
            onClose={handleClose}
            maxWidth={"md"}
            fullWidth
        >
            <DialogTitle>Nộp đơn ứng tuyển</DialogTitle>
            <DialogContent id="apply-dialog-title">
                <Typography variant="text">
                    Chọn CV và thư giới thiệu để ứng tuyển vào vị trí{" "}
                    {applyDialog.jobTitle}
                </Typography>
                <InputLabel
                    id="apply-modal-label"
                    className="job-detail-apply-dialog__label"
                >
                    Chọn cv
                </InputLabel>
                <Select
                    labelId="apply-modal-label"
                    fullWidth
                    value={currentCV}
                    onChange={(e) => setCurrentCV(e.target.value)}
                >
                    <MenuItem value={DEFAULT_VALUE_ID_CV_SELECTED}>
                        <em>Chọn cv</em>
                    </MenuItem>
                    {cvs.map((item) => (
                        <MenuItem key={JSON.stringify(item)} value={item.id}>
                            {item.cvName}
                        </MenuItem>
                    ))}
                </Select>
                <br />
                <InputLabel className="job-detail-apply-dialog__label">
                    Thư giới thiệu
                </InputLabel>
                <RichTextEditor
                    editor={editor}
                    setEditor={setEditor}
                    initialHTML={coverLetter}
                />
            </DialogContent>
            <DialogActions>
                <Stack minWidth={"100%"}>
                    <Button
                        startIcon={<Send />}
                        fullWidth
                        variant="contained"
                        onClick={handleApply}
                        disabled={status === Status.loading}
                    >
                        Ứng tuyển
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

ApplyModal.displayName = "ApplyModal";

ApplyModal.propTypes = {
    applyDialog: object.isRequired,
    setApplyDialog: func.isRequired,
};

export default ApplyModal;
