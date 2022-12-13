import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
        </Routes>
    );
}

export default App;
