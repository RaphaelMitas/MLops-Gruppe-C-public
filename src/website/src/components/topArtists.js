import React from "react";
import {Button, Grid, Typography} from "@mui/material";
import ArtistTable from "../components/ArtistTable";
import {Link} from "gatsby";

const TopArtistsPage = () => {



    return (
            <Grid
                justifyContent="center"
                container
                columns={{ xs: 4, sm: 8, md: 13 }}
                spacing={3}
                padding={2}
            >
                <Grid item display="flex" xs={4} sm={8} md={13} sx={{ justifyContent: 'center' }}>
                    <Typography align={"center"} variant={"h2"}>Here are your Top Artists</Typography>
                </Grid>
                <Grid item display="flex" xs={4} sm={4} md={13} sx={{ justifyContent: 'center' }}>
                    <Button component={Link} to='/app/predicted-genres' variant='contained'>get your predicted genres</Button>
                </Grid>

                <Grid item display="flex" xs={4} sm={4} md={13} sx={{ justifyContent: 'center' }}>
                    <ArtistTable />
                </Grid>

            </Grid>
    )
}

export default TopArtistsPage
