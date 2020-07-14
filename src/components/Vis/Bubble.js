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
    const stuft = pack(pokeTypes);

    return (
        <svg className="BubbleChart" width={width} height={height} viewBox={`0 0 ${width} ${height}`} overflow="auto">
            <title>Pokemon Types</title>
            <text id="PokeTitle" textAnchor="middle" transform={`translate(${width / 2},20)`}>
                Pokemon Types
            </text>

            {stuft.children &&
                stuft.children.map((child, index) => {
                    return (
                        <g
                            key={index}
                            transform={`translate(${child.x + 1},${child.y + 1})`}
                            onClick={() => {
                                console.log('boop', child.data);
                                setSelected(child.data.type);
                            }}
                        >
                            <circle
                                id={`${child.data.type}-${child.data.count}`}
                                r={child.r}
                                fillOpacity={selected === child.data.type ? '1' : '0.7'}
                                fill="#ff7f0e"
                            />
                        </g>
                    );
                })}

            {stuft.children &&
                stuft.children.map((child, index) => {
                    return (
                        <g key={index} transform={`translate(${child.x + 1},${child.y + 1})`}>
                            <text textAnchor="middle" fill="#000000">
                                <tspan>{child.data.type.toUpperCase()}</tspan>
                            </text>
                        </g>
                    );
                })}
        </svg>
    );
};
