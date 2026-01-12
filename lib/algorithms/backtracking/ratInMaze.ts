import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateMaze } from '@/lib/utils/random';

const ratInMazeRun = (input: { grid: number[][] }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const { grid } = input;
    const n = grid.length;
    // Deep clone for sim
    const sol = grid.map(r => [...r]);
    // We'll mark path with 2

    const isSafe = (x: number, y: number) => {
        return x >= 0 && x < n && y >= 0 && y < n && sol[x][y] === 0;
    };

    const solve = (x: number, y: number): boolean => {
        // Goal
        if (x === n - 1 && y === n - 1 && sol[x][y] === 0) {
            sol[x][y] = 2; // path
            steps.push({
                type: 'sorted',
                description: `Reached Destination (${x}, ${y})!`,
                highlightCoordinates: [[x, y]],
                value: '★'
            });
            return true;
        }

        if (isSafe(x, y)) {
            steps.push({
                type: 'focus',
                description: `Visiting (${x}, ${y})`,
                highlightCoordinates: [[x, y]],
            });

            sol[x][y] = 2; // Mark visited
            steps.push({
                type: 'overwrite',
                description: `Marking path at (${x}, ${y})`,
                highlightCoordinates: [[x, y]],
                value: '•' // Path dot
            });

            // Move down
            if (solve(x + 1, y)) return true;
            // Move right
            if (solve(x, y + 1)) return true;
            // Move up
            // if (solve(x - 1, y)) return true; // simplified mostly down/right for basic demo
            // Move left
            // if (solve(x, y - 1)) return true;

            // Backtrack
            sol[x][y] = 0;
            steps.push({
                type: 'overwrite',
                description: `Dead end at (${x}, ${y}). Backtracking.`,
                highlightCoordinates: [[x, y]],
                value: 0
            });
            return false;
        }
        return false;
    };

    if (!solve(0, 0)) {
        steps.push({
            type: 'focus',
            description: 'No Path Found.',
            highlightCoordinates: [],
        });
    }

    return steps;
};

export const ratInMaze: AlgorithmProfile = {
    id: 'rat-in-maze',
    name: 'Rat in a Maze',
    category: 'Backtracking',
    description: 'Finds a path from start to end in a maze using backtracking.',
    complexity: {
        time: 'O(2^(n^2))',
        space: 'O(n^2)',
    },
    run: ratInMazeRun as any,
    generateRandomInput: generateMaze,
};
