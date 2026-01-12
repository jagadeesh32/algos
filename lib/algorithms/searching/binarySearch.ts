import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateSortedArray } from '@/lib/utils/random';

const binarySearchRun = ({ array, target }: { array: number[], target: number }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    // Note: Binary Search requires sorted array. 
    // We will assume array is sorted or we can emit a warning step/sort step first.
    // Ideally, valid binary search visualization implies input is monotonic.
    // We'll proceed blindly like a standard algo.

    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        steps.push({
            type: 'compare',
            description: `Checking middle index ${mid} (${array[mid]}). Range: [${low}, ${high}]`,
            highlightIndices: [low, high, mid], // maybe color mid differently
        });

        if (array[mid] === target) {
            steps.push({
                type: 'sorted',
                description: `Found target ${target} at index ${mid}!`,
                highlightIndices: [mid],
            });
            return steps;
        }

        if (array[mid] < target) {
            steps.push({
                type: 'focus',
                description: `${array[mid]} < ${target}, ignoring left half.`,
                highlightIndices: [low, mid],
            });
            low = mid + 1;
        } else {
            steps.push({
                type: 'focus',
                description: `${array[mid]} > ${target}, ignoring right half.`,
                highlightIndices: [mid, high],
            });
            high = mid - 1;
        }
    }

    steps.push({
        type: 'focus',
        description: `Target ${target} not found.`,
        highlightIndices: [],
    });

    return steps;
};

export const binarySearch: AlgorithmProfile = {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    description: 'Efficient search algorithm that works on sorted arrays by repeatedly dividing the search interval in half.',
    complexity: {
        time: 'O(log n)',
        space: 'O(1)',
    },
    run: binarySearchRun as any,
    generateRandomInput: generateSortedArray,
};

