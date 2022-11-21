import { Delete, Download, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import { Status } from "../../../common/constants";
import Loading from "../../../components/Loading";
import { profileSelector } from "../profile.slice";

const ListMyCV = () => {
    const profile = useSelector(profileSelector);
    console.log(profile?.cvs);
    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
        },
        { field: "cvName", headerName: "Tên CV", width: 280 },
        { field: "updatedDate", headerName: "Ngày đăng", width: 280 },
        {
            field: "action",
            headerName: "Action",
            width: 240,
            renderCell: (cellValues) => {
                const onClick = (e) => {
                    console.log(cellValues.row?.cvUrl);
                };
                return (
                    <>
                        <IconButton
                            onClick={onClick}
                            variant="contained"
                            href={cellValues.row?.cvUrl}
                        >
                            <RemoveRedEyeOutlined />
                        </IconButton>
                        <IconButton variant="contained">
                            <Download />
                        </IconButton>
                        <IconButton variant="contained">
                            <Delete />
                        </IconButton>
                    </>
                );
            },
        },
    ];
    return (
        <>
            {profile.status === Status.loading ? (
                <Loading />
            ) : (
                <Paper
                    sx={{ width: "100%", overflow: "hidden", marginTop: "8px" }}
                >
                    <DataGrid
                        rows={profile?.cvs}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        autoHeight={true}
                        sty
                    />
                </Paper>
            )}
        </>
    );
};

export default ListMyCV;
