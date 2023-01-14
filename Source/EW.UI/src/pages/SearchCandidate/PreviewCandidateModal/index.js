import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFileUpload from "../../../hook/useFileUpload";
import useNotify from "../../../hook/useNotify";
import { ProfileRender } from "../../Profile/MakeCVTemplate";
import { recruitmentPostSelector } from "../../RecruitmentPost/recruitmentPost.slice";
import { markCandidateThunk } from "../searchCandidate.slice";

const DEFAULT_VALUE_RECRUITMENT_POST = 0;

/**
 * component PreviewCandidateModal help business to preview candidate
 * @param {object} props
 * @param {object} props.previewCandidateDialog
 * @param {function} props.setPreviewCandidateDialog
 * @example
 * <PreviewCandidateModal previewCandidateDialog={previewCandidateDialog} setPreviewCandidateDialog={setPreviewCandidateDialog} />
 */
const PreviewCandidateModal = ({
    previewCandidateDialog,
    setPreviewCandidateDialog,
}) => {
    const dispatch = useDispatch();
    const handleClose = () => {
        setPreviewCandidateDialog({
            ...previewCandidateDialog,
            isOpen: false,
        });
    };
    const [isFetching, setIsFetching] = React.useState(false);
    const [currentRecruitmentPost, setCurrentRecruitmentPost] = React.useState(
        DEFAULT_VALUE_RECRUITMENT_POST
    );
    const { setNotify } = useNotify();
    const descriptionRef = useRef();
    const { getFilePathUpload } = useFileUpload();
    const { posts } = useSelector(recruitmentPostSelector);
    const handleChangeRecruitmentPost = (event) => {
        setCurrentRecruitmentPost(event.target.value);
    };

    const handleMarked = async () => {
        if (currentRecruitmentPost === DEFAULT_VALUE_RECRUITMENT_POST) {
            setNotify({
                isOpen: true,
                message: "Vui lòng chọn bài đăng tuyển dụng",
                type: "error",
                title: "Đánh dấu ứng viên",
            });
            return;
        }
        setIsFetching(true);
        const obj = {
            description: descriptionRef.current.value,
            recruitmentPostId: currentRecruitmentPost,
            userId: previewCandidateDialog?.data?.userId,
            userCVId: previewCandidateDialog?.data?.cvId,
        };
        const resultDispatch = await dispatch(markCandidateThunk(obj)).unwrap();
        setNotify({
            isOpen: true,
            message: resultDispatch?.message,
            type: resultDispatch?.isSuccess ? "success" : "error",
            title: "Đánh dấu ứng viên",
        });
        setIsFetching(false);
        if (resultDispatch?.isSuccess) handleClose();
    };
    if (!previewCandidateDialog?.data)
        return (
            <>
                <Dialog
                    open={previewCandidateDialog.isOpen}
                    onClose={handleClose}
                    fullWidth
                    maxWidth="md"
                >
                    Không có dữ liệu
                </Dialog>
            </>
        );
    return (
        <Dialog
            open={previewCandidateDialog.isOpen}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                Đánh dấu ứng viên
                <LinearProgress
                    color="success"
                    sx={{
                        display: isFetching ? "block" : "none",
                    }}
                />
            </DialogTitle>
            <DialogContent>
                <ProfileRender
                    profile={previewCandidateDialog?.data}
                    fullName={previewCandidateDialog?.data?.fullName}
                />
                <Divider
                    sx={{
                        margin: "10px",
                    }}
                />
                <InputLabel>CV ứng tuyển</InputLabel>
                <a
                    className="text-link"
                    variant="contained"
                    href={
                        previewCandidateDialog?.data?.cvUrl
                            ? getFilePathUpload(
                                  previewCandidateDialog?.data?.cvUrl
                              )
                            : ""
                    }
                    target="_blank"
                    rel="noreferrer"
                >
                    {previewCandidateDialog?.data?.cvName}
                </a>
                <Divider
                    sx={{
                        margin: "10px",
                    }}
                />
                <InputLabel>Chọn bài viết ứng tuyển phù hợp</InputLabel>
                <Select
                    fullWidth
                    defaultValue={DEFAULT_VALUE_RECRUITMENT_POST}
                    onChange={handleChangeRecruitmentPost}
                >
                    <MenuItem value={DEFAULT_VALUE_RECRUITMENT_POST}>
                        <em>Chọn bài viết phù hợp</em>
                    </MenuItem>
                    {posts?.map((item) => (
                        <MenuItem key={JSON.stringify(item)} value={item.id}>
                            {item.jobTitle}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    label="Ghi chú"
                    placeholder="Vui lòng điền ghi chú cho ứng viên này(nếu có)"
                    multiline
                    minRows={5}
                    maxRows={10}
                    inputRef={descriptionRef}
                    fullWidth
                    sx={{
                        marginTop: "10px",
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color="success"
                    variant="contained"
                    onClick={handleMarked}
                    disabled={isFetching}
                >
                    Đánh dấu ứng viên
                </Button>
                <Button
                    variant="outlined"
                    color="warning"
                    onClick={handleClose}
                    disabled={isFetching}
                >
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

PreviewCandidateModal.displayName = "PreviewCandidateModal";

export default PreviewCandidateModal;
