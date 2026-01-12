import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateWordSearch } from '@/lib/utils/random';

const wordSearchRun = (input: { grid: string[][], word: string }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const { grid, word } = input;
    const rows = grid.length;
    const cols = grid[0].length;

    // Note: we need to find word.
    // We can visualize the scan.

    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    const exist = (r: number, c: number, idx: number): boolean => {
        if (idx === word.length) return true;
        if (r < 0 || r >= rows || c < 0 || c >= cols || visited[r][c] || grid[r][c] !== word[idx]) {
            return false;
        }

        visited[r][c] = true;
        steps.push({
            type: 'compare',
            description: `Found '${word[idx]}' at (${r}, ${c}). Looking for next char.`,
            highlightCoordinates: [[r, c]],
        });

        const res = exist(r + 1, c, idx + 1) ||
            exist(r - 1, c, idx + 1) ||
            exist(r, c + 1, idx + 1) ||
            exist(r, c - 1, idx + 1);

        if (res) {
            steps.push({
                type: 'sorted',
                description: `Path found through (${r}, ${c})`,
                highlightCoordinates: [[r, c]],
            });
        } else {
            visited[r][c] = false; // backtrack
            steps.push({
                type: 'focus',
                description: `Backtracking from (${r}, ${c})`,
                highlightCoordinates: [[r, c]],
            });
        }
        return res;
    };

    steps.push({
        type: 'focus',
        description: `Searching for word "${word}"`,
        highlightCoordinates: [],
    });

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (exist(i, j, 0)) {
                steps.push({
                    type: 'sorted',
                    description: `Word Found!`,
                    highlightCoordinates: [],
                });
                return steps;
            }
        }
    }

    steps.push({
        type: 'focus',
        description: `Word not found.`,
        highlightCoordinates: [],
    });

    return steps;
};

export const wordSearch: AlgorithmProfile = {
    id: 'word-search',
    name: 'Word Search',
    category: 'Backtracking',
    description: 'Finds if word exists in 2D character grid.',
    complexity: {
        time: 'O(N*M*4^L)',
        space: 'O(L)',
    },
    run: wordSearchRun as any,
    generateRandomInput: generateWordSearch,
};
