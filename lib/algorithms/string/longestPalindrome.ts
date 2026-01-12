import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';

const longestPalindromeRun = (input: string[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const str = input; // Array of chars
    const n = str.length;

    if (n === 0) return [];

    let start = 0;
    let end = 0;

    const expand = (left: number, right: number) => {
        while (left >= 0 && right < n && str[left] === str[right]) {
            steps.push({
                type: 'compare',
                description: `Expanding around center. indices ${left}, ${right} match ('${str[left]}').`,
                highlightIndices: [left, right], // Keep range highlighted ideally
            });

            left--;
            right++;
        }
        return right - left - 1;
    };

    for (let i = 0; i < n; i++) {
        steps.push({
            type: 'focus',
            description: `Checking centers at index ${i}`,
            highlightIndices: [i],
        });

        const len1 = expand(i, i);
        const len2 = expand(i, i + 1);
        const len = Math.max(len1, len2);

        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);

            steps.push({
                type: 'sorted',
                description: `New Max Palindrome Found: "${str.slice(start, end + 1).join('')}"`,
                highlightIndices: Array.from({ length: end - start + 1 }, (_, k) => start + k),
            });
        }
    }

    steps.push({
        type: 'sorted',
        description: `Longest Palindrome: "${str.slice(start, end + 1).join('')}"`,
        highlightIndices: Array.from({ length: end - start + 1 }, (_, k) => start + k),
    });

    return steps;
};

export const longestPalindrome: AlgorithmProfile = {
    id: 'longest-palindrome',
    name: 'Longest Palindromic Substring',
    category: 'String',
    description: 'Finds the longest substring which is a palindrome.',
    complexity: {
        time: 'O(n^2)',
        space: 'O(1)',
    },
    run: longestPalindromeRun,
    generateRandomInput: (size) => {
        // Generate string with some palindromes
        const chars = "ABCDE";
        const arr = [];
        for (let i = 0; i < size; i++) arr.push(chars[Math.floor(Math.random() * chars.length)]);
        return arr;
    },
};
