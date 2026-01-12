import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomLinkedListWithCycle } from '@/lib/utils/random';

const detectCycleRun = (nodes: any[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    // nodes array mapping
    const findNode = (id: string) => nodes.find(n => n.id === id);

    if (nodes.length === 0) return [];
    const headId = nodes[0].id; // node-0

    let slow = headId;
    let fast = headId;

    steps.push({
        type: 'focus',
        description: 'Initialized Slow and Fast pointers at Head.',
        highlightNodes: [headId],
    });

    while (slow && fast) {
        const slowNode = findNode(slow);
        const fastNode = findNode(fast);

        // Move slow
        slow = slowNode?.next || null;

        // Move fast twice
        // 1st step
        let fastNext = fastNode?.next || null;
        if (!fastNext) {
            steps.push({
                type: 'focus',
                description: 'Fast pointer reached null. No cycle.',
                highlightNodes: [fast],
            });
            break;
        }

        const fastNextNode = findNode(fastNext);
        fast = fastNextNode?.next || null;

        steps.push({
            type: 'compare',
            description: `Moved pointers. Slow at ${slow}, Fast at ${fast}`,
            highlightNodes: [slow, fast].filter(Boolean) as string[],
        });

        if (slow === fast && slow !== null) {
            steps.push({
                type: 'sorted',
                description: `Cycle Detected! Pointers met at ${slow}`,
                highlightNodes: [slow],
            });
            return steps;
        }

        if (!fast) {
            steps.push({
                type: 'focus',
                description: 'Fast pointer reached null. No cycle.',
                highlightNodes: [slow],
            });
            break;
        }
    }

    return steps;
};

export const detectCycle: AlgorithmProfile = {
    id: 'detect-cycle',
    name: "Detect Cycle (Floyd's)",
    category: 'LinkedList',
    description: 'Uses Fast and Slow pointers to detect if a linked list has a cycle.',
    complexity: {
        time: 'O(n)',
        space: 'O(1)',
    },
    run: detectCycleRun,
    generateRandomInput: generateRandomLinkedListWithCycle,
};
