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