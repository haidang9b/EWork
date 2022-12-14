import { Button, Chip, Container, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { func, object } from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status, Currency } from "../../common/constants";
import { getPageName } from "../../common/nameApp";
import { SkeletonTable } from "../../components";
import { getCompaniesThunk } from "../CompanyManagement/recruiter.slice";
import {
    getRecruitmentPostsThunk,
    recruitmentPostSelector,
} from "./recruitmentPost.slice";
import RecruitmentPostModal from "./RecruitmentPostModal";

const ListRecruitmentPost = ({
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

ListRecruitmentPost.displayName = "ListRecruitmentPost";
ListRecruitmentPost.propTypes = {
    recruitmentPostModal: object.isRequired,
    setRecruitmentPostModal: func.isRequired,
};

const RecruitmentPost = () => {
    const [recruitmentPostModal, setRecruitmentPostModal] = useState({
        isOpen: false,
        isUpdate: false, // update or add
        data: null,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = getPageName("Quản lý bài tuyển dụng");
        dispatch(getRecruitmentPostsThunk());
        dispatch(getCompaniesThunk());
    }, [dispatch]);
    return (
        <Container>
            <Button
                variant="contained"
                onClick={() => {
                    setRecruitmentPostModal({
                        ...recruitmentPostModal,
                        isOpen: true,
                        isUpdate: false,
                    });
                }}
            >
                Thêm bài viết mới
            </Button>
            <ListRecruitmentPost
                recruitmentPostModal={recruitmentPostModal}
                setRecruitmentPostModal={setRecruitmentPostModal}
            />
            <RecruitmentPostModal
                recruitmentPostModal={recruitmentPostModal}
                setRecruitmentPostModal={setRecruitmentPostModal}
            />
        </Container>
    );
};

export default RecruitmentPost;
