import React, {useEffect, useState} from "react";
import Layout from "../components/UI/Layout";
import {Grid, Paper, Skeleton, Typography} from "@mui/material";
import {useAuth} from "../contexts/AuthContext";
import {useFirestore} from "../contexts/FirestoreContext";
import {navigate} from "gatsby-link";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

const TopArtistsCallbackPage = (props) => {
    const [data, setData] = useState();
    const { currentUser } = useAuth()
    const [dataSaved, setDataSaved] = useState(false);
    const {addSpotifyUserData} = useFirestore()

    const {access_token, token_type, expires_in} = props.location.hash.substring(1).split('&').reduce(function (initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {})


    useEffect(() => {
        fetch("https://api.spotify.com/v1/me/top/artists?limit=100", {
            headers: {
                Authorization: token_type + " " + access_token
            }
        }).then(response => response.json())
            .then(fetchedData => {
                setData(fetchedData);
            })

    }, [])

    useEffect(() => {
        if (!dataSaved && currentUser && data) {
            addSpotifyUserData(currentUser.uid, data)
            navigate("/app/top-artists")
            setDataSaved(true)
        }
    })
    return (
        <Layout>
            <Grid
                justifyContent="center"
                container
                columns={{ xs: 4, sm: 8, md: 13 }}
                spacing={3}
                padding={2}
            >
                <Grid item display="flex" xs={4} sm={8} md={13} sx={{ justifyContent: 'center' }}>
                    <Typography align={"center"} variant={"h2"}>Hier sind deine Top Artists</Typography>
                </Grid>

                <Grid item display="flex" xs={4} sm={4} md={13} sx={{ justifyContent: 'center' }}>
                    <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
                        <Table sx={{ maxWidth: 800 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Spotify</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    <TableRow key={0}>
                                        <TableCell width={40} ><Skeleton/></TableCell>
                                        <TableCell width={40} ><Skeleton variant={"circular"}  width={40} height={40} /></TableCell>
                                        <TableCell><Skeleton/></TableCell>
                                        <TableCell> <Skeleton/></TableCell>
                                    </TableRow>
                                    <TableRow key={1}>
                                        <TableCell width={40} ><Skeleton/></TableCell>
                                        <TableCell width={40} ><Skeleton variant={"circular"}  width={40} height={40} /></TableCell>
                                        <TableCell><Skeleton/></TableCell>
                                        <TableCell> <Skeleton/></TableCell>
                                    </TableRow>
                                    <TableRow key={2}>
                                        <TableCell width={40} ><Skeleton/></TableCell>
                                        <TableCell width={40} ><Skeleton variant={"circular"}  width={40} height={40} /></TableCell>
                                        <TableCell><Skeleton/></TableCell>
                                        <TableCell> <Skeleton/></TableCell>
                                    </TableRow>
                                    <TableRow key={3}>
                                        <TableCell width={40} ><Skeleton/></TableCell>
                                        <TableCell width={40} ><Skeleton variant={"circular"}  width={40} height={40} /></TableCell>
                                        <TableCell><Skeleton/></TableCell>
                                        <TableCell> <Skeleton/></TableCell>
                                    </TableRow>
                                    <TableRow key={4}>
                                        <TableCell width={40} ><Skeleton/></TableCell>
                                        <TableCell width={40} ><Skeleton variant={"circular"}  width={40} height={40} /></TableCell>
                                        <TableCell><Skeleton/></TableCell>
                                        <TableCell> <Skeleton/></TableCell>
                                    </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            </Grid>
        </Layout>
    )
}

export default TopArtistsCallbackPage
