import React, {useEffect, useState} from "react";
import {Grid, Paper, Typography} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useFirestore} from "../contexts/FirestoreContext";
import {useAuth} from "../contexts/AuthContext";

function createData(genre, prediction) {
    return { genre , prediction };
}

const PredictedGenresPage = (props) => {
    const { getGenrePredData } = useFirestore();
    const { currentUser } = useAuth();
    const [ dataFetched, setDataFetched ] = useState(false)
    const [ rows, setRows ] = useState([]);

    useEffect(() => {

        if (!dataFetched && currentUser){
            getGenrePredData(currentUser.uid, createDataRows);
            setDataFetched(true);
        }
    })

    function createDataRows(genreData){
        let genres = Object.keys(genreData)

        let newRows = genres.map((genre) => {
            return createData(genre, (genreData[genre]*100).toFixed(2))
        })

        newRows.sort(function (a, b) {return a.genre.localeCompare(b.genre)})
        newRows.sort(function(a, b){return b.prediction-a.prediction});

        setRows(newRows)
    }

    return(
        <Grid
            justifyContent="center"
            container
            columns={{ xs: 4, sm: 8, md: 13 }}
            spacing={3}
            padding={2}
        >
            <Grid item display="flex" xs={4} sm={8} md={13} sx={{ justifyContent: 'center' }}>
                <Typography align={"center"} variant={"h2"}>Here are your top Genres</Typography>
            </Grid>

            <Grid item display="flex" xs={4} sm={4} md={13} sx={{ justifyContent: 'center' }}>
                {rows === undefined || rows.length === 0 ?
                    <Typography align="center" variant="h5"> Looks like we're still working on your predictions :(... check back later</Typography>
                    :
                    <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
                        <Table sx={{ maxWidth: 800 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Genre</TableCell>
                                    <TableCell>Prediction</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows && rows.length > 0 && rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell>{row.genre}</TableCell>
                                        <TableCell>{row.prediction} %</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Grid>

        </Grid>

    )
}

export default PredictedGenresPage
