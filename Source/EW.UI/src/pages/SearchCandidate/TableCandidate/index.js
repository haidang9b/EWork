import { Paper, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import { SkeletonTable } from "../../../components";
import useFileUpload from "../../../hook/useFileUpload";
import { candidateRemainingSelector } from "../../../redux/selectors";
import PreviewCandidateModal from "../PreviewCandidateModal";
import { searchCandidateSelector } from "../searchCandidate.slice";

/**
 * This component is used to display the list of candidates
 * @returns
 */
const TableCandidate = () => {
    const [previewCandidateDialog, setPreviewCandidateDialog] = useState({
        isOpen: false,
        profile: null,
    });
    const { status } = useSelector(searchCandidateSelector);
    const candidates = useSelector(candidateRemainingSelector);
    const { getFilePathUpload } = useFileUpload();
    const columns = [
        { field: "id", headerName: "ID", width: 40, hide: true },
        { field: "fullName", headerName: "Họ và tên", width: 240 },
        {
            field: "emailContact",
            headerName: "Email liên hệ",
            width: 200,
        },
        {
            field: "phoneNumber",
            headerName: "Số điện thoại",
            width: 200,
        },
        {
            field: "address",
            headerName: "Địa chỉ",
            width: 200,
        },
        {
            field: "cv",
            headerName: "CV",
            width: 200,
            renderCell: (cellValues) => {
                return (
                    <a
                        className="text-link"
                        variant="contained"
                        href={
                            cellValues.row?.cvUrl
                                ? getFilePathUpload(cellValues.row?.cvUrl)
                                : ""
                        }
                        target="_blank"
                        rel="noreferrer"
                    >
                        {cellValues?.row?.cvUrl
                            ? cellValues.row?.cvName
                            : "Chưa có CV"}
                    </a>
                );
            },
        },
    ];
    const openModal = (params, event) => {
        if (!event.ignore) {
            setPreviewCandidateDialog({
                isOpen: true,
                data: params.row,
            });
        }
    };
    return (
        <Box>
            {status === Status.loading ? (
                <SkeletonTable />
            ) : (
                <Paper>
                    <DataGrid
                        getRowId={(row) => row.userId}
                        rows={candidates}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight={true}
                        onRowClick={openModal}
                    />
                </Paper>
            )}
            <PreviewCandidateModal
                previewCandidateDialog={previewCandidateDialog}
                setPreviewCandidateDialog={setPreviewCandidateDialog}
            />
        </Box>
    );
};
TableCandidate.dispalayName = "TableCandidate";
export default TableCandidate;
