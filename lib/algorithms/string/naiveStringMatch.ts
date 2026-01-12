import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateStringPattern } from '@/lib/utils/random';

const naiveStringMatchRun = (input: { text: string, pattern: string }): AnimationStep[] => {
    // We need to pass array of chars to visualizer
    const textChars = input.text.split('');
    const steps: AnimationStep[] = [];
    const n = textChars.length;
    const m = input.pattern.length;

    // We are hacking the step generation: The Visualizer will play these on top of "textChars" array.
    // But wait, the visualizer gets "input" from context.
    // The Context "input" is what generateRandomInput returns.
    // If generate returns object {text, pattern}, ArrayVisualizer might break if it expects array?
    // My ArrayVisualizer check: "if (!Array.isArray(input)) return []".
    // So I must return an ARRAY for ArrayVisualizer.
    // I will return textChars as the main input.
    // But I lose 'pattern'.
    // Fix: Return textChars array, but attach pattern as property? Array can have props? No.
    // Fix: Return custom object to Visualizer, and update ArrayVisualizer to handle { text: [], pattern: string }?
    // Yes. I'll update ArrayVisualizer to look for input.text if input is object.
    // OR: I simply output textChars array from run, but I rely on closure "input.pattern" inside run?
    // "run" receives the input object.

    // Actually, visualizer state "input" is set to whatever generator returns.
    // If generator returns { text, pattern }, ArrayVisualizer sees that.
    // I need to update ArrayVisualizer to handle this.

    steps.push({
        type: 'focus',
        description: `Searching for pattern "${input.pattern}" in text.`,
        highlightIndices: [],
    });

    for (let i = 0; i <= n - m; i++) {
        let match = true;
        for (let j = 0; j < m; j++) {
            steps.push({
                type: 'compare',
                description: `Comparing Text[${i + j}] ('${input.text[i + j]}') with Pattern[${j}] ('${input.pattern[j]}')`,
                highlightIndices: [i + j],
            });

            if (input.text[i + j] !== input.pattern[j]) {
                match = false;
                break;
            }
        }

        if (match) {
            steps.push({
                type: 'sorted',
                description: `Pattern matched at index ${i}!`,
                highlightIndices: Array.from({ length: m }, (_, k) => i + k),
            });
        }
    }

    return steps;
};

export const naiveStringMatch: AlgorithmProfile = {
    id: 'naive-string-match',
    name: 'Naive String Match',
    category: 'String',
    description: 'Finds pattern in text using sliding window.',
    complexity: {
        time: 'O(nm)',
        space: 'O(1)',
    },
    run: naiveStringMatchRun as any,
    generateRandomInput: generateStringPattern,
};
