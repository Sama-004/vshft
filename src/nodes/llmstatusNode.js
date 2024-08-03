import React, { useState } from 'react';
import NodeWrapper from '../components/NodeWrapper';

export const LLMStatusNode = ({ id, data }) => {
    const [status, setStatus] = useState(data?.status || 'Idle');

    const updateStatus = (newStatus) => {
        setStatus(newStatus);
    };

    const statusColors = {
        'Idle': '#4CAF50',      // Green
        'Processing': '#FFC107', // Yellow
        'Error': '#F44336',     // Red
        'Completed': '#2196F3'  // Blue
    };

    return (
        <NodeWrapper id={id} title="LLM Status" inputs={['statusUpdate']} outputs={['currentStatus']}>
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
