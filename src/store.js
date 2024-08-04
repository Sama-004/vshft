// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    const sourceNode = get().nodes.find(node => node.id === connection.source);
    const sourceHandle = connection.sourceHandle;
    let label = '';


    if (sourceNode && sourceNode.data) {
      if (sourceNode.type === 'text' || sourceNode.type === 'test') {
        label = sourceNode.data.text || sourceNode.data.test || '';
      } else if (sourceNode.type === 'input' && sourceNode.data.inputName) {
        label = sourceNode.data.inputName;
      } else if (sourceNode.type === 'status') {
        label = sourceNode.data.status || '';
      }
    }

    set({
      edges: addEdge({
        ...connection, type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
        label: label
      }, get().edges),
    });
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    const updatedNodes = get().nodes.map((node) => {
      if (node.id === nodeId) {
        node.data = { ...node.data, [fieldName]: fieldValue };
      }
      return node;
    });

    const updatedEdges = get().edges.map((edge) => {
      if (edge.source === nodeId) {
        const sourceNode = updatedNodes.find(node => node.id === nodeId);
        if (sourceNode) {
          let label = '';
          if (sourceNode.type === 'text' || sourceNode.type === 'test') {
            label = sourceNode.data.text || sourceNode.data.test || '';
          } else if (sourceNode.type === 'input') {
            label = sourceNode.data.inputName || '';
          } else if (sourceNode.type === 'status') {
            label = sourceNode.data.status || '';
          }
          return { ...edge, label };
        }
      }
      return edge;
    });

    set({ nodes: updatedNodes, edges: updatedEdges });
  },
}));
