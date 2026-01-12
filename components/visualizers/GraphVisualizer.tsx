'use client';

import React, { useMemo } from 'react';
import { useVisualizer } from '@/components/VisualizerContext';

type GraphNode = { id: string; value: number; x?: number; y?: number };
type GraphEdge = { source: string; target: string; weight?: number };
type GraphInput = { nodes: GraphNode[]; edges: GraphEdge[] };

export function GraphVisualizer() {
    const { input, steps, currentStep } = useVisualizer();

    const graphData = useMemo(() => {
        if (!input) return { nodes: [], edges: [] };
        const rawData: GraphInput = JSON.parse(JSON.stringify(input));

        // Circular Layout
        const centerX = 400;
        const centerY = 250;
        const radius = 180;
        const n = rawData.nodes.length;

        rawData.nodes.forEach((node, i) => {
            const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
            node.x = centerX + radius * Math.cos(angle);
            node.y = centerY + radius * Math.sin(angle);
        });

        return rawData;
    }, [input]);

    const activeStep = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;

    return (
        <div className="relative w-full h-[500px] bg-gray-950 border border-gray-800 rounded overflow-auto">
            <svg className="w-full h-full min-w-[800px] min-h-[500px]">
                <defs>
                    <marker id="arrowhead-graph" markerWidth="10" markerHeight="7" refX="24" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
                    </marker>
                </defs>

                {graphData.edges.map((edge, idx) => {
                    const sNode = graphData.nodes.find(n => n.id === edge.source);
                    const tNode = graphData.nodes.find(n => n.id === edge.target);
                    if (!sNode || !tNode || !sNode.x || !sNode.y || !tNode.x || !tNode.y) return null;

                    const isHighlighted = activeStep?.highlightEdges?.includes(`${edge.source}-${edge.target}`) ||
                        activeStep?.highlightEdges?.includes(`${edge.target}-${edge.source}`);

                    const midX = (sNode.x + tNode.x) / 2;
                    const midY = (sNode.y + tNode.y) / 2;

                    return (
                        <g key={`${edge.source}-${edge.target}-${idx}`}>
                            <line
                                x1={sNode.x} y1={sNode.y}
                                x2={tNode.x} y2={tNode.y}
                                stroke={isHighlighted ? '#f59e0b' : '#4b5563'}
                                strokeWidth={isHighlighted ? 3 : 1}
                            />
                            {edge.weight !== undefined && (
                                <text x={midX} y={midY} fill="#fbbf24" fontSize="10" fontWeight="bold" dy="-5" textAnchor="middle">
                                    {edge.weight}
                                </text>
                            )}
                        </g>
                    );
                })}

                {graphData.nodes.map(node => (
                    <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                        <circle
                            r="20"
                            fill="#1f2937"
                            stroke={
                                activeStep?.highlightNodes?.includes(node.id) ? '#3b82f6' : '#374151'
                            }
                            strokeWidth={activeStep?.highlightNodes?.includes(node.id) ? 4 : 2}
                        />
                        <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                            {node.value}
                        </text>
                    </g>
                ))}
            </svg>
        </div>
    );
}
