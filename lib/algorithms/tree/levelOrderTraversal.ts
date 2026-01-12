import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomBinaryTree } from '@/lib/utils/random';

const levelOrderTraversalRun = (nodes: any[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const nodeMap = new Map<string, any>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    if (nodes.length === 0) return [];
    const startId = 'node-0';
    const queue = [startId];

    steps.push({
        type: 'focus',
        description: `Starting Level Order Traversal from Root`,
        highlightNodes: [startId],
    });

    while (queue.length > 0) {
        const currId = queue.shift()!;
        const node = nodeMap.get(currId);

        steps.push({
            type: 'sorted', // Visited
            description: `Visiting Node ${node.value}`,
            highlightNodes: [currId],
        });

        if (node.left) {
            queue.push(node.left);
            steps.push({
                type: 'compare',
                description: `Adding Left Child ${node.left} to Queue`,
                highlightNodes: [currId, node.left],
                highlightEdges: [`l-${currId}`]
            });
        }
        if (node.right) {
            queue.push(node.right);
            steps.push({
                type: 'compare',
                description: `Adding Right Child ${node.right} to Queue`,
                highlightNodes: [currId, node.right],
                highlightEdges: [`r-${currId}`]
            });
        }
    }

    return steps;
};

export const levelOrderTraversal: AlgorithmProfile = {
    id: 'level-order-traversal',
    name: 'Binary Tree Level Order Traversal',
    category: 'Tree',
    description: 'Traverses the tree level by level (BFS).',
    complexity: {
        time: 'O(n)',
        space: 'O(n)',
    },
    run: levelOrderTraversalRun,
    generateRandomInput: generateRandomBinaryTree,
};
