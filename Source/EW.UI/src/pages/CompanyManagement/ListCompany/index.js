import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import { getPageName } from "../../../common/nameApp";
import { SkeletonTable } from "../../../components";
import { recruiterSelector } from "../recruiter.slice";

const ListCompany = () => {
    const recruiter = useSelector(recruiterSelector);
    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "companyName", headerName: "Tên công ti", width: 200 },
        { field: "phoneNumber", headerName: "Số điện thoại", width: 160 },
        {
            field: "email",
            headerName: "email",
            width: 160,
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            width: 160,
        },
        {
            field: "updatedDate",
            headerName: "Lần cuối cập nhật",
            width: 160,
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 160,
            renderCell: (cellValues) => {
                switch (cellValues.row?.status) {
                    case 0:
                        return (
                            <Button variant="contained" color="secondary">
                                Chờ xét
                            </Button>
                        );
                    case 2:
                        return (
                            <Button variant="contained" color="success">
                                Hoạt động
                            </Button>
                        );
                    default:
                        return (
                            <Button variant="contained" color="error">
                                Vô hiệu hóa
                            </Button>
                        );
                }
            },
        },
    ];
    useEffect(() => {
        document.title = getPageName("Công ti");
    }, []);
    return (
        <>
            {recruiter.status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper style={{ width: "100%" }}>
                    <DataGrid
                        rows={recruiter.companies}
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

export default ListCompany;
