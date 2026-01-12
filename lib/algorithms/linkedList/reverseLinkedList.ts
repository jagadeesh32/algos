import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomLinkedList } from '@/lib/utils/random';

const reverseLinkedListRun = (nodes: any[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    // nodes is Array of { id, value, next }
    // We need to simulate reversal logic on this Structure.
    // Standard iterative reverse: prev, curr, next.

    let prev = null;
    let curr = 'node-0'; // Assume head is node-0 or first node?
    // We should find head. It's usually index 0 in our generator.
    if (nodes.length === 0) return [];
    curr = nodes[0].id; // Assumption

    // Helper to find node object by id
    const findNode = (id: string) => nodes.find(n => n.id === id);

    steps.push({
        type: 'focus',
        description: 'Starting Reversal. Prev = null, Curr = Head',
        highlightNodes: [curr],
    });

    while (curr) {
        const currNode = findNode(curr);
        if (!currNode) break;

        const nextId = currNode.next;

        steps.push({
            type: 'focus',
            description: `Processing node ${currNode.value}. Next is ${nextId || 'null'}`,
            highlightNodes: [curr, nextId].filter(Boolean) as string[],
        });

        // Change pointer
        steps.push({
            type: 'overwrite',
            description: `Reversing pointer of ${currNode.value} to point to ${prev ? findNode(prev)?.value : 'null'}`,
            highlightNodes: [curr],
            auxiliaryData: {
                pointerChange: { sourceId: curr, targetId: prev }
            }
        });

        // Move pointers
        prev = curr;
        curr = nextId as string;
    }

    steps.push({
        type: 'sorted',
        description: 'List Reversed. New Head is ' + (prev ? findNode(prev)?.value : 'null'),
        highlightNodes: prev ? [prev] : [],
    });

    return steps;
};

export const reverseLinkedList: AlgorithmProfile = {
    id: 'reverse-linked-list',
    name: 'Reverse Linked List',
    category: 'LinkedList',
    description: 'Reverses the linked list in place by changing next pointers.',
    complexity: {
        time: 'O(n)',
        space: 'O(1)',
    },
    run: reverseLinkedListRun,
    generateRandomInput: generateRandomLinkedList,
};
