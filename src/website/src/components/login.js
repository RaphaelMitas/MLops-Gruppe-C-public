import React from "react";
import {Button, Grid, Typography} from "@mui/material";
import {useAuth} from "../contexts/AuthContext";
import { navigate } from "gatsby"
import GoogleIcon from '@mui/icons-material/Google';


const LoginPage = (props) => {
    const {signIn, currentUser} =  useAuth();

    return (

            <Grid
                justifyContent="center"
                container
                columns={{ xs: 4, sm: 8, md: 13 }}
                spacing={3}
                padding={2}
            >
                <Grid item alignItems="center" xs={4} sm={8} md={13} >
                    <Typography align="center" variant="h3">Login</Typography>
                </Grid>

                <Grid item display="flex" xs={4} sm={8} md={13} sx={{ justifyContent: 'center' }}>
                    <Button startIcon={<GoogleIcon/>} variant="contained" onClick={signIn}>google</Button>
                </Grid>

                {currentUser && props.location.state &&
                    navigate(props.location.state.prevPath)
                }

            </Grid>
    )

}

export default LoginPage
