import { AlgorithmProfile, AnimationStep, SortAlgorithm } from '@/types/algorithm';
import { generateRandomArray } from '@/lib/utils/random';

const heapSortRun = (arr: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const mainArray = [...arr];
    const n = mainArray.length;

    const heapify = (n: number, i: number) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        steps.push({
            type: 'compare',
            description: `Checking heap property at index ${i}`,
            highlightIndices: [i],
        });

        if (left < n) {
            steps.push({
                type: 'compare',
                description: `Comparing root ${mainArray[largest]} with left child ${mainArray[left]}`,
                highlightIndices: [largest, left],
                compareIndices: [largest, left],
            });
            if (mainArray[left] > mainArray[largest]) {
                largest = left;
            }
        }

        if (right < n) {
            steps.push({
                type: 'compare',
                description: `Comparing current largest ${mainArray[largest]} with right child ${mainArray[right]}`,
                highlightIndices: [largest, right],
                compareIndices: [largest, right],
            });
            if (mainArray[right] > mainArray[largest]) {
                largest = right;
            }
        }

        if (largest !== i) {
            steps.push({
                type: 'swap',
                description: `Swapping ${mainArray[i]} with largest child ${mainArray[largest]}`,
                highlightIndices: [i, largest],
                swapIndices: [i, largest],
            });
            [mainArray[i], mainArray[largest]] = [mainArray[largest], mainArray[i]];

            heapify(n, largest);
        }
    };

    // Build Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
    }

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        steps.push({
            type: 'swap',
            description: `Moving max element ${mainArray[0]} to end (index ${i})`,
            highlightIndices: [0, i],
            swapIndices: [0, i],
        });
        [mainArray[0], mainArray[i]] = [mainArray[i], mainArray[0]];

        steps.push({
            type: 'sorted',
            description: `Index ${i} is sorted`,
            highlightIndices: [i],
        });

        heapify(i, 0);
    }

    steps.push({
        type: 'sorted',
        description: `Index 0 is sorted`,
        highlightIndices: [0],
    });

    return steps;
};

export const heapSort: SortAlgorithm = {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'Sorting',
    description: 'Comparison-based sorting algorithm that uses a binary heap data structure.',
    complexity: {
        time: 'O(n log n)',
        space: 'O(1)',
    },
    run: heapSortRun,
    generateRandomInput: generateRandomArray,
};
