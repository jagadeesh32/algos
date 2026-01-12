'use client';

import React from 'react';
import { useVisualizer } from '@/components/VisualizerContext';
import { algorithms } from '@/lib/algorithms';

export function AlgorithmSelector() {
    const { algorithm, setAlgorithm, reset } = useVisualizer();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const algo = algorithms.find(a => a.id === selectedId);
        if (algo) {
            setAlgorithm(algo);
            reset(); // Reset state when changing algorithm
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400">Algorithm</label>
            <select
                value={algorithm?.id || ''}
                onChange={handleChange}
                className="bg-gray-800 border-gray-700 text-white rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
                <option value="" disabled>Select an algorithm</option>
                {algorithms.map(algo => (
                    <option key={algo.id} value={algo.id}>
                        {algo.name}
                    </option>
                ))}
            </select>
            <p className="text-xs text-gray-500">{algorithm?.description}</p>
        </div>
    );
}
