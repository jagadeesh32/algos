'use client';

import React, { useMemo } from 'react';
import { useVisualizer } from '@/components/VisualizerContext';

export function ArrayVisualizer() {
    const { input, steps, currentStep } = useVisualizer();

    const currentArray = useMemo(() => {
        // Input is usually number[] or string[].
        // BUT for String match, input might be { text: string ... }.
        let baseArr = [];
        if (Array.isArray(input)) baseArr = [...input];
        else if (input && input.text) baseArr = input.text.split('');
        else return []; // Empty

        // Deep clone array to avoid specific mutations hitting state
        const arr = [...baseArr];

        // Replay steps up to currentStep
        if (currentStep !== -1) {
            for (let i = 0; i <= currentStep; i++) {
                const step = steps[i];

                if (step.swapIndices) {
                    const [a, b] = step.swapIndices;
                    [arr[a], arr[b]] = [arr[b], arr[a]];
                }
                if (step.value !== undefined && step.highlightIndices) {
                    // Handle overwrite
                    step.highlightIndices.forEach(idx => {
                        arr[idx] = step.value;
                    });
                }
            }
        }
        return arr;
    }, [input, steps, currentStep]);

    const activeStep = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;

    return (
        <div className="flex flex-col items-center justify-center p-4 h-[400px]">
            <div className="flex items-end justify-center w-full h-full gap-1">
                {currentArray.map((val: any, idx: number) => {
                    let isHighlighted = false;
                    let colorClass = 'bg-blue-500';

                    if (activeStep) {
                        if (activeStep.highlightIndices?.includes(idx)) {
                            isHighlighted = true;
                            if (activeStep.type === 'compare') colorClass = 'bg-yellow-500';
                            else if (activeStep.type === 'swap') colorClass = 'bg-purple-500';
                            else if (activeStep.type === 'sorted') colorClass = 'bg-green-500';
                            else if (activeStep.type === 'overwrite') colorClass = 'bg-red-500';
                            else colorClass = 'bg-orange-500'; // Default focus
                        }
                    }

                    const isString = typeof val === 'string';
                    const height = isString ? '50%' : `${val}%`;
                    const content = val;

                    return (
                        <div
                            key={idx}
                            className={`
                    w-full max-w-[30px] rounded-t transition-all duration-200
                    ${colorClass}
                    ${isString ? 'flex items-center justify-center text-white font-bold text-lg' : ''}
                `}
                            style={{ height: isString ? '3rem' : `${Math.max(val, 5)}%` }} // Min height 5%
                        >
                            {isString ? content : ''}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
