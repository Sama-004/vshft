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
  nodeIDs: {},
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
    let label = '';

    if (sourceNode && sourceNode.data) {
      switch (sourceNode.type) {
        case 'text':
          label = sourceNode.data.text || '';
          break;
        case 'test':
          label = sourceNode.data.test || '';
          break;
        case 'status':
          label = sourceNode.data.status || '';
          break;
        case 'math':
          label = sourceNode.data.operation ? {
            '+': 'Addition result',
            '-': 'Subtraction result',
            '*': 'Multiplication result',
            '/': 'Division result'
          }[sourceNode.data.operation] || '' : '';
          break;
        case 'llm':
          label = sourceNode.data.outputLabel || 'LLM response'
          break;
        case 'filter':
          label = sourceNode.data.outputLabel || 'Filtered image';
          break;
        case 'translation':
          label = sourceNode.data.outputLabel || 'Translated text';
          break
        case 'inputName':
          label = sourceNode.data.outputLabel || 'Inputted data';
          break
        default:
          // label = "error"
          break
      }
    }

    set({
      edges: addEdge({
        ...connection,
        type: 'smoothstep',
        animated: true,
        markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
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
          switch (sourceNode.type) {
            case 'text':
              label = sourceNode.data.text || '';
              break;
            case 'test':
              label = sourceNode.data.test || '';
              break;
            case 'status':
              label = sourceNode.data.status || '';
              break;
            case 'math':
              label = sourceNode.data.operation ? {
                '+': 'Addition result',
                '-': 'Subtraction result',
                '*': 'Multiplication result',
                '/': 'Division result'
              }[sourceNode.data.operation] || '' : '';
              break;
            case 'llm':
              label = sourceNode.data.outputLabel || 'LLM response';
              break;
            case 'filter':
              label = sourceNode.data.outputLabel || 'Filtered image';
              break;
            case 'translation':
              label = sourceNode.data.outputLabel || 'Translated text'
              break
            case 'inputName':
              label = sourceNode.data.outputLabel || 'Inputted data';
              break
            default:
              // label = "error"
              break
          }
          return { ...edge, label };
        }
      }
      return edge;
    });

    set({ nodes: updatedNodes, edges: updatedEdges });
  },
  deleteNode: (nodeId) => {
    const { nodes, edges } = get();
    const updatedNodes = nodes.filter(node => node.id !== nodeId);
    const updatedEdges = edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId);
    set({ nodes: updatedNodes, edges: updatedEdges });
  },
}));
