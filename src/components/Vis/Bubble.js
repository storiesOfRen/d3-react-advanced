import React, { useState, useLayoutEffect } from 'react';
import * as d3 from 'd3';

const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};

export default ({ bubbleData, setSelected, selected }) => {
    const [width, height] = useWindowSize();

    const pack = (data) =>
        d3
            .pack()
            .size([width - 2, height - 2])
            .padding(3)(d3.hierarchy({ children: data }).sum((d) => d.value));
    const pokeStuffing = pack(bubbleData);

    const colors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        grass: '#78C850',
        electric: '#F8D030',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dark: '#705848',
        dragon: '#7038F8',
        steel: '#B8B8D0',
        fairy: '#F0B6BC',
    };

    return (
        <svg
            className="BubbleChart"
            width={width}
            height={height}
            viewBox={`0 0 ${width + 200} ${height + 200}`}
            overflow="auto"
        >
            <title>Pokemon Types</title>
            <text id="PokeTitle" textAnchor="middle" transform={`translate(${width / 2},20)`}>
                Pokemon Types
            </text>

            {pokeStuffing.children &&
                pokeStuffing.children.map((child, index) => {
                    return (
                        <g
                            key={index}
                            transform={`translate(${child.x + 1},${child.y + 1})`}
                            onClick={() => {
                                setSelected(child.data.type);
                            }}
                        >
                            <circle
                                id={`${child.data.type}-${child.data.count}`}
                                r={child.r}
                                fillOpacity={selected === child.data.type ? '1' : '0.7'}
                                fill={colors[child.data.type.toLowerCase()] || '#ff7f0e'}
                            />
                        </g>
                    );
                })}

            {pokeStuffing.children &&
                pokeStuffing.children.map((child, index) => {
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
