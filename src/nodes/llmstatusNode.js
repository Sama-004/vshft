import React, { useState, useEffect } from 'react';
import NodeWrapper from '../components/NodeWrapper';
import { useStore } from '../store';

export const LLMStatusNode = ({ id, data }) => {
    const [status, setStatus] = useState(data?.status || 'Idle');
    const updateNodeField = useStore(state => state.updateNodeField);


    useEffect(() => {
        updateNodeField(id, 'status', status);
    }, [id, status, updateNodeField]);


    const statusColors = {
        'Idle': '#4CAF50',      // Green
        'Processing': '#FFC107', // Yellow
        'Error': '#F44336',     // Red
        'Completed': '#2196F3'  // Blue
    };

    const updateStatus = (newStatus) => {
        setStatus(newStatus);
        updateNodeField(id, 'status', newStatus)
    };

    return (
        <NodeWrapper id={id} title="LLM Status" inputs={['statusUpdate']} outputs={[`${status}`]}>
            <div style={{ padding: '10px', textAlign: 'center' }}>
                <div style={{
                    fontWeight: 'bold',
                    color: statusColors[status] || 'black',
                    marginBottom: '10px'
                }}>
                    {status}
                </div>
                <select
                    value={status}
                    onChange={(e) => updateStatus(e.target.value)}
                    style={{ width: '100%' }}
                >
                    <option value="Idle">Idle</option>
                    <option value="Processing">Processing</option>
                    <option value="Error">Error</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
        </NodeWrapper>
    );
};
