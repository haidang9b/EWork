import { Button, Card, CardContent, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ImageDefault from "../../../assets/images/company-default.webp";
import { CompanyType } from "../../../common/constants";
import useFileUpload from "../../../hook/useFileUpload";
import "./companyitem.css";
const section = {
    height: "100%",
    paddingTop: 5,
    backgroundColor: "#fff",
};
const CompanyItem = ({ name, avatarUrl, companyType }) => {
    const { getFilePathUpload } = useFileUpload();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} padding={1}>
            <Card style={section}>
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
                        />
                        <div className="top-company__item text-center">
                            {name}
                        </div>
                        <p>
                            <Button>
                                {
                                    CompanyType.find(
                                        (item) => item.value === companyType
                                    )?.label
                                }
                            </Button>
                            - Ho Chi Minh
                        </p>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default CompanyItem;
