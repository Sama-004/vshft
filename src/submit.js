// submit.js
import { Button } from "./components/Button";
import { useStore } from "./store";
import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./components/Alert";

export const SubmitButton = () => {

    const { nodes, edges } = useStore(state => ({
        nodes: state.nodes,
        edges: state.edges
    }));


    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState({});

    const handleSubmit = async () => {
        console.log({ nodes, edges })
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
            if (response.ok) {
                setAlertContent({
                    title: "Pipeline Submitted Successfully",
                    description: `Nodes: ${data.num_nodes}, Edges: ${data.num_edges}, DAG: ${data.is_dag ? 'Yes' : 'No'}`
                });
            } else {
                setAlertContent({
                    title: "Error",
                    description: "Failed to submit pipeline data"
                });
            }
            setIsAlertOpen(true);
        } catch (error) {
            console.error('Error:', error);
            setAlertContent({
                title: "Error",
                description: "An unexpected error occurred"
            });
            setIsAlertOpen(true);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <Button type="submit" onClick={handleSubmit}>submit</Button>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{alertContent.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {alertContent.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setIsAlertOpen(false)}>
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
