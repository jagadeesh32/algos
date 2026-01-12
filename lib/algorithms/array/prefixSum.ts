import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomArray } from '@/lib/utils/random';

const prefixSumRun = (arr: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const a = [...arr];

    for (let i = 1; i < a.length; i++) {
        const newVal = a[i] + a[i - 1];

        steps.push({
            type: 'compare',
            description: `Adding previous sum ${a[i - 1]} to current value ${a[i]}`,
            highlightIndices: [i, i - 1],
        });

        steps.push({
            type: 'overwrite',
            description: `Updating index ${i} to ${newVal}`,
            highlightIndices: [i],
            value: newVal,
        });

        a[i] = newVal;
    }

    steps.push({
        type: 'sorted',
        description: 'Prefix Sum Array Calculated',
        highlightIndices: Array.from({ length: a.length }, (_, k) => k),
    });

    return steps;
};

export const prefixSum: AlgorithmProfile = {
    id: 'prefix-sum',
    name: 'Prefix Sum',
    category: 'Array',
    description: 'Computes the cumulative sum of the array.',
    complexity: {
        time: 'O(n)',
        space: 'O(1)', // In-place
    },
    run: prefixSumRun,
    generateRandomInput: generateRandomArray,
};

