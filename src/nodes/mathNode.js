import React, { useState } from 'react';
import NodeWrapper from '../components/NodeWrapper';

export const MathNode = ({ id }) => {
    const [operation, setOperation] = useState('+');

    return (
        <NodeWrapper id={id} title="Math Operation" inputs={['num1', 'num2']} outputs={['result']}>
            <div>
                <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                    <option value="+">Addition</option>
                    <option value="-">Subtraction</option>
                    <option value="*">Multiplication</option>
                    <option value="/">Division</option>
                </select>
            </div>
        </NodeWrapper>
    );
};