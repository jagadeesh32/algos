import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateLCSInput } from '@/lib/utils/random';

const lcsRun = (input: { s1: string, s2: string, grid: number[][] }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const { s1, s2, grid } = input;
    const rows = s1.length + 1;
    const cols = s2.length + 1;
    // grid is already initialized 0s by generator

    const dp = grid.map(r => [...r]);

    steps.push({
        type: 'focus',
        description: `Calculating LCS for "${s1}" and "${s2}"`,
        highlightCoordinates: [],
    });

    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            const char1 = s1[i - 1];
            const char2 = s2[j - 1];

            steps.push({
                type: 'compare',
                description: `Comparing ${char1} (row ${i}) and ${char2} (col ${j})`,
                highlightCoordinates: [[i, j]],
            });

            if (char1 === char2) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                steps.push({
                    type: 'overwrite',
                    description: `Match! dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}`,
                    highlightCoordinates: [[i, j], [i - 1, j - 1]], // Highlight diagonal source
                    value: dp[i][j]
                });
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                steps.push({
                    type: 'overwrite',
                    description: `Mismatch. dp[${i}][${j}] = Max(Top, Left) = ${dp[i][j]}`,
                    highlightCoordinates: [[i, j], [i - 1, j], [i, j - 1]],
                    value: dp[i][j]
                });
            }
        }
    }

    steps.push({
        type: 'sorted',
        description: `LCS Length: ${dp[rows - 1][cols - 1]}`,
        highlightCoordinates: [[rows - 1, cols - 1]],
    });

    return steps;
};

export const lcs: AlgorithmProfile = {
    id: 'lcs',
    name: 'Longest Common Subsequence',
    category: 'DP',
    description: 'Finds length of LCS using 2D Dynamic Programming.',
    complexity: {
        time: 'O(NM)',
        space: 'O(NM)',
    },
    run: lcsRun as any, // input typing
    generateRandomInput: generateLCSInput,
};
