import "./Home.css";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import PokemonCard from "../PokemonCard/PokemonCard";

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [currentPage, setCurrentPage] = useState(
        "https://pokeapi.co/api/v2/pokemon/"
    );
    const [nextPage, setNextPage] = useState("");
    const [prevPage, setPrevPage] = useState("");

    useEffect(() => {
        let cancelRequest;
        const fetchRequest = async () => {
            const response = await axios.get(currentPage, {
                cancelToken: new axios.CancelToken(
                    (cancel) => (cancelRequest = cancel)
                ),
            });
            setPokemon(response.data.results);
            setNextPage(response.data.next);
            setPrevPage(response.data.previous);
            console.log(response.data.results);
        };

        fetchRequest();

        return () => cancelRequest();
    }, [currentPage]);

    useEffect(() => {
        document.title = "Pokedex by Awesa";
        document.body.classList.remove(...document.body.classList);
    }, []);

    const gotoNextPage = () => {
        setCurrentPage(nextPage);
    };

    const gotoPrevPage = () => {
        setCurrentPage(prevPage);
    };

    return (
        <>
            <Container>
                <Row>
                    <h1>Pokedex</h1>
                </Row>
                <Row>
                    <div className="pokemon-list">
                        {pokemon.map((p) => (
                            <PokemonCard key={p.name} pokemon={p} />
                        ))}
                    </div>
                </Row>
                <Row>
                    <Pagination className="d-flex justify-content-center">
                        <Pagination.Prev onClick={gotoPrevPage} />
                        <Pagination.Next onClick={gotoNextPage} />
                    </Pagination>
                </Row>
            </Container>
        </>
    );
}

export default App;
