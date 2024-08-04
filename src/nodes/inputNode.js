// inputNode.js

import { useState } from 'react';
import NodeWrapper from '../components/NodeWrapper';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || '{{input}}');
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const updateNodeField = useStore(state => state.updateNodeField);


  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    updateNodeField(id, 'inputName', newName);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <NodeWrapper id={id} title="Input" data={{ inputName: currName, inputType: inputType }} outputs={[currName]}>
      <div>
        <label>
          Name:
          <input
            type="text"
            className="shadow-sm border-black border focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md px-3 py-2 bg-white transition duration-150 ease-in-out"
            value={currName}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Type:
          <select value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </NodeWrapper>
  )
}