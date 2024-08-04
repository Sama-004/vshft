import { useState } from "react";
import NodeWrapper from "../components/NodeWrapper"


export const TestNode = ({ id, data }) => {
    const [currText, setCurrText] = useState(data?.text || '{{input}}');

    const handleTextChange = (e) => {
        setCurrText(e.target.value);
    };

    return (
        <NodeWrapper id={id} title="Text" outputs={['output']}>
            <div>
                <label>
                    Text:
                    <input
                        type="text"
                        value={currText}
                        onChange={handleTextChange}
                    />
                </label>
                <p>{currText}</p>
            </div>
        </NodeWrapper>
    )
}