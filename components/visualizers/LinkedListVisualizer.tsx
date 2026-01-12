'use client';

import React, { useMemo } from 'react';
import { useVisualizer } from '@/components/VisualizerContext';

type LLNode = {
    id: string;
    value: number;
    next: string | null;
    x?: number; // Calculated coords
    y?: number;
};

export function LinkedListVisualizer() {
    const { input, steps, currentStep } = useVisualizer();

    // Replay logic for Linked List
    // We need to reconstruct the graph structure at currentStep
    const currentNodes = useMemo(() => {
        if (!input) return [];
        // Input is initial node list: valid ID map
        // We assume input is generic object { nodes: LLNode[], head: string }
        // or just the array of nodes if we handle head convention (index 0).
        // Let's assume input is LLNode[]. Index 0 is head?

        // Deep clone
        const nodes: LLNode[] = JSON.parse(JSON.stringify(input));

        // Map for easy access
        const nodeMap = new Map<string, LLNode>();
        nodes.forEach(n => nodeMap.set(n.id, n));

        if (currentStep !== -1) {
            for (let i = 0; i <= currentStep; i++) {
                const step = steps[i];
                if (step.type === 'overwrite' && step.highlightIndices && step.auxiliaryData) {
                    // Changing next pointer: auxData: { type: 'pointer', from: id, to: id }
                    // We need extended step format for Graphs
                    // For now, let's abuse array-like updates if possible or check auxiliaryData
                    const updates = step.auxiliaryData;
                    if (updates && updates.pointerChange) {
                        const { sourceId, targetId } = updates.pointerChange;
                        const node = nodeMap.get(sourceId);
                        if (node) node.next = targetId;
                    }
                }
            }
        }
        return nodes;
    }, [input, steps, currentStep]);

    // Layout logic: Linear horizontal for simple list
    // Assign x,y
    const spacing = 120;
    const startX = 50;
    const startY = 150;

    // We need to trace the current structure starting from Head to layout validly?
    // Or just layout by ID if they are static nodes?
    // If we reverse list, the visual order might want to stay same or move?
    // Usually we keep nodes static and just change arrows.
    currentNodes.forEach((node, idx) => {
        node.x = startX + idx * spacing;
        node.y = startY;
    });

    const activeStep = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;

    return (
        <div className="relative w-full h-[400px] bg-gray-950 border border-gray-800 rounded overflow-auto">
            <svg className="w-full h-full">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
                    </marker>
                </defs>

                {currentNodes.map(node => {
                    if (!node.next) return null;
                    const target = currentNodes.find(n => n.id === node.next);
                    if (!target) return null;

                    // Draw arrow
                    const x1 = node.x!;
                    const y1 = node.y!;
                    const x2 = target.x!;
                    const y2 = target.y!;

                    // Offset for circle radius (assume 25)
                    // Simple line for now

                    return (
                        <line
                            key={`${node.id}-${target.id}`}
                            x1={x1} y1={y1}
                            x2={x2} y2={y2}
                            stroke="#6b7280"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                        />
                    );
                })}

                {currentNodes.map(node => (
                    <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                        <circle
                            r="25"
                            fill="#1f2937"
                            stroke={
                                activeStep?.highlightNodes?.includes(node.id) ? '#3b82f6' : '#374151'
                            }
                            strokeWidth={activeStep?.highlightNodes?.includes(node.id) ? 4 : 2}
                        />
                        <text x="0" y="5" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
                            {node.value}
                        </text>
                        <text x="0" y="45" textAnchor="middle" fill="#9ca3af" fontSize="10">
                            {node.id}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}
