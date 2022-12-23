import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { func, object } from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Currency, SalaryType, WorkingType } from "../../../common/constants";
import {
    ConfirmDialog,
    RichTextEditor,
    TechStackSelector,
} from "../../../components";
import useAuth from "../../../hook/useAuth";
import useNotify from "../../../hook/useNotify";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import {
    deleteRecruitmentPostThunk,
    saveRecruitmentPostThunk,
} from "../recruitmentPost.slice";
import { companySelector } from "../../CompanyManagement/company.slice";
const DEFAULT_VALUE_CURRENCY = -1;
const DEFAULT_VALUE_SALARY_TYPE = 1;
const DEFAULT_VALUE_COMPANY = 0;
const DEFAULT_VALUE_ID_POST = 0;
const DEFAULT_VALUE_WORKING_TYPE = 1;
const DEFAULT_VALUE_YEAR_EXPERIENCE = 0;
/**
 * Recruitment Post can add or update data for post
 * @param recruitmentPostModal object data for recruitment post modal
 * @param setRecruitmentPostModal function setter data for recruitment post modal
 * @returns RecruitmentPostModal component
 */
const RecruitmentPostModal = ({
    recruitmentPostModal,
    setRecruitmentPostModal,
}) => {
    const dispatch = useDispatch();
    const { companies } = useSelector(companySelector);
    const { setNotify } = useNotify();
    const { isFaculty } = useAuth();
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: "",
        subtitle: "",
    });
    const [salaryType, setSalaryType] = useState(DEFAULT_VALUE_SALARY_TYPE);
    const [jobTitle, setJobTitle] = useState("");
    const [salaryFrom, setSalaryFrom] = useState(0);
    const [salaryTo, setSalaryTo] = useState(0);
    const [deadline, setDeadline] = useState(moment());
    const [initialHTML, setInitialHTML] = useState("");
    const [currentCurrency, setCurrentCurrency] = useState(
        DEFAULT_VALUE_CURRENCY
    );
    const [companySelected, setCompanySelected] = useState(
        DEFAULT_VALUE_COMPANY
    );
    const [currentWorkingType, setCurrentWorkingType] = useState(
        DEFAULT_VALUE_WORKING_TYPE
    );
    const [yearExperience, setYearExperience] = useState(
        DEFAULT_VALUE_YEAR_EXPERIENCE
    );
    const [techStacks, setTechStacks] = useState([]);
    const [editor, setEditor] = useState();
    const handleClose = () => {
        setRecruitmentPostModal({ ...recruitmentPostModal, isOpen: false });
    };
    useEffect(() => {
        if (recruitmentPostModal?.isUpdate && recruitmentPostModal?.data) {
            let { data } = recruitmentPostModal;
            if (data?.jobTitle) {
                setJobTitle(data.jobTitle);
            }
            if (data?.salaryType) {
                setSalaryType(data?.salaryType);
            }
            if (data?.companyId) {
                setCompanySelected(data.companyId);
            }
            if (data?.deadline) {
                setDeadline(data.deadline);
            }
            if (data?.workingType) {
                setCurrentWorkingType(data.workingType);
            }
            if (data?.jobDescription) {
                setInitialHTML(data.jobDescription);
            }
            setYearExperience(data.yearExperience);
            setTechStacks(data.techStacks.split(","));
            setCurrentCurrency(data.currency);
            setSalaryFrom(data.salaryFrom);
            setSalaryTo(data.salaryTo);
        }
    }, [recruitmentPostModal]);
    const handleSubmit = async () => {
        let currentTechStack = techStacks.filter((item) => item !== "");
        if (isFaculty && companySelected === DEFAULT_VALUE_COMPANY) {
            setNotify({
                isOpen: true,
                title: "Thông tin bài tuyển dụng",
                message: "Vui lòng chọn công ty cần đăng",
                type: "error",
            });
            return;
        }

        if (jobTitle.length < 1) {
            setNotify({
                isOpen: true,
                title: "Thông tin bài tuyển dụng",
                message: "Vui lòng nhập tiêu đề bài viết",
                type: "error",
            });
            return;
        }

        if ([2, 4].includes(salaryType) && salaryFrom <= 0) {
            setNotify({
                isOpen: true,
                title: "Thông tin bài tuyển dụng",
                message: "Vui lòng nhập mức lương tối thiểu hợp lệ",
                type: "error",
            });
            return;
        }

        if ([2, 3].includes(salaryType) && salaryTo <= 0) {
            setNotify({
                isOpen: true,
                title: "Thông tin bài tuyển dụng",
                message: "Vui lòng nhập mức lương đa thiểu hợp lệ",
                type: "error",
            });
            return;
        }

        if ([2].includes(salaryType) && salaryFrom >= salaryTo) {
            setNotify({
                isOpen: true,
                title: "Thông tin bài tuyển dụng",
                message: "Vui lòng nhập mức lương hợp lệ",
                type: "error",
            });
            return;
        }

        if (currentCurrency === DEFAULT_VALUE_CURRENCY) {
            setNotify({
                isOpen: true,
                title: "Thông tin bài tuyển dụng",
                message: "Vui lòng chọn đơn vị tiền tệ hợp lệ",
                type: "error",
            });
            return;
        }

        if (Number(yearExperience) < 0 || Number(yearExperience) > 50) {
            setNotify({
                isOpen: true,
                title: "Thông tin bài tuyển dụng",
                message: "Vui lòng nhập số năm kinh nghiệm yêu cầu hợp lệ",
                type: "error",
            });
            return;
        }

        if (currentTechStack.length === 0) {
            setNotify({
                isOpen: true,
                title: "Thông tin bài tuyển dụng",
                message: "Vui lòng chọn các yêu cầu kỹ thuật",
                type: "error",
            });
            return;
        }

        let obj = {
            jobTitle,
            salaryFrom,
            salaryTo,
            salaryType,
            yearExperience,
            id: recruitmentPostModal.isUpdate
                ? recruitmentPostModal.data.id
                : DEFAULT_VALUE_ID_POST,
            jobDescription: editor?.root?.innerHTML,
            currency: currentCurrency,
            deadline: moment(deadline).format(),
            companyId: companySelected,
            techStacks: currentTechStack.join(","),
            workingType: currentWorkingType,
        };
        let resultDispatch = await dispatch(
            saveRecruitmentPostThunk(obj)
        ).unwrap();
        setNotify({
            isOpen: true,
            title: "Thông tin bài tuyển dụng",
            message: resultDispatch.message,
            type: resultDispatch?.isSuccess ? "success" : "error",
        });

        setRecruitmentPostModal({
            ...recruitmentPostModal,
            isOpen: false,
        });
    };
    const handleDelete = () => {
        if (
            !recruitmentPostModal.isUpdate ||
            (recruitmentPostModal.isUpdate && !recruitmentPostModal.data?.id)
        ) {
            setNotify({
                isOpen: true,
                title: "Xóa bài viết tuyển dụng",
                message: "Bạn không thể xóa bài viết này",
                type: "error",
            });
            return;
        }

        setConfirmDialog({
            ...confirmDialog,
            isOpen: true,
            title: "Xác nhận xóa bài tuyển dụng",
            subtitle: `Bạn có muốn xóa bài viết ${recruitmentPostModal.data?.jobTitle} không?`,
            onConfirm: async () => {
                let resultDispatch = await dispatch(
                    deleteRecruitmentPostThunk(recruitmentPostModal.data?.id)
                ).unwrap();

                if (resultDispatch.isSuccess) {
                    setNotify({
                        isOpen: true,
                        title: "Xóa bài viết tuyển dụng",
                        message: resultDispatch.message,
                        type: resultDispatch.isSuccess ? "success" : "error",
                    });
                }
                setConfirmDialog({
                    ...confirmDialog,
                    isOpen: false,
                });
                setRecruitmentPostModal({
                    ...recruitmentPostModal,
                    isOpen: false,
                });
            },
        });
    };
    return (
        <>
            <Dialog
                open={recruitmentPostModal.isOpen}
                onClose={handleClose}
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle>
                    {recruitmentPostModal.isUpdate
                        ? "Cập nhật bài tuyển dụng"
                        : "Thêm bài tuyển dụng"}
                </DialogTitle>
                <DialogContent>
                    {isFaculty && (
                        <>
                            <InputLabel
                                id="company-post-selected-item"
                                sx={{
                                    marginTop: "16px",
                                }}
                            >
                                Công ty
                            </InputLabel>

                            <Select
                                label="Chọn công ty"
                                labelId="company-post-selected-item"
                                value={companySelected}
                                onChange={(e) =>
                                    setCompanySelected(e.target.value)
                                }
                                fullWidth
                                disabled={recruitmentPostModal.isUpdate}
                            >
                                <MenuItem value={DEFAULT_VALUE_COMPANY}>
                                    <em>Chọn công ty</em>
                                </MenuItem>
                                {companies.map((item) => (
                                    <MenuItem
                                        value={item.id}
                                        key={JSON.stringify(item)}
                                    >
                                        {item.companyName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </>
                    )}
                    <TextField
                        label="Tiêu đề bài tuyển dụng"
                        variant="outlined"
                        placeholder="Tiêu đề bài tuyển dụng"
                        fullWidth
                        required
                        sx={{
                            marginTop: "16px",
                            paddingBottom: "8px",
                        }}
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                    />
                    <InputLabel id="type-salary-selected-item">
                        Lương
                    </InputLabel>
                    <Select
                        labelId="type-salary-selected-item"
                        label="Đơn vị tiền tệ"
                        value={salaryType}
                        onChange={(e) => {
                            setSalaryType(e.target.value);
                        }}
                        fullWidth
                    >
                        {SalaryType.map((item) => (
                            <MenuItem
                                key={JSON.stringify(item)}
                                value={item.value}
                            >
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>

                    <TextField
                        label="Mức lương tối thiểu"
                        variant="outlined"
                        placeholder="Mức lương tối thiểu"
                        fullWidth
                        required
                        sx={{
                            marginTop: "16px",
                            paddingBottom: "8px",
                        }}
                        value={salaryFrom}
                        onChange={(e) => setSalaryFrom(e.target.value)}
                        disabled={[1, 3].includes(salaryType)}
                        type="number"
                    />
                    <TextField
                        label="Mức lương tối đa"
                        variant="outlined"
                        placeholder="Mức lương tối đa"
                        fullWidth
                        required
                        sx={{
                            paddingBottom: "16px",
                        }}
                        value={salaryTo}
                        onChange={(e) => setSalaryTo(e.target.value)}
                        disabled={[1, 4].includes(salaryType)}
                        type="number"
                    />

                    <InputLabel id="currency-selected-item">
                        Đơn vị tiền tệ
                    </InputLabel>
                    <Select
                        labelId="currency-selected-item"
                        label="Đơn vị tiền tệ"
                        value={currentCurrency}
                        onChange={(e) => {
                            setCurrentCurrency(e.target.value);
                        }}
                        fullWidth
                        sx={{
                            marginBottom: "16px",
                        }}
                    >
                        <MenuItem value={DEFAULT_VALUE_CURRENCY}>
                            <em>Chọn đơn vị tiền tệ</em>
                        </MenuItem>
                        {Currency.map((item) => (
                            <MenuItem
                                value={item.value}
                                key={JSON.stringify(item)}
                            >
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            minDate={moment()}
                            label="Deadline"
                            inputFormat="DD/MM/YYYY"
                            value={deadline}
                            onChange={(value) => setDeadline(value)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        label="Số năm kinh nghiệm"
                        variant="outlined"
                        placeholder="Số năm kinh nghiệm"
                        fullWidth
                        required
                        sx={{
                            marginTop: "16px",
                            paddingBottom: "8px",
                        }}
                        type="number"
                        value={yearExperience}
                        onChange={(e) => setYearExperience(e.target.value)}
                    />
                    <InputLabel id="currency-selected-item">
                        Hình thức làm việc
                    </InputLabel>
                    <Select
                        labelId="currency-selected-item"
                        label="Hình thức làm việc"
                        value={currentWorkingType}
                        onChange={(e) => {
                            setCurrentWorkingType(e.target.value);
                        }}
                        fullWidth
                        sx={{
                            marginBottom: "16px",
                        }}
                    >
                        {WorkingType.map((item) => (
                            <MenuItem
                                value={item.value}
                                key={JSON.stringify(item)}
                            >
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                    <TechStackSelector
                        techStacks={techStacks}
                        setTechStacks={setTechStacks}
                    />
                    <RichTextEditor
                        initialHTML={initialHTML}
                        editor={editor}
                        setEditor={setEditor}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        fullWidth
                        onClick={handleSubmit}
                        variant="contained"
                    >
                        {recruitmentPostModal.isUpdate
                            ? "Cập nhật bài viết"
                            : "Thêm bài viết"}
                    </Button>
                    <Button
                        fullWidth
                        onClick={handleDelete}
                        variant="contained"
                        sx={{
                            display: recruitmentPostModal.isUpdate
                                ? "block"
                                : "none",
                        }}
                        color="error"
                    >
                        Xóa bài viết
                    </Button>
                </DialogActions>
            </Dialog>
            <ConfirmDialog
                confirm={confirmDialog}
                setConfirm={setConfirmDialog}
            />
        </>
    );
};

RecruitmentPostModal.displayName = "AddRecruitmentPostModel";

RecruitmentPostModal.propTypes = {
    recruitmentPostModal: object.isRequired,
    setRecruitmentPostModal: func.isRequired,
};

export default RecruitmentPostModal;
