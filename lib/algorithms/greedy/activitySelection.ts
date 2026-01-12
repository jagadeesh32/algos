import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';

const activitySelectionRun = (input: { activities: { id: number, start: number, end: number }[], grid: any[][] }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    // Sort by finish time
    const activities = [...input.activities].sort((a, b) => a.end - b.end);

    steps.push({
        type: 'focus',
        description: 'Sorted activities by finish time.',
        highlightCoordinates: [],
    });

    const selected = [];
    let lastEnd = -1;

    for (let i = 0; i < activities.length; i++) {
        const act = activities[i];
        // Map activity ID to Grid Row index? 
        // Input grid assumes random order. We need to find row for act.id.
        // Assuming row index = act.id (0-based).

        steps.push({
            type: 'compare',
            description: `Checking Activity ${act.id} [${act.start}, ${act.end}]. Last Finish: ${lastEnd}`,
            highlightCoordinates: [[act.id, 0]], // Highlight row label mostly
        });

        if (act.start >= lastEnd) {
            selected.push(act);
            lastEnd = act.end;
            steps.push({
                type: 'sorted', // Selected
                description: `Selected Activity ${act.id}`,
                highlightCoordinates: Array.from({ length: 10 }, (_, c) => [act.id, c]) as any // Highlight row
            });
        }
    }

    return steps;
};

export const activitySelection: AlgorithmProfile = {
    id: 'activity-selection',
    name: 'Activity Selection',
    category: 'Greedy',
    description: 'Selects max non-overlapping activities.',
    complexity: {
        time: 'O(N log N)',
        space: 'O(1)',
    },
    run: activitySelectionRun as any,
    generateRandomInput: (size) => {
        // 5-8 activities
        const n = Math.min(size, 8);
        const activities = [];
        const grid = [];
        for (let i = 0; i < n; i++) {
            const start = Math.floor(Math.random() * 6);
            const dur = Math.floor(Math.random() * 3) + 1;
            activities.push({ id: i, start, end: start + dur });

            // Visual Grid: Time slots 0-10
            const row = new Array(10).fill('');
            for (let k = start; k < start + dur; k++) row[k] = '█';
            grid.push(row);
        }
        return { activities, grid }; // Grid for visualizer
    },
};
