import NodeWrapper from "../components/NodeWrapper"


export const TestNode = ({ id, data }) => {
    return (
        <NodeWrapper id={id} inputs={['inputs']} title="Test" outputs={['output']}>
            <div>
                <span>This is a test node</span>
            </div>
        </NodeWrapper>
    )
}