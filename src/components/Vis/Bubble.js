import React from 'react';
import * as d3 from 'd3';

export default ({ bubbleData, setSelected, selected }) => {
    const width = 700;
    const height = 700;

    const pack = (data) =>
        d3
            .pack()
            .size([width - 2, height - 2])
            .padding(3)(d3.hierarchy({ children: data }).sum((d) => d.value));
    const pokeStuffing = pack(bubbleData);

    return (
        <svg className="BubbleChart" width={width} height={height} viewBox={`0 0 ${width} ${height}`} overflow="auto">
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
                                fill="#ff7f0e"
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
