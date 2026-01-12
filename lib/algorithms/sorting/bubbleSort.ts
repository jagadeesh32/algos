import { AlgorithmProfile, AnimationStep, SortAlgorithm } from '@/types/algorithm';
import { generateRandomArray } from '@/lib/utils/random';

const bubbleSortRun = (arr: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const n = arr.length;
    // Create a copy to track state during generation, though steps are what matters for visualization.
    // We can also just use indices since we are generating steps.
    // But to know *values* for overwrite or swaps if needed, we should mutate a working copy.
    const a = [...arr];

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Compare step
            steps.push({
                type: 'compare',
                description: `Comparing indices ${j} (${a[j]}) and ${j + 1} (${a[j + 1]})`,
                highlightIndices: [j, j + 1],
                compareIndices: [j, j + 1],
            });

            if (a[j] > a[j + 1]) {
                // Swap step
                steps.push({
                    type: 'swap',
                    description: `Swapping indices ${j} (${a[j]}) and ${j + 1} (${a[j + 1]})`,
                    highlightIndices: [j, j + 1],
                    swapIndices: [j, j + 1],
                });

                // Perform swap
                const temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
        // Mark as sorted
        steps.push({
            type: 'sorted',
            description: `Index ${n - 1 - i} is sorted`,
            highlightIndices: [n - 1 - i],
            auxiliaryData: { sortedIndex: n - 1 - i }
        });
    }
    // The first element is also sorted after the loop
    steps.push({
        type: 'sorted',
        description: `Index 0 is sorted`,
        highlightIndices: [0],
        auxiliaryData: { sortedIndex: 0 }
    });

    return steps;
};

export const bubbleSort: SortAlgorithm = {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    complexity: {
        time: 'O(n²)',
        space: 'O(1)',
    },
    run: bubbleSortRun,
    generateRandomInput: generateRandomArray,
};
