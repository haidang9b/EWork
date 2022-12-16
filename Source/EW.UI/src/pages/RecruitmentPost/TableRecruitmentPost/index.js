import { Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { func, object } from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Status, Currency } from "../../../common/constants";
import { SkeletonTable } from "../../../components";
import { recruitmentPostSelector } from "../recruitmentPost.slice";

const TableRecruitmentPost = ({
    recruitmentPostModal,
    setRecruitmentPostModal,
}) => {
    const recruitmentPosts = useSelector(recruitmentPostSelector);
    const columns = [
        { field: "id", headerName: "ID", width: 40 },
        { field: "jobTitle", headerName: "Tiêu đề bài viết", width: 240 },
        {
            field: "companyName",
            headerName: "Tên công ty",
            width: 150,
            renderCell: (cellValues) => {
                return cellValues.row?.company?.companyName;
            },
        },
        {
            field: "salary",
            headerName: "Lương",
            width: 200,
            renderCell: (cellValues) => {
                let currentCurrency = Currency.find(
                    (item) => item.value === cellValues.row?.currency
                );
                switch (cellValues.row?.salaryType) {
                    case 1:
                        return `Thương lượng`;
                    case 2:
                        return `Từ ${cellValues.row?.salaryFrom} - ${cellValues.row?.salaryTo} ${currentCurrency?.label}`;
                    case 3:
                        return `Lên tới ${cellValues.row?.salaryTo} ${currentCurrency?.label}`;
                    case 4:
                        return `Tối thiểu ${cellValues.row?.salaryFrom} ${currentCurrency?.label}`;

                    default:
                        return `Thương lượng`;
                }
            },
        },
        {
            field: "updateBy",
            headerName: "Cập nhật bởi",
            width: 200,
            renderCell: (cellValues) => {
                return cellValues.row?.updatedByUser?.fullName;
            },
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
            {recruitmentPosts.status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper style={{ width: "100%" }}>
                    <DataGrid
                        rows={recruitmentPosts.posts}
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
