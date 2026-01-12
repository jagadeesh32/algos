'use client';

import React, { useMemo } from 'react';
import { useVisualizer } from '@/components/VisualizerContext';

export function GridVisualizer() {
    const { input, steps, currentStep } = useVisualizer();

    const grid = useMemo(() => {
        if (!input) return [];

        // Support direct array or object with grid property
        let currentGrid;
        if (Array.isArray(input)) {
            currentGrid = JSON.parse(JSON.stringify(input));
        } else if (input.grid) {
            currentGrid = JSON.parse(JSON.stringify(input.grid));
        } else {
            return [];
        }

        // Replay logic for Grid
        if (currentStep !== -1) {
            for (let i = 0; i <= currentStep; i++) {
                const step = steps[i];
                // Handle Overwrite on Coordinates
                if (step.type === 'overwrite' && step.highlightCoordinates && step.value !== undefined) {
                    step.highlightCoordinates.forEach(([r, c]) => {
                        if (currentGrid[r] && currentGrid[r][c] !== undefined) {
                            currentGrid[r][c] = step.value;
                        }
                    });
                }
            }
        }
        return currentGrid;
    }, [input, steps, currentStep]);

    const activeStep = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {/* Optional Header info can go here if provided in input */}
            <div className="flex flex-col gap-1 bg-gray-900 p-2 rounded border border-gray-800">
                {grid.map((row: any[], r: number) => (
                    <div key={r} className="flex gap-1">
                        {row.map((cell, c) => {
                            const isHighlighted = activeStep?.highlightCoordinates?.some(([hr, hc]) => hr === r && hc === c);
                            return (
                                <div
                                    key={`${r}-${c}`}
                                    className={`
                                w-10 h-10 flex items-center justify-center text-sm font-bold rounded
                                transition-colors duration-200
                                ${isHighlighted ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}
                                ${typeof cell === 'string' && cell === 'Q' ? 'border-2 border-yellow-500 text-yellow-500' : ''}
                            `}
                                >
                                    {cell}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
