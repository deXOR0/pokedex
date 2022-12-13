import React, { useEffect, useState } from "react";
import "./PokemonCard.css";
import "../Shared/PokemonType.css";
import PokemonType from "../Shared/PokemonType";
import axios from "axios";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

export default function PokemonCard({ pokemon }) {
    const [pokemonData, setPokemonData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRequest = async () => {
            const response = await axios.get(pokemon.url);
            setPokemonData(response.data);
        };
        fetchRequest();
        return () => {};
    }, [pokemon]);

    const renderPokemon = () => {
        navigate(`/pokemon/${pokemon.name}`, {
            state: {
                pokemonData,
            },
        });
    };

    return (
        <>
            {pokemonData ? (
                <div
                    className={"pokemon-card " + pokemonData.types[0].type.name}
                    onClick={renderPokemon}
                >
                    <div className="pokemon-info">
                        <h3>{pokemon.name}</h3>
                        {pokemonData.types.map((type) => {
                            return (
                                <PokemonType
                                    key={uuid()}
                                    type={type.type.name}
                                />
                            );
                        })}
                    </div>
                    <Image
                        src={
                            pokemonData.sprites.other["official-artwork"][
                                "front_default"
                            ]
                        }
                        className="pokemon-image"
                    />
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
}
