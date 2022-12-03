import { Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import { getPageName } from "../../../common/nameApp";
import { SkeletonTable } from "../../../components";
import CompanyDetailModal from "../CompanyDetailModel";
import { recruiterSelector } from "../recruiter.slice";

const ListCompany = () => {
    const [companyDetailModal, setCompanyDetailModal] = useState({
        isOpen: false,
        data: null,
    });
    const recruiter = useSelector(recruiterSelector);
    const columns = [
        { field: "id", headerName: "ID", width: 80 },
        { field: "companyName", headerName: "Tên công ty", width: 200 },
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
                            <Typography
                                color="secondary"
                                align="justify"
                                sx={{ fontWeight: "bolder" }}
                            >
                                Chờ xét
                            </Typography>
                        );
                    case 1:
                        return (
                            <Typography
                                color="success"
                                align="justify"
                                sx={{ fontWeight: "bolder" }}
                            >
                                Hoạt động
                            </Typography>
                        );
                    default:
                        return (
                            <Typography
                                color="error"
                                align="justify"
                                sx={{ fontWeight: "bolder" }}
                            >
                                Vô hiệu hóa
                            </Typography>
                        );
                }
            },
        },
    ];

    const handleChangeStatus = (params) => {
        const { row } = params;
        setCompanyDetailModal({
            ...companyDetailModal,
            isOpen: true,
            data: row,
        });
    };

    useEffect(() => {
        document.title = getPageName("công ty");
    }, []);

    return (
        <>
            {recruiter.status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper style={{ width: "100%" }}>
                    <DataGrid
                        onRowClick={handleChangeStatus}
                        rows={recruiter.companies}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight={true}
                        disableSelectionOnClick
                    />
                </Paper>
            )}
            <CompanyDetailModal
                companyDetailModal={companyDetailModal}
                setCompanyDetailModal={setCompanyDetailModal}
            />
        </>
    );
};

export default ListCompany;
