import React, { useState, useEffect } from 'react';
import NodeWrapper from '../components/NodeWrapper';
import { useStore } from '../store';

export const MathNode = ({ id }) => {
    const [operation, setOperation] = useState('+');
    const updateNodeField = useStore(state => state.updateNodeField);

    const operationLabels = {
        '+': 'Addition result',
        '-': 'Subtraction result',
        '*': 'Multiplication result',
        '/': 'Division result'
    };

    useEffect(() => {
        updateNodeField(id, 'operation', operation);
    }, [operation, id, updateNodeField]);


    return (
        <NodeWrapper id={id} title="Math Operation" inputs={['num1', 'num2']} outputs={[`${operationLabels[operation]}`]}>
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