// textNode.js

import { useEffect, useState } from 'react';
import NodeWrapper from '../components/NodeWrapper';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    useStore.getState().updateNodeField(id, 'text', e.target.value);
  };

  useEffect(() => {
    console.log('Current Text:', currText);
  }, [currText]);


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
