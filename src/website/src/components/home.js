import React from "react";
import {Button, Grid, Typography} from "@mui/material";

const client_id = 'YOUR CLIENT';
const redirect_uri = 'https://concert.raphaelmitas.com/top-artists';
// const redirect_uri = 'http://localhost:8000/top-artists';
const scope = 'user-top-read';

let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

const HomePage = () => {
    return (
            <Grid
                justifyContent="center"
                container
                columns={{ xs: 4, sm: 8, md: 13 }}
                spacing={3}
                padding={2}
            >
                <Grid item alignItems="center" xs={4} sm={8} md={13} >
                    <Typography align="center" variant="h3">Playlist</Typography>
                </Grid>
                <Grid item display="flex" xs={4} sm={8} md={13} sx={{ justifyContent: 'center' }}>
                    <Button href={url}  variant="contained">get Artist Data from Spotify</Button>
                </Grid>


            </Grid>
    )

}

export default HomePage
