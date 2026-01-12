import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomGraph } from '@/lib/utils/random';

const dijkstraRun = (input: { nodes: any[], edges: any[] }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const { nodes, edges } = input;

    // Assign random weights if missing (robustness)
    edges.forEach(e => {
        if (e.weight === undefined) e.weight = Math.floor(Math.random() * 10) + 1;
    });

    const adj = new Map<string, { target: string, weight: number }[]>();
    nodes.forEach(n => adj.set(n.id, []));
    edges.forEach(e => {
        adj.get(e.source)?.push({ target: e.target, weight: e.weight });
        adj.get(e.target)?.push({ target: e.source, weight: e.weight }); // Undirected
    });

    const startId = nodes[0]?.id;
    if (!startId) return [];

    const dist = new Map<string, number>();
    nodes.forEach(n => dist.set(n.id, Infinity));
    dist.set(startId, 0);

    const pq = [{ id: startId, dist: 0 }]; // Simple array as PQ
    const visited = new Set<string>();

    steps.push({
        type: 'focus',
        description: `Starting Dijkstra from ${startId}. Distances initialized to Infinity.`,
        highlightNodes: [startId],
    });

    while (pq.length > 0) {
        // Sort to simulate Priority Queue
        pq.sort((a, b) => a.dist - b.dist);
        const curr = pq.shift()!;

        if (visited.has(curr.id)) continue;
        visited.add(curr.id);

        steps.push({
            type: 'sorted',
            description: `Visited ${curr.id} with min distance ${curr.dist}`,
            highlightNodes: Array.from(visited),
        });

        const neighbors = adj.get(curr.id) || [];
        for (const nbr of neighbors) {
            if (!visited.has(nbr.target)) {
                const newDist = curr.dist + nbr.weight;

                steps.push({
                    type: 'compare',
                    description: `Checking neighbor ${nbr.target} (Edge Weight: ${nbr.weight}). New Path Dist: ${newDist}`,
                    highlightNodes: [curr.id, nbr.target],
                    highlightEdges: [`${curr.id}-${nbr.target}`],
                });

                if (newDist < (dist.get(nbr.target) as number)) {
                    dist.set(nbr.target, newDist);
                    pq.push({ id: nbr.target, dist: newDist });

                    steps.push({
                        type: 'overwrite',
                        description: `Updated distance of ${nbr.target} to ${newDist}`,
                        highlightNodes: [nbr.target],
                    });
                }
            }
        }
    }

    return steps;
};

// Need to update generator to output weights? Or Algo patches it?
// Algo patched it above. But better to have generator provide it.
// We'll stick to patching inside run for now to avoid breaking existing BFS/DFS inputs 
// or update generator to optionally add weights.
// Actually, BFS/DFS ignore weights, so it's safe to add them always.
// But I'll handle it inside Dijkstra for safety.

export const dijkstra: AlgorithmProfile = {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'Graph',
    description: 'Finds the shortest path between nodes in a graph.',
    complexity: {
        time: 'O(E log V)',
        space: 'O(V)',
    },
    run: dijkstraRun,
    generateRandomInput: (size) => {
        // Custom generator wrap to include weights
        const g = generateRandomGraph(size);
        g.edges.forEach((e: any) => e.weight = Math.floor(Math.random() * 9) + 1);
        return g;
    },
};
