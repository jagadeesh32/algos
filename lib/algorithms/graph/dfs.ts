import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomGraph } from '@/lib/utils/random';

const dfsRun = (input: { nodes: any[], edges: any[] }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const { nodes, edges } = input;

    // Build Adj List
    const adj = new Map<string, string[]>();
    nodes.forEach(n => adj.set(n.id, []));
    edges.forEach(e => {
        adj.get(e.source)?.push(e.target);
        adj.get(e.target)?.push(e.source);
    });

    const startId = nodes[0]?.id;
    if (!startId) return [];

    const visited = new Set<string>();

    const dfs = (nodeId: string) => {
        visited.add(nodeId);

        steps.push({
            type: 'sorted',
            description: `Visiting ${nodeId}`,
            highlightNodes: Array.from(visited), // Keep all visited highlighted
        });

        const neighbors = adj.get(nodeId) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                steps.push({
                    type: 'compare',
                    description: `Traversing from ${nodeId} to ${neighbor}`,
                    highlightNodes: [nodeId, neighbor],
                    highlightEdges: [`${nodeId}-${neighbor}`],
                });
                dfs(neighbor);

                // Backtracking step visuals?
                steps.push({
                    type: 'focus',
                    description: `Backtracking to ${nodeId}`,
                    highlightNodes: [nodeId],
                });
            }
        }
    };

    steps.push({
        type: 'focus',
        description: `Starting DFS from ${startId}`,
        highlightNodes: [startId],
    });

    dfs(startId);

    return steps;
};

export const dfs: AlgorithmProfile = {
    id: 'dfs',
    name: 'Depth-First Search (DFS)',
    category: 'Graph',
    description: 'Explores as far as possible along each branch before backtracking.',
    complexity: {
        time: 'O(V+E)',
        space: 'O(V)',
    },
    run: dfsRun,
    generateRandomInput: generateRandomGraph,
};
