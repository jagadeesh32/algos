import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomArray } from '@/lib/utils/random';

const slidingWindowRun = ({ array, target }: { array: number[], target: number }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const k = target;
    const n = array.length;

    if (k > n || k <= 0) {
        steps.push({
            type: 'focus',
            description: `Invalid Window Size K=${k}. Must be 1 <= k <= ${n}`,
            highlightIndices: [],
        });
        return steps;
    }

    let maxSum = 0;
    for (let i = 0; i < k; i++) {
        maxSum += array[i];
        steps.push({
            type: 'compare',
            description: `Building initial window: Sum += ${array[i]}`,
            highlightIndices: Array.from({ length: i + 1 }, (_, x) => x),
        });
    }

    steps.push({
        type: 'focus',
        description: `Initial Window Sum: ${maxSum}`,
        highlightIndices: Array.from({ length: k }, (_, x) => x),
    });

    let windowSum = maxSum;
    let maxStart = 0;

    for (let i = k; i < n; i++) {
        steps.push({
            type: 'compare',
            description: `Sliding window right. Subtracting ${array[i - k]} (index ${i - k}) and adding ${array[i]} (index ${i})`,
            highlightIndices: [i - k, i], // Highlighting entering/leaving
        });

        windowSum = windowSum - array[i - k] + array[i];

        if (windowSum > maxSum) {
            maxSum = windowSum;
            maxStart = i - k + 1;
            steps.push({
                type: 'swap',
                description: `New Max Sum Found: ${maxSum}`,
                highlightIndices: Array.from({ length: k }, (_, x) => maxStart + x),
            });
        } else {
            steps.push({
                type: 'focus',
                description: `Current Window Sum: ${windowSum}. Max is still ${maxSum}`,
                highlightIndices: Array.from({ length: k }, (_, x) => i - k + 1 + x),
            });
        }
    }

    steps.push({
        type: 'sorted',
        description: `Max Sum of subarray size ${k} is ${maxSum}`,
        highlightIndices: Array.from({ length: k }, (_, x) => maxStart + x),
    });

    return steps;
};

export const slidingWindow: AlgorithmProfile = {
    id: 'sliding-window',
    name: 'Sliding Window (Max Sum K)',
    category: 'Array',
    description: 'Finds the maximum sum of a contiguous subarray of size K.',
    complexity: {
        time: 'O(n)',
        space: 'O(1)',
    },
    run: slidingWindowRun as any,
    generateRandomInput: generateRandomArray,
};

