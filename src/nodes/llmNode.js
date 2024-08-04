// llmNode.js

import NodeWrapper from '../components/NodeWrapper';
import { useStore } from '../store';
import { useEffect } from 'react';

export const LLMNode = ({ id }) => {
  const updateNodeField = useStore(state => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, 'outputLabel', 'LLM response');
  }, [id, updateNodeField]);


  return (
    <NodeWrapper id={id} title="LLM" inputs={[`system`, `prompt`]} outputs={[`LLM response`]}>
      <div>
        <span>
          This is a LLM
        </span>
      </div>
    </NodeWrapper>
  )
}