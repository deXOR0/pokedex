import React from "react";
import "./PokemonType.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PokemonType({ type }) {
    return (
        <div className="type-capsule">
            <strong>{type}</strong>
        </div>
    );
}
