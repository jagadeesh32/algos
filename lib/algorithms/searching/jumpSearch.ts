import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateSortedArray } from '@/lib/utils/random';

const jumpSearchRun = ({ array, target }: { array: number[], target: number }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const n = array.length;
    // Use optimal block size sqrt(n)
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;

    steps.push({
        type: 'focus',
        description: `Block size: ${step}. Jumping...`,
        highlightIndices: [0],
    });

    // Jump Loop
    while (array[Math.min(step, n) - 1] < target) {
        steps.push({
            type: 'compare',
            description: `Checking index ${Math.min(step, n) - 1} (${array[Math.min(step, n) - 1]}) < ${target}. Jumping ahead.`,
            highlightIndices: [prev, Math.min(step, n) - 1],
        });
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) {
            steps.push({
                type: 'focus',
                description: `Reached end of array. Target not found.`,
                highlightIndices: [],
            });
            return steps;
        }
    }

    // Linear Search Loop
    steps.push({
        type: 'focus',
        description: `Found block where ${target} might exist (between ${prev} and ${Math.min(step, n)}). Linear searching...`,
        highlightIndices: [prev],
    });

    while (array[prev] < target) {
        steps.push({
            type: 'compare',
            description: `Checking index ${prev} (${array[prev]})`,
            highlightIndices: [prev],
        });
        prev++;
        if (prev === Math.min(step, n)) {
            steps.push({
                type: 'focus',
                description: `Values in block exceeded target. Not found.`,
                highlightIndices: [prev],
            });
            return steps;
        }
    }

    // Check
    steps.push({
        type: 'compare',
        description: `Checking index ${prev} (${array[prev]})`,
        highlightIndices: [prev],
    });

    if (array[prev] === target) {
        steps.push({
            type: 'sorted',
            description: `Found target ${target} at index ${prev}`,
            highlightIndices: [prev],
        });
    } else {
        steps.push({
            type: 'focus',
            description: `Target ${target} not found.`,
            highlightIndices: [],
        });
    }

    return steps;
};

export const jumpSearch: AlgorithmProfile = {
    id: 'jump-search',
    name: 'Jump Search',
    category: 'Searching',
    description: 'Searches sorted array by jumping ahead by fixed steps.',
    complexity: {
        time: 'O(√n)',
        space: 'O(1)',
    },
    run: jumpSearchRun as any,
    generateRandomInput: generateSortedArray,
};
