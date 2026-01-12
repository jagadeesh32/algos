import { AlgorithmProfile, AnimationStep, SortAlgorithm } from '@/types/algorithm';

const selectionSortRun = (arr: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const n = arr.length;
    const a = [...arr];

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        // Highlight start of search
        steps.push({
            type: 'compare',
            description: `Searching minimum starting from index ${i} (current min: ${a[minIdx]})`,
            highlightIndices: [i, minIdx],
        });

        for (let j = i + 1; j < n; j++) {
            steps.push({
                type: 'compare',
                description: `Comparing index ${j} (${a[j]}) with current min at ${minIdx} (${a[minIdx]})`,
                highlightIndices: [j, minIdx],
                compareIndices: [j, minIdx],
            });

            if (a[j] < a[minIdx]) {
                minIdx = j;
                steps.push({
                    type: 'compare',
                    description: `Found new minimum at index ${j} (${a[j]})`,
                    highlightIndices: [j],
                });
            }
        }

        if (minIdx !== i) {
            steps.push({
                type: 'swap',
                description: `Swapping minimum (${a[minIdx]}) with current position ${i} (${a[i]})`,
                highlightIndices: [i, minIdx],
                swapIndices: [i, minIdx],
            });
            const temp = a[i];
            a[i] = a[minIdx];
            a[minIdx] = temp;
        }

        steps.push({
            type: 'sorted',
            description: `Index ${i} is now sorted`,
            highlightIndices: [i],
        });
    }
    // Last element is sorted
    steps.push({
        type: 'sorted',
        description: `Index ${n - 1} is sorted`,
        highlightIndices: [n - 1],
    });

    return steps;
};

export const selectionSort: SortAlgorithm = {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'Sorting',
    description: 'Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.',
    complexity: {
        time: 'O(n²)',
        space: 'O(1)',
    },
    run: selectionSortRun,
};
