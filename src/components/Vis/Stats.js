import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useResize } from './Resize';
import Axis from './Axis';
const colors = d3.scaleOrdinal(d3.schemeCategory10);
const format = d3.format('.2f');

const XAxis = ({ top, bottom, left, right, height, scale }) => {
    const axis = useRef(null);

    useEffect(() => {
        d3.select(axis.current).call(d3.axisBottom(scale));
    });

    return <g className="axis x" ref={axis} transform={`translate(${left}, ${height - bottom})`} />;
};

const YAxis = ({ top, left, scale }) => {
    const axis = useRef(null);

    useEffect(() => {
        d3.select(axis.current).call(d3.axisLeft(scale));
    });

    return <g className="axis y" ref={axis} transform={`translate(${left}, ${top})`} />;
};

const Rect = ({ data, x, y, height, top, bottom, index }) => {
    console.log(data);
    return (
        <g transform={`translate(${x(data.date)}, ${y(data.y)})`}>
            <rect width={x.bandwidth()} height={height - bottom - top - y(data.y)} fill={colors(index)} />
            <text
                transform={`translate(${x.bandwidth() / 2}, ${-2})`}
                textAnchor="middle"
                alignmentBaseline="baseline"
                fill="grey"
                fontSize="10"
            >
                {format(data.y)}
            </text>
        </g>
    );
};

export default ({ data }) => {
    const { size, ref } = useResize();
    const [width, height] = size;
    const [graphData, setData] = useState([]);
    const arrangeData = (data) => {
        const tempData = [];
        data.forEach((datum) => {
            tempData.push({ x: datum.stat.name, y: datum.base_stat });
        });
        setData(tempData);
    };
    useEffect(() => {
        arrangeData(data);
    }, [data]);

    const x = (data) =>
        d3
            .scaleBand()
            .range([margin.left, width - margin.right])
            .domain(d3.range(data.length))
            .padding(0.1);
    const xLinear = x(graphData);
    const y = (data) =>
        d3
            .scaleLinear()
            .range([height - margin.bottom, margin.top])
            .domain([0, d3.max(data, (d) => d.y)])
            .nice();
    const xLinear = y(graphData);

    return (
        <div className="PokeStats__container" ref={ref}>
            <svg className="PokeStats" width={width} height={height} viewBox={`0 0 ${width} ${height}`} overflow="auto">
                {graphData.map((stat, index) => {
                    return (
                        <g transform={`translate(${x(index)}, ${y(stat.y)})`}>
                            <rect x={xLinear} y={xLinear} height={height} width={x.bandwidth()} fill={colors[index]} />
                        </g>
                    );
                })}
            </svg>
            <Axis domain={[0, 100]} range={[10, width - 10]} width={width} />
        </div>
    );
};
