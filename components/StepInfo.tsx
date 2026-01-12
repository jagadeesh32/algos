'use client';

import React from 'react';
import { useVisualizer } from '@/components/VisualizerContext';

export function StepInfo() {
    const { steps, currentStep, algorithm } = useVisualizer();

    const step = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;

    return (
        <div className="flex flex-col gap-4 p-4 bg-gray-900 border-l border-gray-800 w-80 h-full overflow-y-auto">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-white mb-1">{algorithm?.name || 'Select Algorithm'}</h2>
                <div className="flex gap-4 text-xs text-gray-400">
                    <span>Time: <span className="text-blue-400">{algorithm?.complexity.time}</span></span>
                    <span>Space: <span className="text-green-400">{algorithm?.complexity.space}</span></span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{algorithm?.description}</p>
            </div>

            <div className="bg-gray-950 p-4 rounded border border-gray-800">
                <h3 className="text-xs font-uppercase text-gray-500 mb-2 tracking-wider">CURRENT STEP</h3>
                <p className="text-lg text-white font-mono min-h-[3rem]">
                    {step ? step.description : (currentStep === -1 ? 'Ready to start' : 'Finished')}
                </p>
            </div>

            {/* Potential Future: Code Block Highlighting */}
            <div className="flex-1 bg-gray-950 rounded border border-gray-800 p-2 opacity-50 flex items-center justify-center text-sm text-gray-600">
                Code view pending implementation
            </div>
        </div>
    );
}
