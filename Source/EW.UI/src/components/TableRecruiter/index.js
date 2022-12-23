import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Status } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import AddRecruiterModal from "../AddRecruiterModal";
import { recruiterSelector } from "../../redux/recruiter.slice";
import SkeletonTable from "../SkeletonTable";

const TableRecruiter = () => {
    const [addRecruiterModal, setAddRecruiterModal] = useState({
        isOpen: false,
    });
    const { status, recruiters } = useSelector(recruiterSelector);
    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "username", headerName: "Tên tài khoản", width: 200 },
        { field: "fullName", headerName: "Họ tên", width: 160 },
        {
            field: "email",
            headerName: "email",
            width: 160,
        },
        {
            field: "phoneNumber",
            headerName: "SĐT",
            width: 160,
        },
        {
            field: "position",
            headerName: "Chức vụ",
            width: 160,
        },
        {
            field: "company.Name",
            headerName: "Tên công ty",
            width: 160,
            renderCell: (cellValues) => {
                return cellValues.row?.company?.companyName;
            },
        },
        {
            field: "updatedDate",
            headerName: "Ngày cập nhật",
            sortable: false,
            width: 160,
            renderCell: (cellValues) => {
                return moment(cellValues.row?.updatedDate).format(
                    "DD/MM/yyyy HH:mm"
                );
            },
        },
    ];
    useEffect(() => {
        document.title = getPageName("Quản lý nhà tuyển dụng");
    }, []);
    return (
        <>
            <Button
                variant="contained"
                onClick={() => {
                    setAddRecruiterModal({
                        ...addRecruiterModal,
                        isOpen: true,
                    });
                }}
            >
                Thêm nhà tuyển dụng
            </Button>
            {status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper style={{ width: "100%" }}>
                    <DataGrid
                        rows={recruiters}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight={true}
                        disableSelectionOnClick
                    />
                </Paper>
            )}
            <AddRecruiterModal
                addRecruiterModal={addRecruiterModal}
                setAddRecruiterModal={setAddRecruiterModal}
            />
        </>
    );
};

TableRecruiter.displayName = "TableRecruiter";

export default TableRecruiter;
