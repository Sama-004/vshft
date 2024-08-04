import { Handle, Position } from "reactflow";
import { useStore } from "../store";

const NodeWrapper = ({ id, title, children, inputs = [], outputs = [] }) => {
    const deleteNode = useStore(state => state.deleteNode);

    const handleDelete = () => {
        deleteNode(id);
    };

    return (
        <div className="w-52 min-h-[80px] border border-black p-2.5">
            {inputs.map((input, index) => (
                <Handle key={`input-${index}`}
                    type="target"
                    position={Position.Left}
                    id={`${id}-${input}`}
                    style={{ top: `${(index + 1) * 100 / (inputs.length + 1)}%` }} />
            ))}
            <div className="flex justify-between items-center">
                <span>{title}</span>
                <button
                    className="text-red-500"
                    onClick={handleDelete}
                    title="Delete Node"
                >
                    &#x2715;
                </button>
            </div>
            {children}
            {outputs.map((output, index) => (
                <Handle
                    key={`output-${index}`}
                    type="source"
                    position={Position.Right}
                    id={`${id}-${output}`}
                    style={{ top: `${(index + 1) * 100 / (outputs.length + 1)}%` }}
                />
            ))}
        </div>
    )
}

export default NodeWrapper;