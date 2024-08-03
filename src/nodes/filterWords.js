import React, { useState } from 'react';
import NodeWrapper from '../components/NodeWrapper';

export const FilterKeyword = ({ id }) => {
    const [filter, setFilter] = useState("grayscale")

    return (
        <NodeWrapper id={id} title="Image Filter" inputs={['image']} outputs={['filteredImage']}>
            <div>
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="grayscale">Grayscale</option>
                    <option value="blur">Blur</option>
                    <option value="invert">Invert</option>
                    <option value="emoji">Emoji</option>
                </select>
            </div>
        </NodeWrapper >
    );
};