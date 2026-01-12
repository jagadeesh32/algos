import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateSortedArray } from '@/lib/utils/random';

const ternarySearchRun = ({ array, target }: { array: number[], target: number }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    let l = 0;
    let r = array.length - 1;

    while (l <= r) {
        const mid1 = l + Math.floor((r - l) / 3);
        const mid2 = r - Math.floor((r - l) / 3);

        steps.push({
            type: 'compare',
            description: `Checking mid1=${mid1} (${array[mid1]}), mid2=${mid2} (${array[mid2]}). Range [${l}, ${r}]`,
            highlightIndices: [l, r, mid1, mid2],
        });

        if (array[mid1] === target) {
            steps.push({
                type: 'sorted',
                description: `Found target at ${mid1}`,
                highlightIndices: [mid1],
            });
            return steps;
        }
        if (array[mid2] === target) {
            steps.push({
                type: 'sorted',
                description: `Found target at ${mid2}`,
                highlightIndices: [mid2],
            });
            return steps;
        }

        if (target < array[mid1]) {
            r = mid1 - 1;
        } else if (target > array[mid2]) {
            l = mid2 + 1;
        } else {
            l = mid1 + 1;
            r = mid2 - 1;
        }
    }

    steps.push({
        type: 'focus',
        description: 'Target not found.',
        highlightIndices: [],
    });

    return steps;
};

export const ternarySearch: AlgorithmProfile = {
    id: 'ternary-search',
    name: 'Ternary Search',
    category: 'Searching',
    description: 'Divide and conquer search splitting into 3 parts.',
    complexity: {
        time: 'O(log3 n)',
        space: 'O(1)',
    },
    run: ternarySearchRun as any,
    generateRandomInput: generateSortedArray,
};
