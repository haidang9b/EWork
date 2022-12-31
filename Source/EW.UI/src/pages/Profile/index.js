import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Contacts from "./Contacts";
import "./profile.css";
const Profile = () => {
    return (
        <Container>
            <Paper>
                <Grid padding={3} className="profile-contact">
                    <Contacts />
                </Grid>
            </Paper>

            <Grid container></Grid>
            <Grid container></Grid>
        </Container>
    );
};

export default Profile;
