import React, { useEffect, useState } from 'react';
import NodeWrapper from '../components/NodeWrapper';
import { useStore } from '../store';

const filterLabels = {
    'grayscale': 'Grayscale image',
    'blur': 'Blurred image',
    'invert': 'Inverted colors image',
    'emoji': 'Emoji applied image'
}; // defined globally beause used inside the hook and also inside return

export const FilterKeyword = ({ id }) => {
    const [filter, setFilter] = useState("grayscale")
    const updateNodeField = useStore(state => state.updateNodeField);


    useEffect(() => {
        updateNodeField(id, 'outputLabel', filterLabels[filter]);
    }, [filter, id, updateNodeField]);

    return (
        <NodeWrapper id={id} title="Image Filter" inputs={['image']} outputs={[filterLabels[filter]]}>
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