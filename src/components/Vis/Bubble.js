import React, { useState } from 'react';
import * as d3 from 'd3';

export default ({ bubbleData }) => {
    const width = 700;
    const height = 700;

    // Creates a new pack layout with the default settings: the default sort order is by ascending value; the default children accessor assumes each input data is an object with a children array; the default size is 1×1.

    // https://d3-wiki.readthedocs.io/zh_CN/master/Pack-Layout/#pack

    const pack = (data) =>
        d3
            .pack()
            .size([width - 2, height - 2])
            .padding(3)(d3.hierarchy({ children: data }).sum((d) => d.value));

    const pokeStuffing = pack(bubbleData);
    console.log(pokeStuffing);

    return (
        <svg className="BubbleChart" width={width} height={height} viewBox={`0 0 ${width} ${height}`} overflow="auto">
            <title>Pokemon Types</title>
            <text id="PokeTitle" textAnchor="middle" transform={`translate(${width / 2},20)`}>
                Pokemon Types
            </text>
        </svg>
    );
};
