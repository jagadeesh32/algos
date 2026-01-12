import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomArray } from '@/lib/utils/random';

const stackImplRun = (input: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const stack: number[] = [];

    // Simulation: Push all, then Pop all
    steps.push({
        type: 'focus',
        description: 'Stack Simulation: Initializing Empty Stack',
        highlightIndices: [],
    });

    // Push Phase
    for (let i = 0; i < input.length; i++) {
        const val = input[i];
        stack.push(val);

        // We can't easily "grow" the array in the visualizer unless we use 'overwrite' on a pre-filled array or just rely on 'value' property
        // Hack: The visualizer shows the *current* input state if we don't return steps? No.
        // The visualizer is Replay-based. It starts with Initial Input.
        // But Stack simulation starts with Empty.
        // Problem: Visualizer assumes "input" is the starting state.
        // If we want to show growing stack, "input" should be empty? 
        // But we generated random numbers to push.
        // Solution: The "Input" provided to visualizer is the pool of numbers to push.
        // But we want to visualize the *Stack*.
        // We'll treat the array as the Stack memory.
        // Initial state: Empty (or hidden).
        // We'll simulate by updating values at indices.

        steps.push({
            type: 'overwrite', // or 'add' if we supported dynamic size
            // ArrayVisualizer supports fixed size. 
            // We will visualize a fixed size array filling up.
            description: `Push(${val}) -> Stack Top is index ${stack.length - 1}`,
            highlightIndices: [stack.length - 1],
            value: val,
            auxiliaryData: { operation: 'push', value: val } // For future stack visualizer
        });
    }

    steps.push({
        type: 'sorted',
        description: 'Stack Full. Starting Pop operations.',
        highlightIndices: Array.from({ length: stack.length }, (_, k) => k),
    });

    // Pop Phase
    while (stack.length > 0) {
        const val = stack.pop();
        steps.push({
            type: 'overwrite',
            description: `Pop() -> Removed ${val}. New Top is index ${stack.length - 1}`,
            highlightIndices: [stack.length],
            value: 0, // Clear it? Or use mask?
            // ArrayVisualizer: 0 height bar.
        });
    }

    return steps;
};

export const stackImplementation: AlgorithmProfile = {
    id: 'stack-implementation',
    name: 'Stack Implementation',
    category: 'StackQueue',
    description: 'Demonstrates LIFO (Last-In-First-Out) behavior.',
    complexity: {
        time: 'O(1) ops',
        space: 'O(n)',
    },
    run: stackImplRun,
    generateRandomInput: (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5),
};
