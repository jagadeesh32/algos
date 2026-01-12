import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomBinaryTree } from '@/lib/utils/random';

const inorderTraversalRun = (nodes: any[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const nodeMap = new Map<string, any>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    const traverse = (id: string | null) => {
        if (!id) return;
        const node = nodeMap.get(id);

        steps.push({
            type: 'focus',
            description: `Traversing to ${id} (Pre-recursive left check)`,
            highlightNodes: [id],
        });

        if (node.left) traverse(node.left);

        steps.push({
            type: 'compare',
            description: `Visiting Node ${node.value} (Inorder)`,
            highlightNodes: [id],
        });
        // Could push to "output list" in auxiliaryData

        if (node.right) traverse(node.right);
    };

    if (nodes.length > 0) traverse('node-0');

    steps.push({
        type: 'sorted',
        description: 'Traversal Complete',
        highlightNodes: [],
    });

    return steps;
};

export const inorderTraversal: AlgorithmProfile = {
    id: 'inorder-traversal',
    name: 'Binary Tree Inorder Traversal',
    category: 'Tree',
    description: 'Traverses the tree in Left-Root-Right order.',
    complexity: {
        time: 'O(n)',
        space: 'O(h)',
    },
    run: inorderTraversalRun,
    generateRandomInput: generateRandomBinaryTree,
};
