import React from "react"
import Layout from "../components/UI/Layout"
import {Link} from "gatsby";
import {Button, Grid, Typography} from "@mui/material";


const IndexPage = () => {
    return (
        <Layout >
            <Grid
                justifyContent="center"
                container
                columns={{ xs: 4, sm: 8, md: 13 }}
                spacing={3}
                padding={2}
            >
                <Grid item alignItems="center" xs={4} sm={8} md={13} >
                    <Typography align="center" variant="h3">Spotify Concerts</Typography>
                </Grid>
                <Grid item display="flex" xs={4} sm={8} md={13} sx={{ justifyContent: 'center' }}>
                    <Button component={Link} to="/app/home"  variant="contained">get your top artists</Button>
                </Grid>


            </Grid>
        </Layout>
    )
}

export default IndexPage
