import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomGraph } from '@/lib/utils/random';

const bfsRun = (input: { nodes: any[], edges: any[] }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const { nodes, edges } = input;

    // Build Adj List
    const adj = new Map<string, string[]>();
    nodes.forEach(n => adj.set(n.id, []));
    edges.forEach(e => {
        adj.get(e.source)?.push(e.target);
        adj.get(e.target)?.push(e.source); // Undirected for BFS demo usually
    });

    const startId = nodes[0]?.id;
    if (!startId) return [];

    const visited = new Set<string>();
    const queue = [startId];
    visited.add(startId);

    steps.push({
        type: 'focus',
        description: `Starting BFS from ${startId}`,
        highlightNodes: [startId],
    });

    while (queue.length > 0) {
        const curr = queue.shift()!;

        steps.push({
            type: 'sorted', // Visited
            description: `Visiting ${curr}`,
            highlightNodes: Array.from(visited), // keep history highlighed? 
            // Or just current? Let's keep visited set highlighted
        });

        const neighbors = adj.get(curr) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);

                steps.push({
                    type: 'compare',
                    description: `Discovered neighbor ${neighbor}`,
                    highlightNodes: [neighbor],
                    highlightEdges: [`${curr}-${neighbor}`],
                });
            }
        }
    }

    return steps;
};

export const bfs: AlgorithmProfile = {
    id: 'bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'Graph',
    description: 'Explores the graph layer by layer.',
    complexity: {
        time: 'O(V+E)',
        space: 'O(V)',
    },
    run: bfsRun,
    generateRandomInput: generateRandomGraph,
};
