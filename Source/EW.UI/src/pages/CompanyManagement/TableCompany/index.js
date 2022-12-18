import { Button, Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import { getPageName } from "../../../common/nameApp";
import { SkeletonTable } from "../../../components";
import AddCompanyModal from "../AddCompanyModal";
import { companySelector } from "../company.slice";
import CompanyDetailModal from "../CompanyDetailModal";

const TableCompany = () => {
    const [addCompanyModal, setAddCompanyModal] = useState({
        isOpen: false,
    });
    const [companyDetailModal, setCompanyDetailModal] = useState({
        isOpen: false,
        data: null,
    });
    const { status, companies } = useSelector(companySelector);
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
            renderCell: (cellValues) => {
                return moment(cellValues.row?.updatedDate).format(
                    "DD/MM/yyyy HH:mm"
                );
            },
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 160,
            renderCell: (cellValues) => {
                switch (cellValues.row?.status) {
                    case 0:
                        return <Chip label="Chờ xét" color="warning" />;
                    case 1:
                        return <Chip label="Hoạt động" color="success" />;
                    default:
                        return <Chip label="Vô hiệu hóa" color="error" />;
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
        document.title = getPageName("Quản lý công ty");
    }, []);

    return (
        <>
            <Button
                variant="contained"
                onClick={() => {
                    setAddCompanyModal({
                        ...addCompanyModal,
                        isOpen: true,
                    });
                }}
            >
                Thêm công ty
            </Button>
            {status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper style={{ width: "100%" }}>
                    <DataGrid
                        onRowClick={handleChangeStatus}
                        rows={companies}
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
            <AddCompanyModal
                addCompanyModal={addCompanyModal}
                setAddCompanyModal={setAddCompanyModal}
            />
        </>
    );
};

export default TableCompany;
