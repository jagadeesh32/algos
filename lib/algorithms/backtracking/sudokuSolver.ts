import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateSudokuBoard } from '@/lib/utils/random';

const sudokuRun = (input: { grid: string[][] }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const board = input.grid.map(r => [...r]);
    const n = 9;

    const isValid = (row: number, col: number, c: string) => {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === c) return false;
            if (board[i][col] === c) return false;
            if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + i % 3] === c) return false;
        }
        return true;
    };

    const solve = (): boolean => {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (board[i][j] === '') {
                    for (let k = 1; k <= 9; k++) {
                        const c = k.toString();

                        steps.push({
                            type: 'focus',
                            description: `Trying ${c} at (${i}, ${j})`,
                            highlightCoordinates: [[i, j]],
                        });

                        if (isValid(i, j, c)) {
                            board[i][j] = c;
                            steps.push({
                                type: 'overwrite',
                                description: `Placed ${c} at (${i}, ${j})`,
                                highlightCoordinates: [[i, j]],
                                value: c
                            });

                            if (solve()) return true;

                            board[i][j] = ''; // Backtrack
                            steps.push({
                                type: 'overwrite',
                                description: `Backtracking ${c} from (${i}, ${j})`,
                                highlightCoordinates: [[i, j]],
                                value: ''
                            });
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    if (solve()) {
        steps.push({
            type: 'sorted',
            description: 'Sudoku Solved!',
            highlightCoordinates: [],
        });
    } else {
        steps.push({
            type: 'focus',
            description: 'No solution exists.',
            highlightCoordinates: [],
        });
    }

    return steps;
};

export const sudokuSolver: AlgorithmProfile = {
    id: 'sudoku-solver',
    name: 'Sudoku Solver',
    category: 'Backtracking',
    description: 'Solves 9x9 Sudoku board.',
    complexity: {
        time: 'O(9^(n*n))',
        space: 'O(n*n)',
    },
    run: sudokuRun as any,
    generateRandomInput: generateSudokuBoard,
};
