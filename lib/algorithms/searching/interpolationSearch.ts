import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { generateSortedArray } from '@/lib/utils/random';

const interpolationSearchRun = ({ array, target }: { array: number[], target: number }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    let low = 0;
    let high = array.length - 1;

    while (low <= high && target >= array[low] && target <= array[high]) {
        if (low === high) {
            steps.push({
                type: 'compare',
                description: `Range collapsed to ${low}. Checking value.`,
                highlightIndices: [low],
            });
            if (array[low] === target) {
                steps.push({
                    type: 'sorted',
                    description: `Found target at ${low}`,
                    highlightIndices: [low],
                });
                return steps;
            }
            break;
        }

        // Probe formula
        const pos = low + Math.floor(((high - low) / (array[high] - array[low])) * (target - array[low]));

        steps.push({
            type: 'compare',
            description: `Probing index ${pos}. Range [${low}, ${high}]. Value: ${array[pos]}`,
            highlightIndices: [low, high, pos],
        });

        if (array[pos] === target) {
            steps.push({
                type: 'sorted',
                description: `Found target ${target} at index ${pos}`,
                highlightIndices: [pos],
            });
            return steps;
        }

        if (array[pos] < target) {
            steps.push({
                type: 'focus',
                description: `Value ${array[pos]} < Target. Moving low to ${pos + 1}`,
                highlightIndices: [pos],
            });
            low = pos + 1;
        } else {
            steps.push({
                type: 'focus',
                description: `Value ${array[pos]} > Target. Moving high to ${pos - 1}`,
                highlightIndices: [pos],
            });
            high = pos - 1;
        }
    }

    steps.push({
        type: 'focus',
        description: 'Target not found.',
        highlightIndices: [],
    });

    return steps;
};

export const interpolationSearch: AlgorithmProfile = {
    id: 'interpolation-search',
    name: 'Interpolation Search',
    category: 'Searching',
    description: 'Search algorithm for uniformly distributed sorted arrays.',
    complexity: {
        time: 'O(log log n)',
        space: 'O(1)',
    },
    run: interpolationSearchRun as any,
    generateRandomInput: generateSortedArray,
};
