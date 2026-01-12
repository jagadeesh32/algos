import { AlgorithmProfile, AnimationStep, SortAlgorithm } from '@/types/algorithm';
import { generateRandomArray } from '@/lib/utils/random';

const mergeSortRun = (arr: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const mainArray = [...arr];

    const merge = (start: number, mid: number, end: number) => {
        const leftArr = mainArray.slice(start, mid + 1);
        const rightArr = mainArray.slice(mid + 1, end + 1);

        let i = 0, j = 0, k = start;

        steps.push({
            type: 'focus',
            description: `Merging range [${start}, ${end}]`,
            highlightIndices: Array.from({ length: end - start + 1 }, (_, idx) => start + idx),
        });

        while (i < leftArr.length && j < rightArr.length) {
            steps.push({
                type: 'compare',
                description: `Comparing ${leftArr[i]} (left) and ${rightArr[j]} (right)`,
                highlightIndices: [start + i, mid + 1 + j], // Visualizing original positions vaguely
                compareIndices: [start + i, mid + 1 + j],
            });

            if (leftArr[i] <= rightArr[j]) {
                steps.push({
                    type: 'overwrite',
                    description: `Overwriting index ${k} with ${leftArr[i]}`,
                    highlightIndices: [k],
                    value: leftArr[i]
                });
                mainArray[k++] = leftArr[i++];
            } else {
                steps.push({
                    type: 'overwrite',
                    description: `Overwriting index ${k} with ${rightArr[j]}`,
                    highlightIndices: [k],
                    value: rightArr[j]
                });
                mainArray[k++] = rightArr[j++];
            }
        }

        while (i < leftArr.length) {
            steps.push({
                type: 'overwrite',
                description: `Overwriting index ${k} with remaining left element ${leftArr[i]}`,
                highlightIndices: [k],
                value: leftArr[i]
            });
            mainArray[k++] = leftArr[i++];
        }

        while (j < rightArr.length) {
            steps.push({
                type: 'overwrite',
                description: `Overwriting index ${k} with remaining right element ${rightArr[j]}`,
                highlightIndices: [k],
                value: rightArr[j]
            });
            mainArray[k++] = rightArr[j++];
        }
    };

    const divide = (start: number, end: number) => {
        if (start >= end) return;
        const mid = Math.floor((start + end) / 2);
        divide(start, mid);
        divide(mid + 1, end);
        merge(start, mid, end);
    };

    divide(0, mainArray.length - 1);

    steps.push({
        type: 'sorted',
        description: 'Merge Sort Complete',
        highlightIndices: Array.from({ length: mainArray.length }, (_, k) => k),
    });

    return steps;
};

export const mergeSort: SortAlgorithm = {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    description: 'Divide and conquer algorithm that splits the array into halves, sorts them, and merges them back.',
    complexity: {
        time: 'O(n log n)',
        space: 'O(n)',
    },
    run: mergeSortRun,
    generateRandomInput: generateRandomArray,
};
