// submit.js
import { useStore } from "./store";

export const SubmitButton = () => {

    const { nodes, edges } = useStore(state => ({
        nodes: state.nodes,
        edges: state.edges
    }));

    const handleSubmit = async () => {
        console.log({ nodes, edges }) //check if nodes and edges are being sent or not
        try {
            const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();
            console.log(data);
            alert(`Nodes: ${data.num_nodes}, Edges:${data.num_edges}, DAG:${data.is_dag}`)

            if (!response.ok) {
                console.error('Failed to submit pipeline data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
