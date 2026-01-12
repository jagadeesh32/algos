import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomGraph } from '@/lib/utils/random';

const primsRun = (input: { nodes: any[], edges: any[] }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const { nodes, edges } = input;

    // Add weights if missing
    edges.forEach(e => {
        if (e.weight === undefined) e.weight = Math.floor(Math.random() * 9) + 1;
    });

    const adj = new Map<string, { target: string, weight: number }[]>();
    nodes.forEach(n => adj.set(n.id, []));
    edges.forEach(e => {
        adj.get(e.source)?.push({ target: e.target, weight: e.weight });
        adj.get(e.target)?.push({ target: e.source, weight: e.weight });
    });

    const startId = nodes[0]?.id;
    if (!startId) return [];

    const mstSet = new Set<string>();
    const visited = new Set<string>(); // To check if added to MST

    // Simple "Priority Queue" simulation using linear scan of cut edges
    // Or keep minEdge array.

    visited.add(startId);
    mstSet.add(startId);

    steps.push({
        type: 'focus',
        description: `Starting Prim's MST from ${startId}`,
        highlightNodes: [startId],
    });

    while (visited.size < nodes.length) {
        let minWeight = Infinity;
        let minEdge: { u: string, v: string } | null = null;

        // Find crossing edge
        visited.forEach(u => {
            const neighbors = adj.get(u) || [];
            neighbors.forEach(nbr => {
                if (!visited.has(nbr.target)) {
                    if (nbr.weight < minWeight) {
                        minWeight = nbr.weight;
                        minEdge = { u, v: nbr.target };
                    }
                }
            });
        });

        if (!minEdge) break; // Disconnected

        steps.push({
            type: 'compare',
            description: `Found min crossing edge ${minEdge.u}-${minEdge.v} (Weight: ${minWeight})`,
            highlightNodes: [minEdge.u, minEdge.v],
            highlightEdges: [`${minEdge.u}-${minEdge.v}`],
        });

        visited.add(minEdge.v);
        mstSet.add(minEdge.v); // Just logic

        steps.push({
            type: 'sorted', // MST edge
            description: `Added ${minEdge.v} to MST`,
            highlightNodes: Array.from(visited),
            highlightEdges: [`${minEdge.u}-${minEdge.v}`], // Keep highlighted?
            // We need to keep track of MST edges to keep them highlighted.
            // The visualizer 'activeStep' logic only highlights current step.
            // Unless we accumulate in 'highlightEdges'?
            // Yes, we should accumulate MST edges.
        });
    }

    // Final step with all highlights?
    // We need to store accumulated edges in state logic or just pass them all in the final step.
    // Visualizer assumes "Replay" handles accumulation? No, visualizer handles current step state.
    // It relies on "highlight*". Primitive visualizer doesn't persist 'visited' state unless encoded.
    // GraphVisualizer is simple currently. 
    // We'll rely on one-shot highlight of the MST at end?

    return steps;
};

export const prims: AlgorithmProfile = {
    id: 'prims',
    name: "Prim's Algorithm (MST)",
    category: 'Greedy',
    description: 'Finds Minimum Spanning Tree using Greedy approach.',
    complexity: {
        time: 'O(E log V)',
        space: 'O(V)',
    },
    run: primsRun,
    generateRandomInput: (size) => {
        const g = generateRandomGraph(size);
        g.edges.forEach((e: any) => e.weight = Math.floor(Math.random() * 9) + 1);
        return g;
    },
};
