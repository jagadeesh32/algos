import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomBinaryTree } from '@/lib/utils/random';

const preorderTraversalRun = (nodes: any[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const nodeMap = new Map<string, any>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    const traverse = (id: string | null) => {
        if (!id) return;
        const node = nodeMap.get(id);

        steps.push({
            type: 'compare',
            description: `Visiting Node ${node.value} (Preorder)`,
            highlightNodes: [id],
        });

        if (node.left) {
            steps.push({
                type: 'focus',
                description: `Traversing Left to ${node.left}`,
                highlightNodes: [id, node.left],
                highlightEdges: [`l-${id}`] // Edge highlighting ideally supported by visualizer
            });
            traverse(node.left);
        }

        if (node.right) {
            steps.push({
                type: 'focus',
                description: `Traversing Right to ${node.right}`,
                highlightNodes: [id, node.right],
                highlightEdges: [`r-${id}`]
            });
            traverse(node.right);
        }
    };

    if (nodes.length > 0) traverse('node-0');

    steps.push({
        type: 'sorted',
        description: 'Preorder Traversal Complete',
        highlightNodes: [],
    });

    return steps;
};

export const preorderTraversal: AlgorithmProfile = {
    id: 'preorder-traversal',
    name: 'Binary Tree Preorder Traversal',
    category: 'Tree',
    description: 'Traverses the tree in Root-Left-Right order.',
    complexity: {
        time: 'O(n)',
        space: 'O(h)',
    },
    run: preorderTraversalRun,
    generateRandomInput: generateRandomBinaryTree,
};
