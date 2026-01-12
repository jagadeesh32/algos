'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { AlgorithmProfile, AnimationStep } from '@/types/algorithm';
import { useInterval } from '@/hooks/useInterval';

// --- State Definition ---
interface VisualizerState {
    algorithm: AlgorithmProfile | null;
    input: any; // Raw input data (array)
    searchTarget: number; // Target for searching
    steps: AnimationStep[];
    currentStep: number;
    isPlaying: boolean;
    speed: number; // Delay in ms
    isFinished: boolean;
}

// --- Actions ---
type Action =
    | { type: 'SET_ALGORITHM'; payload: AlgorithmProfile }
    | { type: 'SET_INPUT'; payload: any }
    | { type: 'SET_SEARCH_TARGET'; payload: number }
    | { type: 'GENERATE_STEPS'; payload: AnimationStep[] }
    | { type: 'SET_PLAYING'; payload: boolean }
    | { type: 'SET_SPEED'; payload: number }
    | { type: 'NEXT_STEP' }
    | { type: 'PREV_STEP' }
    | { type: 'RESET' }
    | { type: 'SEEK'; payload: number };

// --- Initial State ---
const initialState: VisualizerState = {
    algorithm: null,
    input: [],
    searchTarget: 42,
    steps: [],
    currentStep: -1, // -1 means initial state before any steps
    isPlaying: false,
    speed: 100, // Default speed
    isFinished: false,
};

// --- Reducer ---
function visualizerReducer(state: VisualizerState, action: Action): VisualizerState {
    switch (action.type) {
        case 'SET_ALGORITHM':
            return { ...initialState, algorithm: action.payload, input: state.input, searchTarget: state.searchTarget };
        case 'SET_INPUT':
            return { ...state, input: action.payload, steps: [], currentStep: -1, isPlaying: false, isFinished: false };
        case 'SET_SEARCH_TARGET':
            return { ...state, searchTarget: action.payload, steps: [], currentStep: -1, isPlaying: false, isFinished: false };
        case 'GENERATE_STEPS':
            return { ...state, steps: action.payload, currentStep: -1, isPlaying: false, isFinished: false };
        case 'SET_PLAYING':
            return { ...state, isPlaying: action.payload };
        case 'SET_SPEED':
            return { ...state, speed: action.payload };
        case 'NEXT_STEP':
            if (state.currentStep >= state.steps.length - 1) {
                return { ...state, isPlaying: false, isFinished: true };
            }
            return { ...state, currentStep: state.currentStep + 1 };
        case 'PREV_STEP':
            if (state.currentStep <= -1) return state;
            return { ...state, currentStep: state.currentStep - 1, isFinished: false };
        case 'RESET':
            return { ...state, currentStep: -1, isPlaying: false, isFinished: false };
        case 'SEEK':
            return { ...state, currentStep: Math.max(-1, Math.min(action.payload, state.steps.length - 1)), isFinished: false };
        default:
            return state;
    }
}

// --- Context ---
interface VisualizerContextType extends VisualizerState {
    setAlgorithm: (algo: AlgorithmProfile) => void;
    setInput: (data: any) => void;
    setSearchTarget: (target: number) => void;
    generateSteps: () => void;
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    setSpeed: (speed: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
    seek: (step: number) => void;
}

const VisualizerContext = createContext<VisualizerContextType | undefined>(undefined);

export function VisualizerProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(visualizerReducer, initialState);

    // Animation Loop
    useInterval(() => {
        if (state.isPlaying) {
            if (state.currentStep >= state.steps.length - 1) {
                dispatch({ type: 'SET_PLAYING', payload: false });
            } else {
                dispatch({ type: 'NEXT_STEP' });
            }
        }
    }, state.isPlaying ? state.speed : null);

    const setAlgorithm = useCallback((algo: AlgorithmProfile) => {
        dispatch({ type: 'SET_ALGORITHM', payload: algo });
    }, []);

    const setInput = useCallback((data: any) => {
        dispatch({ type: 'SET_INPUT', payload: data });
    }, []);

    const setSearchTarget = useCallback((target: number) => {
        dispatch({ type: 'SET_SEARCH_TARGET', payload: target });
    }, []);

    const generateSteps = useCallback(() => {
        if (state.algorithm && state.input) {
            let steps: AnimationStep[] = [];
            const inputClone = JSON.parse(JSON.stringify(state.input));

            if (state.algorithm.category === 'Searching') {
                // Pass params object for searching
                steps = state.algorithm.run({ array: inputClone, target: state.searchTarget });
            } else {
                steps = state.algorithm.run(inputClone);
            }
            dispatch({ type: 'GENERATE_STEPS', payload: steps });
        }
    }, [state.algorithm, state.input, state.searchTarget]);

    // Auto-generate steps when input or algo changes
    useEffect(() => {
        if (state.algorithm && state.input) {
            generateSteps();
        }
    }, [state.algorithm, state.input, state.searchTarget, generateSteps]);


    const play = useCallback(() => dispatch({ type: 'SET_PLAYING', payload: true }), []);
    const pause = useCallback(() => dispatch({ type: 'SET_PLAYING', payload: false }), []);
    const togglePlay = useCallback(() => dispatch({ type: 'SET_PLAYING', payload: !state.isPlaying }), [state.isPlaying]);
    const setSpeed = useCallback((speed: number) => dispatch({ type: 'SET_SPEED', payload: speed }), []);
    const nextStep = useCallback(() => dispatch({ type: 'NEXT_STEP' }), []);
    const prevStep = useCallback(() => dispatch({ type: 'PREV_STEP' }), []);
    const reset = useCallback(() => dispatch({ type: 'RESET' }), []);
    const seek = useCallback((step: number) => dispatch({ type: 'SEEK', payload: step }), []);

    const value = {
        ...state,
        setAlgorithm,
        setInput,
        setSearchTarget,
        generateSteps,
        play,
        pause,
        togglePlay,
        setSpeed,
        nextStep,
        prevStep,
        reset,
        seek,
    };

    return (
        <VisualizerContext.Provider value={value}>
            {children}
        </VisualizerContext.Provider>
    );
}

export function useVisualizer() {
    const context = useContext(VisualizerContext);
    if (context === undefined) {
        throw new Error('useVisualizer must be used within a VisualizerProvider');
    }
    return context;
}
