import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomBinaryTree } from '@/lib/utils/random';

const postorderTraversalRun = (nodes: any[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const nodeMap = new Map<string, any>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    const traverse = (id: string | null) => {
        if (!id) return;
        const node = nodeMap.get(id);

        if (node.left) {
            steps.push({
                type: 'focus',
                description: `Traversing Left to ${node.left}`,
                highlightNodes: [id],
            });
            traverse(node.left);
        }

        if (node.right) {
            steps.push({
                type: 'focus',
                description: `Traversing Right to ${node.right}`,
                highlightNodes: [id],
            });
            traverse(node.right);
        }

        steps.push({
            type: 'compare',
            description: `Visiting Node ${node.value} (Postorder)`,
            highlightNodes: [id],
        });
    };

    if (nodes.length > 0) traverse('node-0');

    steps.push({
        type: 'sorted',
        description: 'Postorder Traversal Complete',
        highlightNodes: [],
    });

    return steps;
};

export const postorderTraversal: AlgorithmProfile = {
    id: 'postorder-traversal',
    name: 'Binary Tree Postorder Traversal',
    category: 'Tree',
    description: 'Traverses the tree in Left-Right-Root order.',
    complexity: {
        time: 'O(n)',
        space: 'O(h)',
    },
    run: postorderTraversalRun,
    generateRandomInput: generateRandomBinaryTree,
};
