import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateStringPattern } from '@/lib/utils/random';

const kmpRun = (input: { text: string, pattern: string }): AnimationStep[] => {
    // NOTE: Logic assumes ArrayVisualizer will be updated to handle {text: string} object
    const steps: AnimationStep[] = [];
    const text = input.text;
    const pattern = input.pattern;
    const n = text.length;
    const m = pattern.length;

    if (m === 0) return [];

    // Compute LPS
    const lps = new Array(m).fill(0);
    let len = 0;
    let i = 1;

    steps.push({
        type: 'focus',
        description: `Computing LPS array for pattern "${pattern}"`,
        highlightIndices: [],
    });

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    steps.push({
        type: 'focus',
        description: `LPS Computed: [${lps.join(', ')}]. Starting Search.`,
        highlightIndices: [],
    });

    // Search
    let j = 0; // index for pat
    i = 0; // index for text

    while (i < n) {
        steps.push({
            type: 'compare',
            description: `Comparing Text[${i}] ('${text[i]}') vs Pattern[${j}] ('${pattern[j]}')`,
            highlightIndices: [i],
        });

        if (pattern[j] === text[i]) {
            j++;
            i++;
        }

        if (j === m) {
            steps.push({
                type: 'sorted',
                description: `Pattern found at index ${i - j}`,
                highlightIndices: Array.from({ length: m }, (_, k) => i - j + k),
            });
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
                steps.push({
                    type: 'focus',
                    description: `Mismatch. Using LPS: J jumps to ${j}`,
                    highlightIndices: [i],
                });
            } else {
                i++;
            }
        }
    }

    return steps;
};

export const kmp: AlgorithmProfile = {
    id: 'kmp',
    name: 'KMP Algorithm',
    category: 'String',
    description: 'Knuth-Morris-Pratt pattern searching using LPS array.',
    complexity: {
        time: 'O(n+m)',
        space: 'O(m)',
    },
    run: kmpRun as any,
    generateRandomInput: generateStringPattern,
};
