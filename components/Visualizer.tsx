'use client';

import React, { memo } from 'react';
import { useVisualizer } from '@/components/VisualizerContext';
import { ArrayVisualizer } from '@/components/visualizers/ArrayVisualizer';
import { LinkedListVisualizer } from '@/components/visualizers/LinkedListVisualizer';
import { TreeVisualizer } from '@/components/visualizers/TreeVisualizer';
import { GraphVisualizer } from '@/components/visualizers/GraphVisualizer';
import { GridVisualizer } from '@/components/visualizers/GridVisualizer';

export const Visualizer = memo(function Visualizer() {
    const { algorithm } = useVisualizer();

    const category = algorithm?.category || 'Sorting';

    switch (category) {
        case 'Sorting':
        case 'Searching':
        case 'Array':
            return <ArrayVisualizer />;
        case 'LinkedList':
            return <LinkedListVisualizer />;
        case 'Tree':
            return <TreeVisualizer />;
        case 'Graph':
            return <GraphVisualizer />;
        case 'Backtracking':
        case 'DP':
            return <GridVisualizer />;
        default:
            return <ArrayVisualizer />;
    }
});
