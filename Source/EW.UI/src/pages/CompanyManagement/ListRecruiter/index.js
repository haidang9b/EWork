import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import { getPageName } from "../../../common/nameApp";
import { SkeletonTable } from "../../../components";
import { recruiterSelector } from "../recruiter.slice";

const ListRecruiter = () => {
    const recruiter = useSelector(recruiterSelector);
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
        },
    ];
    useEffect(() => {
        document.title = getPageName("Nhà tuyển dụng");
    }, []);
    return (
        <>
            {recruiter.status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper style={{ width: "100%" }}>
                    <DataGrid
                        rows={recruiter.recruiters}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight={true}
                        disableSelectionOnClick
                    />
                </Paper>
            )}
        </>
    );
};

export default ListRecruiter;
