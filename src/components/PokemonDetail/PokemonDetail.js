import React, { useEffect, useState } from "react";
import "./PokemonDetail.css";
import "../Shared/PokemonType.css";
import PokemonType from "../Shared/PokemonType";
import axios from "axios";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "react-uuid";
import Container from "react-bootstrap/Container";
import { useParams, useLocation } from "react-router-dom";
import StatsBar from "./StatsBar";

export default function PokemonDetail() {
    const location = useLocation();
    const [pokemonData, setPokemonData] = useState(null);
    const [about, setAbout] = useState(true);
    const [baseStats, setBaseStats] = useState(false);
    const [evolution, setEvolution] = useState(false);
    const [evolutions, setEvolutions] = useState([]);
    const [moves, setMoves] = useState(false);
    const { id } = useParams();

    const getPokemonData = async () => {
        try {
            setPokemonData(location.state.pokemonData);
        } catch {
            await fetchRequest();
        }
    };

    const fetchRequest = async () => {
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemonData(response.data);
    };

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const getHeight = (height) => {
        return `${(height / 10 / 30.48).toFixed(2)} feet (${height / 10} cm)`;
    };

    const getWeight = (weight) => {
        return `${(weight / 10 / 0.45359237).toFixed(1)} lbs (${
            weight / 10
        } kg)`;
    };

    const getAbilities = (abilities) => {
        console.log(abilities);
        return abilities
            .map((ability) => {
                return capitalize(ability.ability.name);
            })
            .join(", ");
    };

    const getEvolutions = async () => {
        console.log(id);
        const response = await axios.get(
            `https://pokeapi.co/api/v2/evolution-chain/${pokemonData.id}/`
        );
        setEvolutions(response.data.chain.evolves_to);
    };

    useEffect(() => {
        getPokemonData();
    }, []);

    useEffect(() => {
        try {
            const { name } = pokemonData;
            document.title = capitalize(name);
            document.body.classList.add(pokemonData.types[0].type.name);
            getEvolutions();
        } catch {}
    }, [pokemonData]);

    return (
        <>
            {pokemonData ? (
                <div className="base">
                    <Container className="main-container">
                        <div className="pokemon-header detail-row">
                            <div>
                                <h1 className="pokemon-name">
                                    {pokemonData.name}
                                </h1>
                                <div className="pokemon-types detail-row">
                                    {pokemonData.types.map((type) => {
                                        return (
                                            <PokemonType
                                                key={uuid()}
                                                type={type.type.name}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <h1 className="pokemon-id">
                                    #{String(pokemonData.id).padStart(3, "0")}
                                </h1>
                            </div>
                        </div>
                        <div className="image-container">
                            <Image
                                src={
                                    pokemonData.sprites.other[
                                        "official-artwork"
                                    ]["front_default"]
                                }
                                className="detail-image"
                            />
                        </div>
                    </Container>
                    <div className="detail-info">
                        <Container>
                            <div className="info-content">
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setAbout(true);
                                        setBaseStats(false);
                                        setEvolution(false);
                                        setMoves(false);
                                    }}
                                >
                                    About
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setAbout(false);
                                        setBaseStats(true);
                                        setEvolution(false);
                                        setMoves(false);
                                    }}
                                >
                                    Base Stats
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setAbout(false);
                                        setBaseStats(false);
                                        setEvolution(true);
                                        setMoves(false);
                                    }}
                                >
                                    Evolution
                                </button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setAbout(false);
                                        setBaseStats(false);
                                        setEvolution(false);
                                        setMoves(true);
                                    }}
                                >
                                    Moves
                                </button>
                            </div>
                            <div className="info-table">
                                {about ? (
                                    <table className="about">
                                        <tr>
                                            <td>
                                                <div className="table-data">
                                                    Species
                                                </div>
                                            </td>
                                            <td>
                                                <strong>
                                                    {capitalize(
                                                        pokemonData.species.name
                                                    )}
                                                </strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="table-data">
                                                    Height
                                                </div>
                                            </td>
                                            <td>
                                                <strong>
                                                    {getHeight(
                                                        pokemonData.height
                                                    )}
                                                </strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="table-data">
                                                    Weight
                                                </div>
                                            </td>
                                            <td>
                                                <strong>
                                                    {getWeight(
                                                        pokemonData.weight
                                                    )}
                                                </strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Abilities</td>
                                            <td>
                                                <strong>
                                                    {getAbilities(
                                                        pokemonData.abilities
                                                    )}
                                                </strong>
                                            </td>
                                        </tr>
                                    </table>
                                ) : (
                                    <></>
                                )}
                                {baseStats ? (
                                    <table className="about">
                                        <tr>
                                            <td>
                                                <div className="table-data">
                                                    HP
                                                </div>
                                            </td>
                                            <td>
                                                <StatsBar
                                                    stats={
                                                        pokemonData.stats[0]
                                                            .base_stat
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="table-data">
                                                    Attack
                                                </div>
                                            </td>
                                            <td>
                                                <StatsBar
                                                    stats={
                                                        pokemonData.stats[1]
                                                            .base_stat
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="table-data">
                                                    Defense
                                                </div>
                                            </td>
                                            <td>
                                                <StatsBar
                                                    stats={
                                                        pokemonData.stats[2]
                                                            .base_stat
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="table-data">
                                                    Special-Attack
                                                </div>
                                            </td>
                                            <td>
                                                <StatsBar
                                                    stats={
                                                        pokemonData.stats[3]
                                                            .base_stat
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="table-data">
                                                    Special-Defense
                                                </div>
                                            </td>
                                            <td>
                                                <StatsBar
                                                    stats={
                                                        pokemonData.stats[4]
                                                            .base_stat
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="table-data">
                                                    Speed
                                                </div>
                                            </td>
                                            <td>
                                                <StatsBar
                                                    stats={
                                                        pokemonData.stats[5]
                                                            .base_stat
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    </table>
                                ) : (
                                    <></>
                                )}
                                {evolution ? (
                                    <ol>
                                        {evolutions.map((evo) => {
                                            return (
                                                <li key={uuid()}>
                                                    {capitalize(
                                                        evo.species.name
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ol>
                                ) : (
                                    <></>
                                )}
                                {moves ? (
                                    <ol>
                                        {pokemonData.moves
                                            .slice(0, 5)
                                            .map((move) => {
                                                return (
                                                    <li key={uuid()}>
                                                        {capitalize(
                                                            move.move.name
                                                        )}
                                                    </li>
                                                );
                                            })}
                                    </ol>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </Container>
                    </div>
                </div>
            ) : (
                <>Loading...</>
            )}
        </>
    );
}
