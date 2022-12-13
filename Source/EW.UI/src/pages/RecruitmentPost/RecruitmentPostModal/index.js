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
import { Currency, Role, SalaryType } from "../../../common/constants";
import { RichTextEditor } from "../../../components";
import useAuth from "../../../hook/useAuth";
import useNotify from "../../../hook/useNotify";
import { listCompanySelector } from "../../CompanyManagement/recruiter.slice";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { saveRecruitmentPostThunk } from "../recruitmentPost.slice";
const DEFAULT_VALUE_CURRENCY = -1;
const DEFAULT_VALUE_SALARY_TYPE = 1;
const DEFAULT_VALUE_COMPANY = 0;
const DEFAULT_VALUE_ID_POST = 0;
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
    const listCompanies = useSelector(listCompanySelector);
    const { setNotify } = useNotify();
    const { user } = useAuth();
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
            if (data?.jobDescription) {
                setInitialHTML(data.jobDescription);
            }
            setCurrentCurrency(data.currency);
            setSalaryFrom(data.salaryFrom);
            setSalaryTo(data.salaryTo);
        }
    }, [recruitmentPostModal]);
    const handleSubmit = async () => {
        if (
            user?.role === Role.Faculty &&
            companySelected === DEFAULT_VALUE_COMPANY
        ) {
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

        let obj = {
            id: recruitmentPostModal.isUpdate
                ? recruitmentPostModal.data.id
                : DEFAULT_VALUE_ID_POST,
            jobTitle: jobTitle,
            jobDescription: editor?.root?.innerHTML,
            salaryFrom: salaryFrom,
            salaryTo: salaryTo,
            currency: currentCurrency,
            deadline: moment(deadline).format(),
            salaryType: salaryType,
            companyId: companySelected,
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
    return (
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
                {user?.role === Role.Faculty && (
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
                            onChange={(e) => setCompanySelected(e.target.value)}
                            fullWidth
                            disabled={recruitmentPostModal.isUpdate}
                        >
                            <MenuItem value={DEFAULT_VALUE_COMPANY}>
                                <em>Chọn công ty</em>
                            </MenuItem>
                            {listCompanies.map((item) => (
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
                <InputLabel id="type-salary-selected-item">Lương</InputLabel>
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
                        <MenuItem key={JSON.stringify(item)} value={item.value}>
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
                        <MenuItem value={item.value} key={JSON.stringify(item)}>
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
                <RichTextEditor
                    initialHTML={initialHTML}
                    editor={editor}
                    setEditor={setEditor}
                />
            </DialogContent>
            <DialogActions>
                <Button fullWidth onClick={handleSubmit} variant="contained">
                    {recruitmentPostModal.isUpdate
                        ? "Cập nhật bài viết"
                        : "Thêm bài viết"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

RecruitmentPostModal.displayName = "AddRecruitmentPostModel";

RecruitmentPostModal.propsType = {
    recruitmentPostModal: object.isRequired,
    setRecruitmentPostModal: func.isRequired,
};

export default RecruitmentPostModal;
