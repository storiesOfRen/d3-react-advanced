import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default ({ top, bottom, left, right, height, scale, data }) => {
    const axis = useRef(null);

    useEffect(() => {
        d3.select(axis.current).call(
            d3
                .axisBottom(scale)
                .tickFormat((i) => data[i].x)
                .tickSizeOuter(0)
        );
    });

    return <g className="axis x" ref={axis} transform={`translate(${left}, ${height - bottom})`} />;
};
