import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';

const countingBitsRun = (input: number[]): AnimationStep[] => {
    // Input: Array length N implies we count bits for 0..N-1
    const n = input.length;
    const steps: AnimationStep[] = [];
    const ans: string[] = new Array(n).fill("0");
    const bitsCount: number[] = new Array(n).fill(0);

    // Using DP: dp[i] = dp[i >> 1] + (i & 1)

    for (let i = 0; i < n; i++) {
        const bits = i.toString(2);
        ans[i] = bits;

        // Calculate count using logic
        if (i > 0) {
            bitsCount[i] = bitsCount[i >> 1] + (i & 1);
        }

        steps.push({
            type: 'overwrite',
            description: `Number ${i} (Binary ${bits}) has ${bitsCount[i]} set bits.`,
            highlightIndices: [i],
            value: bitsCount[i] // For height bar
            // Ideally show binary string as label? ArrayVisualizer shows 'value'.
        });
    }

    steps.push({
        type: 'sorted',
        description: 'Bits counted for all numbers.',
        highlightIndices: Array.from({ length: n }, (_, k) => k),
    });

    return steps;
};

export const countingBits: AlgorithmProfile = {
    id: 'counting-bits',
    name: 'Counting Bits',
    category: 'BitManipulation',
    description: 'Counts set bits for all numbers from 0 to n.',
    complexity: {
        time: 'O(n)',
        space: 'O(n)',
    },
    run: countingBitsRun,
    generateRandomInput: (size) => Array.from({ length: size }, (_, i) => i), // 0..N-1
};
