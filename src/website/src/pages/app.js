import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/UI/Layout"
import Login from "../components/login"
import HomePage from "../components/home";
import PrivateRoute from "../components/PivateRoute";
import TopArtistsPage from "../components/topArtists";
import PredictedGenresPage from "../components/predictedGenres";

const App = () => (
    <Layout>
        <Router >
            <Login path="/app/login" />
            <PrivateRoute component={HomePage} path="/app/home" />
            <PrivateRoute component={TopArtistsPage} path="/app/top-artists"/>
            <PrivateRoute component={PredictedGenresPage} path="/app/predicted-genres"/>
        </Router>
    </Layout>
)

export default App
