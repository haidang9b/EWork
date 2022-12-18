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
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { CompanyStatus } from "../../../common/constants";
import useNotify from "../../../hook/useNotify";
import { editCompanyInformationThunk } from "../company.slice";
const DEFAULT_VALUE_STATUS = 0;

const CompanyDetailModal = ({ companyDetailModal, setCompanyDetailModal }) => {
    const [currentStatus, setCurrentStatus] = useState(DEFAULT_VALUE_STATUS);
    const companyNameRef = useRef();
    const addressRef = useRef();
    const taxNumberRef = useRef();
    const { data } = companyDetailModal;
    const { setNotify } = useNotify();
    const dispatch = useDispatch();
    useEffect(() => {
        setCurrentStatus(data?.status);
    }, [data]);
    const handleChange = (e) => {
        setCurrentStatus(e.target.value);
    };
    const handleClose = () => {
        setCompanyDetailModal({ ...companyDetailModal, isOpen: false });
    };

    const handleSubmit = async () => {
        if (companyNameRef?.current.value.length < 6) {
            setNotify({
                isOpen: true,
                title: "Cập nhật công ty",
                message: "Vui lòng nhập tên công ty hợp lệ",
                type: "error",
            });
            return;
        } else if (addressRef?.current.value.length < 6) {
            setNotify({
                isOpen: true,
                title: "Cập nhật công ty",
                message: "Vui lòng nhập địa chỉ công ty hợp lệ",
                type: "error",
            });
            return;
        } else if (taxNumberRef?.current.value.length < 6) {
            setNotify({
                isOpen: true,
                title: "Cập nhật công ty",
                message: "Vui lòng nhập mã số thuê hợp lệ",
                type: "error",
            });
            return;
        }
        let obj = {
            id: data?.id,
            status: currentStatus,
            companyName: companyNameRef?.current.value,
            address: addressRef?.current.value,
            taxNumber: taxNumberRef?.current.value,
        };

        const resultDispatch = await dispatch(
            editCompanyInformationThunk(obj)
        ).unwrap();

        setNotify({
            isOpen: true,
            title: "Cập nhật công ty",
            type: resultDispatch.isSuccess ? "success" : "error",
            message: resultDispatch.message,
        });
        setCompanyDetailModal({
            ...companyDetailModal,
            isOpen: false,
        });
    };

    return (
        <Dialog
            open={companyDetailModal.isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Thông tin công ty</DialogTitle>
            <DialogContent>
                <TextField
                    label="Số điện thoại công ty"
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginTop: "16px",
                        paddingBottom: "8px",
                    }}
                    disabled={true}
                    value={data?.phoneNumber}
                />
                <TextField
                    label="Email công ty"
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginTop: "16px",
                        paddingBottom: "8px",
                    }}
                    disabled={true}
                    value={data?.email}
                />
                <TextField
                    label="Tên công ty"
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginTop: "16px",
                        paddingBottom: "8px",
                    }}
                    defaultValue={data?.companyName}
                    inputRef={companyNameRef}
                />
                <TextField
                    label="Địa chỉ"
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginTop: "16px",
                        paddingBottom: "8px",
                    }}
                    defaultValue={data?.address}
                    inputRef={addressRef}
                />
                <TextField
                    label="Mã số thuế"
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginTop: "16px",
                        paddingBottom: "8px",
                    }}
                    defaultValue={data?.taxNumber}
                    inputRef={taxNumberRef}
                />
                <InputLabel id="demo-simple-select-required-label">
                    Trạng thái
                </InputLabel>
                <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label="Trạng thái"
                    fullWidth={true}
                    defaultValue={data?.status}
                    onChange={handleChange}
                >
                    {CompanyStatus.map((item) => (
                        <MenuItem value={item.value} key={JSON.stringify(item)}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth={true}
                >
                    Cập nhật
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={handleClose}
                    fullWidth={true}
                >
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
};

CompanyDetailModal.displayName = "CompanyDetailModal";
CompanyDetailModal.propsTypes = {
    companyDetailModal: object.isRequired,
    setCompanyDetailModal: func.isRequired,
};
export default CompanyDetailModal;
