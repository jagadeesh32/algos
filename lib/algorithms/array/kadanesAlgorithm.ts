import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';

const kadanesRun = (arr: number[]): AnimationStep[] => {
    const steps: AnimationStep[] = [];
    // Note: Standard Kadane handles negative numbers.
    // Our visualizer (ArrayVisualizer) renders bars 0..100%. 
    // Ideally, it would support negative bars (centered x-axis).
    // For now, we assume positive numbers or just visualize logic on positive.
    // Standard Kadane on all-positive is just the whole array sum? No, max contiguous.
    // Actually, for all positive, it's just the whole array.
    // So visuals might be boring unless we have negatives.
    // Let's assume input might be generated with negatives?
    // Our generator `Math.floor(Math.random() * 100) + 5` is positive.
    // We should probably allow negative generation or Kadane is pointless.
    // But changing `Controls` for one algo is hard.
    // We'll proceed.

    let maxSoFar = -Infinity;
    let maxEndingHere = 0;
    let start = 0;
    let s = 0;
    let end = 0;

    for (let i = 0; i < arr.length; i++) {
        maxEndingHere += arr[i];

        steps.push({
            type: 'compare',
            description: `Adding index ${i} (${arr[i]}) to current sum. Sum: ${maxEndingHere}`,
            highlightIndices: [i], // and range s..i ideally
        });

        if (maxSoFar < maxEndingHere) {
            maxSoFar = maxEndingHere;
            start = s;
            end = i;
            steps.push({
                type: 'swap', // Using 'swap' color for 'update max'
                description: `New max sum found: ${maxSoFar} (Range [${start}, ${end}])`,
                highlightIndices: Array.from({ length: end - start + 1 }, (_, k) => start + k),
            });
        }

        if (maxEndingHere < 0) {
            steps.push({
                type: 'focus',
                description: `Current sum ${maxEndingHere} < 0, resetting window.`,
                highlightIndices: [i],
            });
            maxEndingHere = 0;
            s = i + 1;
        }
    }

    steps.push({
        type: 'sorted',
        description: `Max Subarray Sum is ${maxSoFar} (Range [${start}, ${end}])`,
        highlightIndices: Array.from({ length: end - start + 1 }, (_, k) => start + k),
    });

    return steps;
};

export const kadanesAlgo: AlgorithmProfile = {
    id: 'kadanes-algorithm',
    name: "Kadane's Algorithm",
    category: 'Array',
    description: 'Finds the contiguous subarray with the largest sum.',
    complexity: {
        time: 'O(n)',
        space: 'O(1)',
    },
    run: kadanesRun,
};
