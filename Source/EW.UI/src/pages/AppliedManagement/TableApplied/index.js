import { Box, Paper } from "@mui/material";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
} from "@mui/x-data-grid";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ApplicationStatus, Status } from "../../../common/constants";
import { SkeletonTable } from "../../../components";
import useFileUpload from "../../../hook/useFileUpload";
import { appliedsRemainingSelector } from "../../../redux/selectors";
import { appliedSelector } from "../applied.slice";
import AppliedDetailModal from "../AppliedDetailModal";

const CustomToolbarExport = () => {
    return (
        <GridToolbarContainer
            sx={{
                display: "flex",
                float: "right",
            }}
        >
            <GridToolbarExport
                csvOptions={{
                    utf8WithBom: true,
                }}
            />
        </GridToolbarContainer>
    );
};

const TableApplied = () => {
    const { status } = useSelector(appliedSelector);
    const applieds = useSelector(appliedsRemainingSelector);
    const [appliedDetailDialog, setAppliedDetailDialog] = useState({
        isOpen: false,
        data: null,
    });
    const { getFilePathUpload } = useFileUpload();
    const columns = [
        {
            field: "fullName",
            headerName: "Tên ứng viên",
            width: 180,
            renderCell: (cellValues) => cellValues.row?.user?.fullName,
            valueGetter: (cellValues) => cellValues.row?.user?.fullName,
        },
        {
            field: "email",
            headerName: "Email",
            width: 160,
            renderCell: (cellValues) => cellValues.row?.user?.email,
            valueGetter: (cellValues) => cellValues.row?.user?.email,
        },
        {
            field: "phoneNumber",
            headerName: "Số điện thoại",
            width: 100,
            renderCell: (cellValues) => cellValues.row?.user?.phoneNumber,
            valueGetter: (cellValues) => cellValues.row?.user?.phoneNumber,
        },
        {
            field: "jobTitle",
            headerName: "Bài ứng tuyển",
            width: 160,
            renderCell: (cellValues) => {
                return (
                    <Link
                        to={`/job-detail/${cellValues.row?.post?.recruitmentPostId}`}
                        className="text-link-row"
                    >
                        {cellValues.row?.post?.jobTitle}
                    </Link>
                );
            },
            valueGetter: (cellValues) => cellValues.row?.post?.jobTitle,
        },
        {
            field: "createdDate",
            headerName: "Ngày ứng tuyển",
            width: 130,
            renderCell: (cellValues) =>
                moment(cellValues.row?.createdDate).format("DD/MM/yyyy HH:mm"),
        },
        {
            field: "updatedDate",
            headerName: "Lần cuối cập nhật",
            width: 130,
            renderCell: (cellValues) =>
                moment(cellValues.row?.updatedDate).format("DD/MM/yyyy HH:mm"),
        },
        {
            field: "status",
            headerName: "Trạng thái",
            width: 130,
            renderCell: (cellValues) =>
                ApplicationStatus.find(
                    (item) => item.value === cellValues.row?.status
                )?.label,
            valueGetter: (cellValues) =>
                ApplicationStatus.find(
                    (item) => item.value === cellValues.row?.status
                )?.label,
        },
        {
            field: "document",
            headerName: "Hồ sơ",
            width: 100,
            renderCell: (cellValues) => (
                <a
                    className="text-link"
                    href={
                        cellValues.row?.cv?.cvUrl
                            ? getFilePathUpload(cellValues.row?.cv?.cvUrl)
                            : ""
                    }
                    target="_blank"
                    rel="noreferrer"
                >
                    {cellValues.row?.cv?.cvName}
                </a>
            ),
            valueGetter: (cellValues) =>
                cellValues.row?.cv?.cvUrl
                    ? getFilePathUpload(cellValues.row?.cv?.cvUrl)
                    : "",
        },
    ];
    const handleViewDetailApplication = (params) => {
        const { row } = params;
        setAppliedDetailDialog({
            ...appliedDetailDialog,
            isOpen: true,
            data: row,
        });
    };
    return (
        <Box marginTop={1}>
            {status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <>
                    <Paper style={{ width: "100%" }}>
                        <DataGrid
                            components={{
                                Toolbar: CustomToolbarExport,
                            }}
                            rows={applieds}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            autoHeight={true}
                            disableSelectionOnClick
                            onRowClick={(params, event) => {
                                if (!event.ignore) {
                                    handleViewDetailApplication(params);
                                }
                            }}
                        />
                    </Paper>
                    <AppliedDetailModal
                        appliedDetailDialog={appliedDetailDialog}
                        setAppliedDetailDialog={setAppliedDetailDialog}
                    />
                </>
            )}
        </Box>
    );
};
TableApplied.displayName = "TableApplied";
export default TableApplied;
