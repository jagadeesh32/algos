import { AlgorithmProfile, AnimationStep, SortAlgorithm } from '@/types/algorithm';
import { generateRandomArray } from '@/lib/utils/random';

const insertionSortRun = (arr: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const n = arr.length;
    const a = [...arr]; // Working copy

    // First element is implicitly sorted
    steps.push({
        type: 'sorted',
        description: 'Index 0 is initially considered sorted',
        highlightIndices: [0]
    });

    for (let i = 1; i < n; i++) {
        const key = a[i];
        let j = i - 1;

        steps.push({
            type: 'focus',
            description: `Selecting value ${key} at index ${i} to insert`,
            highlightIndices: [i],
        });

        while (j >= 0 && a[j] > key) {
            steps.push({
                type: 'compare',
                description: `Comparing ${key} with ${a[j]} at index ${j}`,
                highlightIndices: [i, j],
                // We highlight 'i' as the key source, but technically 'i' conceptual position moves or is temporarily void?
                // Let's just highlight j and the current hole.
            });

            // Shift
            steps.push({
                type: 'overwrite', // or swap? Insertion sort logically shifts. 
                // We can model shift as swap or overwrite. 
                // Overwrite is better: a[j+1] = a[j]
                description: `Shifting ${a[j]} from index ${j} to ${j + 1}`,
                highlightIndices: [j + 1],
                value: a[j],
            });

            a[j + 1] = a[j];
            j = j - 1;
        }

        // Insert key
        steps.push({
            type: 'overwrite',
            description: `Inserting ${key} at position ${j + 1}`,
            highlightIndices: [j + 1],
            value: key,
        });
        a[j + 1] = key;

        // Mark i as part of sorted logical block? 
        // Visualization of 'sorted' in insertion sort is strictly 0..i
        // We can emit a step to color range 0..i as sorted
        /*
        steps.push({
            type: 'sorted',
            description: `Elements 0 to ${i} are sorted`,
            highlightIndices: Array.from({length: i + 1}, (_, k) => k)
        });
        */
    }

    // Final sorted marker
    steps.push({
        type: 'sorted',
        description: 'Array is fully sorted',
        highlightIndices: Array.from({ length: n }, (_, k) => k),
    });

    return steps;
};

export const insertionSort: SortAlgorithm = {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'Sorting',
    description: 'Builds the final sorted array one item at a time.',
    complexity: {
        time: 'O(n²)',
        space: 'O(1)',
    },
    run: insertionSortRun,
    generateRandomInput: generateRandomArray,
};
