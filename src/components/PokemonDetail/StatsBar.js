import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./PokemonDetail.css";

export default function StatsBar({ stats }) {
    return (
        <ProgressBar
            variant={stats < 50 ? "danger" : "success"}
            className="table-data"
            now={stats}
            label={stats}
        />
    );
}
