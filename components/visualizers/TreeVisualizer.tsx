'use client';

import React, { useMemo } from 'react';
import { useVisualizer } from '@/components/VisualizerContext';

type TreeNode = {
    id: string;
    value: number;
    left: string | null;
    right: string | null;
    x?: number;
    y?: number;
};

export function TreeVisualizer() {
    const { input, steps, currentStep } = useVisualizer();

    const currentNodes = useMemo(() => {
        if (!input) return [];
        // Input is generic node array from generator
        const nodes: TreeNode[] = JSON.parse(JSON.stringify(input));
        const nodeMap = new Map<string, TreeNode>();
        nodes.forEach(n => nodeMap.set(n.id, n));

        // Layout Logic
        // Recursive position assignment
        // Width of canvas ~ 800? 
        // Start at width/2

        const assignPos = (id: string | null, x: number, y: number, level: number) => {
            if (!id) return;
            const node = nodeMap.get(id);
            if (node) {
                node.x = x;
                node.y = y;
                const offset = 200 / (level + 1); // Decrease offset
                assignPos(node.left, x - offset, y + 80, level + 1);
                assignPos(node.right, x + offset, y + 80, level + 1);
            }
        };

        // Assume node-0 is root
        assignPos('node-0', 400, 50, 1);

        return nodes;
    }, [input]); // Tree structure static for traversal (usually)

    const activeStep = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;

    return (
        <div className="relative w-full h-[500px] bg-gray-950 border border-gray-800 rounded overflow-auto">
            <svg className="w-full h-full min-w-[800px] min-h-[600px]">
                {currentNodes.map(node => {
                    const children = [node.left, node.right].filter(Boolean);
                    const lines = [];

                    if (node.left) {
                        const target = currentNodes.find(n => n.id === node.left);
                        if (target && node.x && node.y && target.x && target.y) {
                            lines.push(
                                <line key={`l-${node.id}`} x1={node.x} y1={node.y} x2={target.x} y2={target.y} stroke="#4b5563" strokeWidth="2" />
                            );
                        }
                    }
                    if (node.right) {
                        const target = currentNodes.find(n => n.id === node.right);
                        if (target && node.x && node.y && target.x && target.y) {
                            lines.push(
                                <line key={`r-${node.id}`} x1={node.x} y1={node.y} x2={target.x} y2={target.y} stroke="#4b5563" strokeWidth="2" />
                            );
                        }
                    }
                    return lines;
                })}

                {currentNodes.map(node => (
                    node.x && node.y && (
                        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                            <circle
                                r="20"
                                fill="#1f2937"
                                stroke={
                                    activeStep?.highlightNodes?.includes(node.id) ? '#10b981' : '#374151'
                                }
                                strokeWidth={activeStep?.highlightNodes?.includes(node.id) ? 4 : 2}
                            />
                            <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                {node.value}
                            </text>
                        </g>
                    )
                ))}
            </svg>
        </div>
    );
}
