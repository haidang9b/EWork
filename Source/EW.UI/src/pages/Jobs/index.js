import { Container } from "@mui/system";
import React from "react";
import { FilterArea } from "../../components";

const Jobs = () => {
    return (
        <Container>
            <FilterArea label="Tìm kiếm việc theo tên, công ty..." />
        </Container>
    );
};
Jobs.displayName = "Jobs";
export default Jobs;
