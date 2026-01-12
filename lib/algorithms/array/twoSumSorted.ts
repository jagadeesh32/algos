import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';

const twoSumSortedRun = ({ array, target }: { array: number[], target: number }): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    let left = 0;
    let right = array.length - 1;

    while (left < right) {
        const sum = array[left] + array[right];

        steps.push({
            type: 'compare',
            description: `Checking pair at ${left} (${array[left]}) and ${right} (${array[right]}). Sum: ${sum}, Target: ${target}`,
            highlightIndices: [left, right],
            compareIndices: [left, right],
        });

        if (sum === target) {
            steps.push({
                type: 'sorted',
                description: `Found pair! indices ${left}, ${right}`,
                highlightIndices: [left, right],
            });
            return steps;
        } else if (sum < target) {
            steps.push({
                type: 'focus',
                description: `Sum ${sum} < ${target}, incrementing left pointer`,
                highlightIndices: [left, right],
            });
            left++;
        } else {
            steps.push({
                type: 'focus',
                description: `Sum ${sum} > ${target}, decrementing right pointer`,
                highlightIndices: [left, right],
            });
            right--;
        }
    }

    steps.push({
        type: 'focus',
        description: `No pair found summing to ${target}`,
        highlightIndices: [],
    });

    return steps;
};

export const twoSumSorted: AlgorithmProfile = {
    id: 'two-sum-sorted',
    name: 'Two Pointer (Two Sum)',
    category: 'Array',
    description: 'Finds two numbers in a sorted array that sum up to the target using two pointers.',
    complexity: {
        time: 'O(n)',
        space: 'O(1)',
    },
    run: twoSumSortedRun as any,
};
