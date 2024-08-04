// outputNode.js

import { useState } from 'react';
import NodeWrapper from '../components/NodeWrapper';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };


  return (
    <NodeWrapper id={id} title="Output" inputs={['value']}>
      <div>
        <label>
          Name:
          <input
            type="text"
            className="border border-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md px-3 py-2 bg-white transition duration-150 ease-in-out"
            value={currName}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Type:
          <select value={outputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </NodeWrapper>
  );
};