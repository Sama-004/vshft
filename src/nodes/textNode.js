// textNode.js

import { useState } from 'react';
import NodeWrapper from '../components/NodeWrapper';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const updateNodeField = useStore(state => state.updateNodeField);

  const handleTextChange = (e) => {
    const newValue = e.target.value;
    setCurrText(newValue);
    updateNodeField(id, 'text', newValue);
  };

  return (
    <NodeWrapper id={id} outputs={[`${currText}`]}>
      <div>
        <label>
          Text:
          <input
            type="text"
            value={currText}
            onChange={handleTextChange}
          />
        </label>
      </div>
    </NodeWrapper>
  );
};
