import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomArray } from '@/lib/utils/random';

const queueImplRun = (input: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const queue: number[] = []; // logical queue for steps

    steps.push({
        type: 'focus',
        description: 'Queue Simulation: Initializing Empty Queue',
        highlightIndices: [],
    });

    // Enqueue Phase
    for (let i = 0; i < input.length; i++) {
        const val = input[i];
        queue.push(val);
        steps.push({
            type: 'overwrite',
            description: `Enqueue(${val}) -> Rear is index ${queue.length - 1}`,
            highlightIndices: [queue.length - 1],
            value: val,
        });
    }

    steps.push({
        type: 'sorted',
        description: 'Queue Full. Starting Dequeue operations.',
        highlightIndices: Array.from({ length: queue.length }, (_, k) => k),
    });

    // Dequeue Phase
    // Visualizing Shift: moving start pointer? 
    // We'll mimic array shift by clearing index 0, then 1...
    for (let i = 0; i < input.length; i++) {
        steps.push({
            type: 'overwrite',
            description: `Dequeue() -> Removed ${input[i]} from Front (index ${i})`,
            highlightIndices: [i],
            value: 0, // Clear
        });
    }

    return steps;
};

export const queueImplementation: AlgorithmProfile = {
    id: 'queue-implementation',
    name: 'Queue Implementation',
    category: 'StackQueue',
    description: 'Demonstrates FIFO (First-In-First-Out) behavior.',
    complexity: {
        time: 'O(1) ops',
        space: 'O(n)',
    },
    run: queueImplRun,
    generateRandomInput: (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5),
};
