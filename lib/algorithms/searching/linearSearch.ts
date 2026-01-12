import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';

const linearSearchRun = ({ array, target }: { array: number[], target: number }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const n = array.length;

    for (let i = 0; i < n; i++) {
        steps.push({
            type: 'compare',
            description: `Checking index ${i}: Is ${array[i]} equal to target ${target}?`,
            highlightIndices: [i],
        });

        if (array[i] === target) {
            steps.push({
                type: 'sorted', // Use sorted color for found
                description: `Found target ${target} at index ${i}!`,
                highlightIndices: [i],
            });
            return steps;
        }
    }

    steps.push({
        type: 'focus', // or error color
        description: `Target ${target} not found in array.`,
        highlightIndices: [],
    });

    return steps;
};

export const linearSearch: AlgorithmProfile = {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'Searching',
    description: 'Iterates through the list sequentially to find the target element.',
    complexity: {
        time: 'O(n)',
        space: 'O(1)',
    },
    run: linearSearchRun as any,
};
