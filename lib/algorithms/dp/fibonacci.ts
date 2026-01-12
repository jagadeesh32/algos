import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';

const fibonacciRun = (input: number[]): AnimationStep[] => {
    // Input: Actually we just need N. The input array size N is good proxy.
    const n = input.length;
    if (n < 2) return [];

    const steps: AnimationStep[] = [];
    const dp: number[] = new Array(n).fill(0);

    // Base cases
    dp[0] = 0;
    dp[1] = 1;

    steps.push({
        type: 'overwrite',
        description: `Base case: F(0) = 0`,
        highlightIndices: [0],
        value: 0
    });

    steps.push({
        type: 'overwrite',
        description: `Base case: F(1) = 1`,
        highlightIndices: [1],
        value: 1
    });

    for (let i = 2; i < n; i++) {
        steps.push({
            type: 'compare',
            description: `Calculating F(${i}) = F(${i - 1}) + F(${i - 2})`,
            highlightIndices: [i, i - 1, i - 2],
        });
        dp[i] = dp[i - 1] + dp[i - 2];

        steps.push({
            type: 'overwrite',
            description: `F(${i}) = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
            highlightIndices: [i],
            value: dp[i]
        });
    }

    steps.push({
        type: 'sorted',
        description: `Fibonacci Sequence calculated up to ${n}`,
        highlightIndices: Array.from({ length: n }, (_, k) => k),
    });

    return steps;
};

export const fibonacci: AlgorithmProfile = {
    id: 'fibonacci-dp',
    name: 'Fibonacci (DP)',
    category: 'DP',
    description: 'Calculates Fibonacci sequence using iterative Dynamic Programming.',
    complexity: {
        time: 'O(n)',
        space: 'O(n)',
    },
    run: fibonacciRun,
    // Use default array generator to determine "N" via size
};
