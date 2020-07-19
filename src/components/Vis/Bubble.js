import React, { useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

export default () => {
    const [pokeTypes, setTypes] = useState([]);
    const [selected, setSelected] = useState('');

    const getData = async () => {
        const response = await axios.get('https://pokeapi.co/api/v2/type');
        if (response.status === 200) {
            const pokeTypes = [];
            const { data } = response;
            for (let i = 0; i < data.count; i++) {
                const resp = await axios.get(data.results[i].url);
                if (resp.status === 200) {
                    if (resp.data.pokemon.length > 0) {
                        pokeTypes.push({
                            type: data.results[i].name,
                            count: resp.data.pokemon.length,
                            value: resp.data.pokemon.length,
                            data: resp.data,
                        });
                    }
                }
            }
            setTypes(pokeTypes);
        }
    };
    getData();

    const width = 700;
    const height = 700;

    const pack = (data) =>
        d3
            .pack()
            .size([width - 2, height - 2])
            .padding(3)(d3.hierarchy({ children: data }).sum((d) => d.value));
    const pokeStuffing = pack(pokeTypes);

    return (
        <svg className="BubbleChart" width={width} height={height} viewBox={`0 0 ${width} ${height}`} overflow="auto">
            <title>Pokemon Types</title>
            <text id="PokeTitle" textAnchor="middle" transform={`translate(${width / 2},20)`}>
                Pokemon Types
            </text>
        </svg>
    );
};
