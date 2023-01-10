import { Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { func, object } from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Status, Currency } from "../../../common/constants";
import { CustomToolbar, SkeletonTable } from "../../../components";
import { recruitmentPostSelector } from "../recruitmentPost.slice";

const TableRecruitmentPost = ({
    recruitmentPostModal,
    setRecruitmentPostModal,
}) => {
    const { status, posts } = useSelector(recruitmentPostSelector);
    const getSalaryString = (from, to, currency, type) => {
        let currentCurrency = Currency.find((item) => item.value === currency);
        switch (type) {
            case 1:
                return `Thương lượng`;
            case 2:
                return `Từ ${from} - ${to} ${currentCurrency?.label}`;
            case 3:
                return `Lên tới  ${to} ${currentCurrency?.label}`;
            case 4:
                return `Tối thiểu ${from} ${currentCurrency?.label}`;
            default:
                return `Thương lượng`;
        }
    };
    const columns = [
        { field: "id", headerName: "ID", width: 40 },
        { field: "jobTitle", headerName: "Tiêu đề bài viết", width: 240 },
        {
            field: "companyName",
            headerName: "Tên công ty",
            width: 150,
            renderCell: (cellValues) => cellValues.row?.company?.companyName,
            valueGetter: (cellValues) => cellValues.row?.company?.companyName,
        },
        {
            field: "salary",
            headerName: "Lương",
            width: 200,
            renderCell: (cellValues) =>
                getSalaryString(
                    cellValues.row?.salaryFrom,
                    cellValues.row?.salaryTo,
                    cellValues.row?.currency,
                    cellValues.row?.salaryType
                ),
            valueGetter: (cellValues) =>
                getSalaryString(
                    cellValues.row?.salaryFrom,
                    cellValues.row?.salaryTo,
                    cellValues.row?.currency,
                    cellValues.row?.salaryType
                ),
        },
        {
            field: "updateBy",
            headerName: "Cập nhật bởi",
            width: 200,
            renderCell: (cellValues) => {
                return cellValues.row?.updatedByUser?.fullName;
            },
            valueGetter: (cellValues) =>
                cellValues.row?.updatedByUser?.fullName,
        },
        {
            field: "deadline",
            headerName: "Hạn chót",
            width: 150,
            renderCell: (cellValues) => {
                return moment(cellValues.row?.deadline).format("DD/MM/yyyy");
            },
        },
        {
            field: "isActive",
            headerName: "Trạng thái",
            width: 150,
            renderCell: (cellValues) => {
                if (cellValues.row?.isActive) {
                    return <Chip label="Hoạt động" color="success" />;
                }
                return <Chip label="Không hoạt động" color="error" />;
            },
        },
    ];
    const handleChangeRecruitmentPost = (params) => {
        const { row } = params;
        setRecruitmentPostModal({
            ...recruitmentPostModal,
            isOpen: true,
            data: row,
            isUpdate: true,
        });
    };
    return (
        <>
            {status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper style={{ width: "100%" }}>
                    <DataGrid
                        components={{
                            Toolbar: CustomToolbar,
                        }}
                        rows={posts}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight={true}
                        disableSelectionOnClick
                        onRowClick={(params, event) => {
                            if (!event.ignore) {
                                handleChangeRecruitmentPost(params);
                            }
                        }}
                    />
                </Paper>
            )}
        </>
    );
};

TableRecruitmentPost.displayName = "TableRecruitmentPost";
TableRecruitmentPost.propTypes = {
    recruitmentPostModal: object.isRequired,
    setRecruitmentPostModal: func.isRequired,
};

export default TableRecruitmentPost;
