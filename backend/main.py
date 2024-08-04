from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict


app = FastAPI()
origins = [
    "http://localhost:3000",  
    "http://127.0.0.1:3000",
    "https://prodcutionUrl.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)



class Node(BaseModel):
    id: str
    type: str
    data: Dict

class Edge(BaseModel):
    source: str
    target: str
    id: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    from collections import defaultdict, deque

    graph = defaultdict(list)
    in_degree = defaultdict(int)

    for edge in edges:
        graph[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    zero_in_degree = deque(node.id for node in nodes if in_degree[node.id] == 0)
    visited_nodes = 0

    while zero_in_degree:
        node = zero_in_degree.popleft()
        visited_nodes += 1
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                zero_in_degree.append(neighbor)

    return visited_nodes == len(nodes)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges
    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag_flag = is_dag(nodes, edges)
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag_flag}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000, reload=True)