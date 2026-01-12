import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateSortedArray } from '@/lib/utils/random';
// We need binarySearch helper logic, but reusing implemented algo runs is tricky because of step format nesting.
// Better to inline logic or call run and flatten/offset? 
// Flattening is fine.

const exponentialSearchRun = ({ array, target }: { array: number[], target: number }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const n = array.length;

    if (array[0] === target) {
        steps.push({
            type: 'sorted',
            description: `Found target at index 0`,
            highlightIndices: [0],
        });
        return steps;
    }

    let i = 1;
    steps.push({
        type: 'focus',
        description: `Checking index 1.`,
        highlightIndices: [1],
    });

    while (i < n && array[i] <= target) {
        steps.push({
            type: 'compare',
            description: `Index ${i} (${array[i]}) <= target. Doubling index to ${i * 2}`,
            highlightIndices: [i],
        });
        i = i * 2;
    }

    // Range found
    const low = Math.floor(i / 2);
    const high = Math.min(i, n - 1);

    steps.push({
        type: 'focus',
        description: `Target is in range [${low}, ${high}]. Binary Searching...`,
        highlightIndices: [low, high],
    });

    // Inline Binary Search
    let l = low;
    let r = high;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        steps.push({
            type: 'compare',
            description: `BS: Checking mid ${mid} (${array[mid]})`,
            highlightIndices: [mid],
        });

        if (array[mid] === target) {
            steps.push({
                type: 'sorted',
                description: `Found target ${target} at index ${mid}`,
                highlightIndices: [mid],
            });
            return steps;
        }
        if (array[mid] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    steps.push({
        type: 'focus',
        description: `Target ${target} not found.`,
        highlightIndices: [],
    });

    return steps;
};

export const exponentialSearch: AlgorithmProfile = {
    id: 'exponential-search',
    name: 'Exponential Search',
    category: 'Searching',
    description: 'Finds range where element is present by doubling index, then Binary Search.',
    complexity: {
        time: 'O(log i)',
        space: 'O(1)',
    },
    run: exponentialSearchRun as any,
    generateRandomInput: generateSortedArray,
};
