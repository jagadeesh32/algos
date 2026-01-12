import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateEmptyGrid } from '@/lib/utils/random';

const nQueensRun = (grid: string[][]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const n = grid.length;
    // We need to simulate placement.
    // Helper to check validity
    const board = grid.map(row => [...row]); // Cloned state for internal logic

    const isSafe = (row: number, col: number) => {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        // Check upper left diag
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        // Check upper right diag
        for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        return true;
    };

    const solve = (row: number): boolean => {
        if (row >= n) return true; // Found a solution

        for (let col = 0; col < n; col++) {

            steps.push({
                type: 'focus',
                description: `Trying to place Queen at (${row}, ${col})`,
                highlightCoordinates: [[row, col]],
            });

            if (isSafe(row, col)) {
                board[row][col] = 'Q';
                steps.push({
                    type: 'overwrite', // Place Q
                    description: `Placed Queen at (${row}, ${col})`,
                    highlightCoordinates: [[row, col]],
                    value: 'Q'
                });

                if (solve(row + 1)) return true;

                // Backtrack
                board[row][col] = '';
                steps.push({
                    type: 'overwrite', // Remove Q
                    description: `Backtracking from (${row}, ${col})`,
                    highlightCoordinates: [[row, col]],
                    value: ''
                });
            } else {
                steps.push({
                    type: 'compare', // Conflict
                    description: `Conflict at (${row}, ${col}). Cannot place.`,
                    highlightCoordinates: [[row, col]],
                });
            }
        }
        return false;
    };

    if (!solve(0)) {
        steps.push({
            type: 'focus',
            description: `No solution found for N=${n}`,
            highlightCoordinates: [],
        });
    } else {
        steps.push({
            type: 'sorted',
            description: `Solution Found!`,
            highlightCoordinates: [], // Keep final state
        });
    }

    return steps;
};

export const nQueens: AlgorithmProfile = {
    id: 'n-queens',
    name: 'N-Queens Backtracking',
    category: 'Backtracking',
    description: 'Places N queens on an NxN chessboard so that no two queens attack each other.',
    complexity: {
        time: 'O(N!)',
        space: 'O(N)',
    },
    run: nQueensRun,
    generateRandomInput: generateEmptyGrid,
};
