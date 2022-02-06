import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useFirestore} from "../contexts/FirestoreContext";
import {useAuth} from "../contexts/AuthContext";
import {Avatar, IconButton, Link} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function createData(name, image, URL) {
  return { name, image, URL};
}


export default function ArtistTable() {
  const [ rows, setRows ] = useState([]);
  const { getSpotifyUserData } = useFirestore();
  const { currentUser } = useAuth();
  const [ dataFetched, setDataFetched ] = useState(false)

  useEffect(() => {
    if (!dataFetched && currentUser){
      getSpotifyUserData(currentUser.uid, createDataRows);
      setDataFetched(true);
    }
  })

  function createDataRows(artistData){
    if (artistData && artistData.items){
        let newRows = artistData.items.map((artist) => {
          if (artist.images && artist.images[0].url)
            return createData(artist.name, artist.images[0].url, artist.external_urls.spotify)
          else
            return createData(artist.name, 'none', artist.external_urls.spotify)

        })
        setRows(newRows)

      }
  }

  return (
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
            {rows && rows.length > 0 && rows.map((row, index) => (
                <TableRow
                    key={index}
                >
                  <TableCell>{index+1}</TableCell>
                  <TableCell><Avatar alt={row.name} src={row.image}/></TableCell>
                  <TableCell>
                    {row.name}
                  </TableCell>
                  <TableCell> <IconButton component={Link} href={row.URL}>
                    <ExitToAppIcon color="primary"/>
                  </IconButton></TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}

