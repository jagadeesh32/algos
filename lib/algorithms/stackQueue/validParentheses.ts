import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateRandomParentheses } from '@/lib/utils/random';

const validParenthesesRun = (input: string[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const stack: string[] = []; // This will be visualized
    const map: Record<string, string> = {
        '(': ')',
        '{': '}',
        '[': ']',
    };

    // Note: we want to visualize the stack.
    // We can treat "input" as the characters (invisible context)
    // and the "Visualizer Array" is the Stack.
    // Initial stack is empty.
    steps.push({
        type: 'focus',
        description: 'Starting Valid Parentheses Check. Stack is Empty.',
        highlightIndices: [],
    });

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (map[char]) {
            // It's an opener, push
            stack.push(char);
            steps.push({
                type: 'overwrite', // Add to stack visual
                description: `Found opener '${char}' at input[${i}]. Push to stack.`,
                highlightIndices: [stack.length - 1],
                value: char.charCodeAt(0), // Visualizer expects numbers. Hack: use char code
                // Ideally visualizer supports strings.
                // ArrayVisualizer renders "Value". We can probably change generic to display text?
                // The default ArrayVisualizer renders bars based on value.
                // CharCode 40 ( ) to 125 } is fine range 0-125
            });
        } else {
            // Closer
            const last = stack.pop();
            // We need reverse map or check
            const lastOpener = last;
            // Check match
            // Simplified map check
            const expectedCloser = lastOpener ? map[lastOpener] : null;

            if (char === expectedCloser) {
                steps.push({
                    type: 'overwrite',
                    description: `Found closer '${char}' at input[${i}]. Matches '${lastOpener}'. Pop stack.`,
                    highlightIndices: [stack.length], // The one just removed position
                    value: 0,
                });
            } else {
                steps.push({
                    type: 'focus',
                    description: `Mismatch! Found '${char}' but expected closer for '${lastOpener || 'empty'}'. Invalid.`,
                    highlightIndices: [],
                });
                return steps;
            }
        }
    }

    if (stack.length === 0) {
        steps.push({
            type: 'sorted',
            description: 'Stack Empty. String is Valid!',
            highlightIndices: [],
        });
    } else {
        steps.push({
            type: 'focus',
            description: 'Stack not empty. Invalid.',
            highlightIndices: Array.from({ length: stack.length }, (_, k) => k),
        });
    }

    return steps;
};

export const validParentheses: AlgorithmProfile = {
    id: 'valid-parentheses',
    name: 'Valid Parentheses',
    category: 'StackQueue',
    description: 'Checks if the input string has valid matching parentheses using a Stack.',
    complexity: {
        time: 'O(n)',
        space: 'O(n)',
    },
    run: validParenthesesRun,
    generateRandomInput: generateRandomParentheses,
};
