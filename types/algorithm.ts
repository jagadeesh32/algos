export type AnimationStep = {
  type: string;
  description: string;
  highlightIndices?: number[]; // For array operations
  highlightNodes?: string[];   // For graph/tree nodes
  highlightEdges?: string[];   // For graph/tree edges
  highlightCoordinates?: [number, number][]; // For 2D Grid operations (row, col)
  auxiliaryData?: any;         // Generic data for specific algorithm needs
  swapIndices?: [number, number]; // Explicit swap pair
  compareIndices?: [number, number]; // Explicit comparison pair
  value?: number | string;     // For setting/overwriting values (number or text)
};

export type AlgorithmCategory =
  | 'Sorting'
  | 'Searching'
  | 'Array'
  | 'StackQueue'
  | 'LinkedList'
  | 'Tree'
  | 'Graph'
  | 'DP'
  | 'Greedy'
  | 'String'
  | 'Backtracking'
  | 'BitManipulation';

export interface AlgorithmProfile {
  id: string;
  name: string;
  category: AlgorithmCategory;
  description: string;
  complexity: {
    time: string;
    space: string;
  };
  run: (input: any) => AnimationStep[];
  generateRandomInput?: (size: number) => any;
}

export type SortAlgorithm = AlgorithmProfile & {
  run: (arr: number[]) => AnimationStep[];
};
