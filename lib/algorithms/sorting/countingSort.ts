import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomArray } from '@/lib/utils/random';

const countingSortRun = (input: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const arr = [...input];
    const n = arr.length;
    if (n === 0) return [];

    const min = Math.min(...arr);
    const max = Math.max(...arr); // Range is important for visualizer. Assume small random inputs (5-105).
    // If range is large, counting sort is bad.

    const count = new Array(max - min + 1).fill(0);

    // Count phase
    steps.push({
        type: 'focus',
        description: `Counting frequencies. Range: [${min}, ${max}]`,
        highlightIndices: [],
    });

    for (let i = 0; i < n; i++) {
        count[arr[i] - min]++;
        steps.push({
            type: 'compare',
            description: `Counting ${arr[i]}.`,
            highlightIndices: [i],
            auxiliaryData: { countArray: [...count] } // Can show aux array if viz supported it
        });
    }

    // Rewrite phase
    let idx = 0;
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            arr[idx] = i + min;
            steps.push({
                type: 'overwrite',
                description: `Placing ${i + min} at index ${idx}`,
                highlightIndices: [idx],
                value: arr[idx]
            });
            idx++;
            count[i]--;
        }
    }

    steps.push({
        type: 'sorted',
        description: 'Sorting Complete.',
        highlightIndices: Array.from({ length: n }, (_, k) => k),
    });

    return steps;
};

export const countingSort: AlgorithmProfile = {
    id: 'counting-sort',
    name: 'Counting Sort',
    category: 'Sorting',
    description: 'Linearly sorts integers by counting frequencies.',
    complexity: {
        time: 'O(n+k)',
        space: 'O(k)',
    },
    run: countingSortRun,
    generateRandomInput: (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 50) + 10) // smaller range
};
