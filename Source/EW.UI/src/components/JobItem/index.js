import { Chip, Grid } from "@mui/material";
import { number, string } from "prop-types";
import React from "react";
import useFileUpload from "../../hook/useFileUpload";
import ImageDefault from "../../assets/images/company-default.webp";
import "./jobitem.css";
import { Currency } from "../../common/constants";
import { MonetizationOnOutlined } from "@mui/icons-material";
import moment from "moment";
import { Link } from "react-router-dom";

/**
 * Display job item from data input
 * @param {object} object
 * @param {number} object.id
 * @param {string} object.jobTitle
 * @param {string} object.techStacks
 * @param {string} object.avatarUrl
 * @param {number} object.salaryType
 * @param {number} object.salaryFrom
 * @param {number} object.salaryFrom
 * @param {number} object.currency
 * @param {string} object.jobDescription
 * @example
 * <JobItem />
 */

const JobItem = ({
    id,
    jobTitle,
    avatarUrl,
    techStacks,
    salaryType,
    salaryFrom,
    salaryTo,
    currency,
    updatedDate,
    jobDescription,
}) => {
    const { getFilePathUpload } = useFileUpload();
    const getSalary = () => {
        let currencyLabel = Currency.find(
            (item) => item.value === currency
        )?.label;

        switch (salaryType) {
            case 1:
                return "Thương Lượng";
            case 2:
                return `Từ ${salaryFrom} đến ${salaryTo} ${currencyLabel}`;
            case 3:
                return `Lên tới ${salaryTo} ${currencyLabel}`;
            case 4:
                return `Tối thiểu ${salaryFrom} ${currencyLabel}`;
            default:
                return "Thương lượng";
        }
    };
    const getTechStacks = () => {
        let arr = techStacks.split(",");
        return arr.filter((item) => item !== "");
    };
    return (
        <Grid container className="job-item">
            <Grid
                item
                sm={0}
                xs={0}
                md={3}
                lg={3}
                className="job-item__area-img"
            >
                <img
                    src={
                        avatarUrl ? getFilePathUpload(avatarUrl) : ImageDefault
                    }
                    alt={jobTitle}
                    className="job-item__img"
                />
            </Grid>
            <Grid item sm={12} xs={12} md={9} lg={9} className="job-item__body">
                <div className="job-item__title">
                    <Link to={`/job-detail/${id}`} className="text-link">
                        {jobTitle}
                    </Link>
                </div>
                <div>
                    <div className="d-flex job-item__salary">
                        <div>
                            <MonetizationOnOutlined
                                color="action"
                                className="job-item__icon"
                            />
                        </div>
                        <div className="job-item__body-label">
                            {getSalary()}
                        </div>
                    </div>
                </div>
                <div
                    className="job-item__body-desc"
                    dangerouslySetInnerHTML={{
                        __html: jobDescription,
                    }}
                ></div>

                <div className="d-flex">
                    <div>
                        {getTechStacks().map((item) => (
                            <Chip
                                key={item}
                                label={item}
                                sx={{ marginRight: "4px" }}
                            />
                        ))}
                    </div>
                    <div>Đã đăng {moment(updatedDate).fromNow()}</div>
                </div>
            </Grid>
        </Grid>
    );
};

JobItem.displayName = "JobItem";
JobItem.propTypes = {
    id: number.isRequired,
    jobTitle: string.isRequired,
    avatarUrl: string.isRequired,
    techStacks: string.isRequired,
    salaryType: number.isRequired,
    salaryFrom: number,
    salaryTo: number,
    currency: number,
    jobDescription: string,
};

export default JobItem;
