import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Paper,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ApplicationStatus, Status } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import { SkeletonTable } from "../../components";
import { getJobsAppliedThunk, jobsAppliedSelector } from "./jobsApplied.slice";
import "./ApplicationFlow.css";
import { ExpandMore } from "@mui/icons-material";
import useFileUpload from "../../hook/useFileUpload";

const TableJobsApplied = () => {
    const { applications } = useSelector(jobsAppliedSelector);
    const { getFilePathUpload } = useFileUpload();
    const columns = [
        { field: "id", headerName: "ID", width: 40 },
        {
            field: "jobTitle",
            headerName: "Bài ứng tuyển",
            width: 300,
            renderCell: (cellValues) => {
                return (
                    <Link
                        to={`/job-detail/${cellValues.row?.recruitmentPostId}`}
                        className="application-flow-table__job-title"
                    >
                        {cellValues.row?.jobTitle}
                    </Link>
                );
            },
        },
        {
            field: "companyName",
            headerName: "Tên công ty",
            width: 160,
            renderCell: (cellValues) => {
                return (
                    <Link
                        to={`/company-detail/${cellValues.row?.companyId}`}
                        className="application-flow-table__company"
                    >
                        {cellValues.row?.companyName}
                    </Link>
                );
            },
        },
        {
            field: "createdDate",
            headerName: "Ngày ứng tuyển",
            width: 160,
            renderCell: (cellValues) => {
                return moment(cellValues.row?.createdDate).format(
                    "DD/MM/yyyy HH:mm"
                );
            },
        },
        {
            field: "status",
            headerName: "Trạng thái gần nhất",
            width: 300,
            renderCell: (cellValues) => {
                let statusDetails = [];
                switch (cellValues.row?.status) {
                    case 0:
                        statusDetails = ["Nộp hồ sơ", "Đã tiếp nhận hồ sơ"];
                        break;
                    case 1:
                        statusDetails = ["Nộp hồ sơ", "Đã đánh dấu"];
                        break;
                    case 2:
                        statusDetails = [
                            "Nộp hồ sơ",
                            "Đã tiếp nhận hồ sơ",
                            "Hẹn phỏng vấn",
                        ];
                        break;
                    case 3:
                        statusDetails = [
                            "Nộp hồ sơ",
                            "Đã tiếp nhận hồ sơ",
                            "Hẹn phỏng vấn",
                            "Xong",
                        ];
                        break;
                    case 4:
                        statusDetails = [
                            "Nộp hồ sơ",
                            "Đã tiếp nhận hồ sơ",
                            "Hẹn phỏng vấn",
                            "Từ chối",
                        ];
                        break;
                    default:
                        statusDetails = ["Nộp hồ sơ", "Đã tiếp nhận hồ sơ"];
                        break;
                }
                return (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>
                                {
                                    ApplicationStatus.find(
                                        (item) =>
                                            item.value ===
                                            cellValues.row?.status
                                    ).label
                                }
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <em>
                                Lần cuối cập nhật
                                {moment(cellValues.row?.updatedDate).format(
                                    "DD/MM/yyyy HH:mm"
                                )}
                            </em>
                            <Stepper
                                activeStep={statusDetails.length - 1}
                                orientation="vertical"
                            >
                                {statusDetails.map((item) => (
                                    <Step key={item}>
                                        <StepLabel>{item}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <Typography>
                                Bạn đã ứng tuyển bằng CV{" "}
                                <a
                                    href={getFilePathUpload(
                                        cellValues.row?.cvUrl
                                    )}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {cellValues.row?.cvName}
                                </a>
                            </Typography>
                            <Typography>
                                Ghi chú: {cellValues.row?.description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            },
        },
    ];
    return (
        <>
            <Paper>
                <DataGrid
                    columns={columns}
                    rows={applications}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    autoHeight={true}
                    disableSelectionOnClick
                    getRowHeight={() => "auto"}
                />
            </Paper>
        </>
    );
};

const JobsApplied = () => {
    const dispatch = useDispatch();
    const { status } = useSelector(jobsAppliedSelector);

    useEffect(() => {
        document.title = getPageName("Việc làm đã ứng tuyển");
        dispatch(getJobsAppliedThunk());
    }, [dispatch]);
    return (
        <Container>
            <Box width="100%" marginTop={1}>
                {status === Status.loading ? (
                    <SkeletonTable />
                ) : (
                    <>
                        <TableJobsApplied />
                    </>
                )}
            </Box>
        </Container>
    );
};

JobsApplied.displayName = "JobsApplied";
export default JobsApplied;
