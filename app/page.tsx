'use client';

import React from 'react';
import { VisualizerProvider } from '@/components/VisualizerContext';
import { Visualizer } from '@/components/Visualizer';
import { Controls } from '@/components/Controls';
import { AlgorithmSelector } from '@/components/AlgorithmSelector';
import { StepInfo } from '@/components/StepInfo';

function VisualizerApp() {
  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-gray-800 flex items-center px-6 bg-gray-950">
        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Algorithm Visualizer
        </h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar / Controls Area */}
        <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 flex flex-col gap-6 overflow-y-auto z-10">
          <AlgorithmSelector />
          <div className="flex-1">
            {/* Placeholder for more settings: Category filter, etc */}
          </div>
        </aside>

        {/* Main Visualization Area */}
        <main className="flex-1 flex flex-col relative bg-gray-950">
          <div className="flex-1 p-6 flex items-center justify-center overflow-auto">
            <Visualizer />
          </div>
          {/* Controls Bar */}
          <Controls />
        </main>

        {/* Right Panel: Step Info & Code */}
        <StepInfo />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <VisualizerProvider>
      <VisualizerApp />
    </VisualizerProvider>
  );
}
