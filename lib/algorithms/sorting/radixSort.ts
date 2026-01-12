import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomArray } from '@/lib/utils/random';

const radixSortRun = (input: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    let arr = [...input];
    const n = arr.length;
    if (n === 0) return [];

    const max = Math.max(...arr);

    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        steps.push({
            type: 'focus',
            description: `Sorting by digit place ${exp}`,
            highlightIndices: [],
        });

        const output = new Array(n).fill(0);
        const count = new Array(10).fill(0);

        for (let i = 0; i < n; i++) {
            count[Math.floor(arr[i] / exp) % 10]++;
        }

        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        for (let i = n - 1; i >= 0; i--) {
            output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
            count[Math.floor(arr[i] / exp) % 10]--;
        }

        for (let i = 0; i < n; i++) {
            arr[i] = output[i];
            steps.push({
                type: 'overwrite',
                description: `Updating index ${i} to ${arr[i]} (after digit sort)`,
                highlightIndices: [i],
                value: arr[i]
            });
        }
    }

    steps.push({
        type: 'sorted',
        description: 'Radix Sort Complete.',
        highlightIndices: Array.from({ length: n }, (_, k) => k),
    });

    return steps;
};

export const radixSort: AlgorithmProfile = {
    id: 'radix-sort',
    name: 'Radix Sort',
    category: 'Sorting',
    description: 'Sorts numbers digit by digit from LSD.',
    complexity: {
        time: 'O(nk)',
        space: 'O(n+k)',
    },
    run: radixSortRun,
    generateRandomInput: generateRandomArray,
};
