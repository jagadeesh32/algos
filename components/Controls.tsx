'use client';

import React, { useState } from 'react';
import { useVisualizer } from '@/components/VisualizerContext';
import { generateRandomArray } from '@/lib/utils/random';

export function Controls() {
    const {
        isPlaying, togglePlay, reset, setSpeed, speed,
        setInput, nextStep, prevStep, currentStep, steps,
        algorithm, searchTarget, setSearchTarget
    } = useVisualizer();

    const [size, setSize] = useState(20);

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(e.target.value);
        setSize(newSize);

        // Use algorithm-specifc generator if available, else default array
        let newInput;
        if (algorithm && algorithm.generateRandomInput) {
            newInput = algorithm.generateRandomInput(newSize);
        } else {
            newInput = generateRandomArray(newSize);
        }
        setInput(newInput);
    };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value);
        const delay = 510 - (val * 5);
        setSpeed(delay);
    };

    const sliderVal = (510 - speed) / 5;

    return (
        <div className="flex flex-col gap-4 p-4 border-t border-gray-700 bg-gray-900 text-white">
            <div className="flex flex-wrap items-center justify-center gap-4">
                {/* Playback Controls */}
                <button
                    onClick={prevStep}
                    disabled={isPlaying || currentStep <= -1}
                    className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50 hover:bg-gray-600"
                >
                    Prev
                </button>

                <button
                    onClick={togglePlay}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 font-bold min-w-[80px]"
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>

                <button
                    onClick={nextStep}
                    disabled={isPlaying || currentStep >= steps.length - 1}
                    className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50 hover:bg-gray-600"
                >
                    Next
                </button>

                <button
                    onClick={reset}
                    className="px-3 py-1 rounded bg-red-800 hover:bg-red-700"
                >
                    Reset
                </button>
            </div>

            <div className="flex items-center justify-center gap-8">
                {/* Speed Control */}
                <div className="flex flex-col items-center">
                    <label className="text-xs mb-1">Speed</label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={sliderVal}
                        onChange={handleSpeedChange}
                        className="w-32 accent-blue-500"
                    />
                </div>

                {/* Size Control */}
                <div className="flex flex-col items-center">
                    <label className="text-xs mb-1">Size: {size}</label>
                    <input
                        type="range"
                        min="5"
                        max="100"
                        value={size}
                        onChange={handleSizeChange}
                        className="w-32 accent-green-500"
                        disabled={isPlaying}
                    />
                </div>

                {/* Search Target Control */}
                {algorithm?.category === 'Searching' && (
                    <div className="flex flex-col items-center">
                        <label className="text-xs mb-1">Target</label>
                        <input
                            type="number"
                            value={searchTarget}
                            onChange={(e) => setSearchTarget(parseInt(e.target.value))}
                            className="w-20 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-center"
                            disabled={isPlaying}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
