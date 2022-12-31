import { Email, GitHub, Phone } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import useAuth from "../../../hook/useAuth";

const Contacts = () => {
    const { user } = useAuth();
    return (
        <>
            <Grid className="profile-contact__name">{user?.given_name}</Grid>
            <Grid>.NET developer</Grid>
            <Grid>19, Nguyen Huu Tho, Tan Phong Quan 7</Grid>
            <Grid container>
                <div className="d-flex">
                    <div>
                        <GitHub />
                    </div>
                    <div>https://github.com/actions/</div>
                </div>
                <div className="d-flex">
                    <div>
                        <Email />
                    </div>
                    <div>pda6hc@bosch.com</div>
                </div>
                <div className="d-flex">
                    <div>
                        <Phone />
                    </div>
                    <div>0989898989</div>
                </div>
            </Grid>
        </>
    );
};

export default Contacts;
