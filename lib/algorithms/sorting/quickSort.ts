import { AlgorithmProfile, AnimationStep, SortAlgorithm } from '@/types/algorithm';

const quickSortRun = (arr: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    const mainArray = [...arr];

    const partition = (low: number, high: number): number => {
        const pivot = mainArray[high];
        steps.push({
            type: 'focus',
            description: `Selected pivot ${pivot} at index ${high}`,
            highlightIndices: [high],
        });

        let i = low - 1; // Index of smaller element

        for (let j = low; j < high; j++) {
            steps.push({
                type: 'compare',
                description: `Comparing ${mainArray[j]} with pivot ${pivot}`,
                highlightIndices: [j, high],
                compareIndices: [j, high],
            });

            if (mainArray[j] < pivot) {
                i++;
                steps.push({
                    type: 'swap',
                    description: `Swapping ${mainArray[i]} (index ${i}) and ${mainArray[j]} (index ${j})`,
                    highlightIndices: [i, j],
                    swapIndices: [i, j],
                });
                [mainArray[i], mainArray[j]] = [mainArray[j], mainArray[i]];
            }
        }

        // Swap pivot to correct position
        steps.push({
            type: 'swap',
            description: `Moving pivot ${pivot} to sorted position ${i + 1}`,
            highlightIndices: [i + 1, high],
            swapIndices: [i + 1, high],
        });
        [mainArray[i + 1], mainArray[high]] = [mainArray[high], mainArray[i + 1]];

        return i + 1;
    };

    const quickSort = (low: number, high: number) => {
        if (low < high) {
            const pi = partition(low, high);

            // We can mark pi as sorted
            steps.push({
                type: 'sorted',
                description: `Element ${mainArray[pi]} is at its final sorted position`,
                highlightIndices: [pi],
            });

            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
        } else if (low === high) {
            steps.push({
                type: 'sorted',
                description: `Element ${mainArray[low]} is sorted`,
                highlightIndices: [low],
            });
        }
    };

    quickSort(0, mainArray.length - 1);

    steps.push({
        type: 'sorted',
        description: 'Quick Sort Complete',
        highlightIndices: Array.from({ length: mainArray.length }, (_, k) => k),
    });


    return steps;
};

export const quickSort: SortAlgorithm = {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    description: 'Divide and conquer algorithm that picks a pivot and partitions the array around it.',
    complexity: {
        time: 'O(n log n)',
        space: 'O(log n)',
    },
    run: quickSortRun,
};
