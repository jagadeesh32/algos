import { AlgorithmProfile } from '@/types/algorithm';
import { bubbleSort } from './sorting/bubbleSort';
import { selectionSort } from './sorting/selectionSort';
import { insertionSort } from './sorting/insertionSort';
import { mergeSort } from './sorting/mergeSort';
import { quickSort } from './sorting/quickSort';
import { heapSort } from './sorting/heapSort';
import { countingSort } from './sorting/countingSort';
import { radixSort } from './sorting/radixSort';
import { linearSearch } from './searching/linearSearch';
import { binarySearch } from './searching/binarySearch';
import { twoSumSorted } from './array/twoSumSorted';
import { slidingWindow } from './array/slidingWindow';
import { prefixSum } from './array/prefixSum';
import { kadanesAlgo } from './array/kadanesAlgorithm';
import { reverseLinkedList } from './linkedList/reverseLinkedList';
import { detectCycle } from './linkedList/detectCycle';
import { inorderTraversal } from './tree/inorderTraversal';
import { bfs } from './graph/bfs';
import { dfs } from './graph/dfs';
import { preorderTraversal } from './tree/preorderTraversal';
import { postorderTraversal } from './tree/postorderTraversal';
import { levelOrderTraversal } from './tree/levelOrderTraversal';
import { stackImplementation } from './stackQueue/stackImplementation';
import { queueImplementation } from './stackQueue/queueImplementation';
import { validParentheses } from './stackQueue/validParentheses';
import { jumpSearch } from './searching/jumpSearch';
import { nQueens } from './backtracking/nQueens';
import { interpolationSearch } from './searching/interpolationSearch';
import { dijkstra } from './graph/dijkstra';
import { exponentialSearch } from './searching/exponentialSearch';
import { ternarySearch } from './searching/ternarySearch';
import { fibonacci } from './dp/fibonacci';
import { lcs } from './dp/lcs';
import { prims } from './greedy/prims';
import { activitySelection } from './greedy/activitySelection';
import { countingBits } from './bit/countingBits';
import { longestPalindrome } from './string/longestPalindrome';
import { sudokuSolver } from './backtracking/sudokuSolver';
import { ratInMaze } from './backtracking/ratInMaze';
import { wordSearch } from './backtracking/wordSearch';
import { naiveStringMatch } from './string/naiveStringMatch';
import { kmp } from './string/kmp';

// Export a list of all algorithms
export const algorithms: AlgorithmProfile[] = [
    // Sorting (8)
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    heapSort,
    countingSort,
    radixSort,
    // Searching (6)
    linearSearch,
    binarySearch,
    jumpSearch,
    interpolationSearch,
    exponentialSearch,
    ternarySearch,
    // Array (4)
    twoSumSorted,
    slidingWindow,
    prefixSum,
    kadanesAlgo,
    // Stack & Queue (3)
    stackImplementation,
    queueImplementation,
    validParentheses,
    // Linked List (2)
    reverseLinkedList,
    detectCycle,
    // Tree (4)
    inorderTraversal,
    preorderTraversal,
    postorderTraversal,
    levelOrderTraversal,
    // Graph (3)
    bfs,
    dfs,
    dijkstra,
    // Backtracking (4)
    nQueens,
    sudokuSolver,
    ratInMaze,
    wordSearch,
    // DP (2)
    fibonacci,
    lcs,
    // Greedy (2)
    prims,
    activitySelection,
    // Bit (1)
    countingBits,
    // String (3)
    longestPalindrome,
    naiveStringMatch,
    kmp,
];
