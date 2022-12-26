import { Button, Card, CardContent, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { number, string } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import ImageDefault from "../../assets/images/company-default.webp";
import { CompanyTypes } from "../../common/constants";
import useFileUpload from "../../hook/useFileUpload";
import "./companyitem.css";

/**
 * Render Item Company
 * @param {Object} Object
 * @param {Number} Object.id
 * @param {string} Object.name
 * @param {string} Object.avatarUrl
 * @param {enum} Object.companyType
 * @param {number} Object.jobsHiring
 * @example
 * <CompanyItem name avatarUrl companyType jobsHiring/>
 */

const CompanyItem = ({ id, name, avatarUrl, companyType, jobsHiring }) => {
    const { getFilePathUpload } = useFileUpload();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} padding={1}>
            <Card className="top-company">
                <CardContent>
                    <Box textAlign="center">
                        <img
                            height={"180px"}
                            width={"100%"}
                            src={
                                avatarUrl
                                    ? getFilePathUpload(avatarUrl)
                                    : ImageDefault
                            }
                            alt={name}
                            loading="lazy"
                        />
                        <div className="top-company__item text-center">
                            <Link
                                to={`/company-detail/${id}`}
                                className="text-link top-company__name"
                            >
                                {name}
                            </Link>
                        </div>
                        <p>
                            <Button>
                                {
                                    CompanyTypes.find(
                                        (item) => item.value === companyType
                                    )?.label
                                }
                            </Button>
                            {`- ${jobsHiring} công việc`}
                        </p>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

CompanyItem.displayName = "CompanyItem";

CompanyItem.propTypes = {
    id: number.isRequired,
    name: string.isRequired,
    avatarUrl: string.isRequired,
    companyType: number.isRequired,
    jobsHiring: number.isRequired,
};

export default CompanyItem;
