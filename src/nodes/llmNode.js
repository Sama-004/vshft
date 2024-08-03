// llmNode.js

import NodeWrapper from '../components/NodeWrapper';

export const LLMNode = ({ id }) => {
  return (
    <NodeWrapper id={id} title="LLM" inputs={[`system`, `prompt`]} outputs={[`response`]}>
      <div>
        <span>
          This is a LLM
        </span>
      </div>
    </NodeWrapper>
  )
}