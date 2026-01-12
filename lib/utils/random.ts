export const generateRandomArray = (size: number) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
};

export const generateSortedArray = (size: number) => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5);
    return arr.sort((a, b) => a - b);
};

export const generateRandomLinkedList = (size: number) => {
    const nodes = [];
    for (let i = 0; i < size; i++) {
        nodes.push({
            id: `node-${i}`,
            value: Math.floor(Math.random() * 100),
            next: i < size - 1 ? `node-${i + 1}` : null,
        });
    }
    return nodes;
};

export const generateRandomLinkedListWithCycle = (size: number) => {
    const nodes = [];
    for (let i = 0; i < size; i++) {
        nodes.push({
            id: `node-${i}`,
            value: Math.floor(Math.random() * 100),
            next: i < size - 1 ? `node-${i + 1}` : null,
        });
    }
    if (size > 0) {
        const randomTarget = Math.floor(Math.random() * (size - 1));
        nodes[size - 1].next = `node-${randomTarget}`;
    }
    return nodes;
};

export const generateRandomBinaryTree = (size: number) => {
    if (size === 0) return [];
    const nodes = Array.from({ length: size }, (_, i) => ({
        id: `node-${i}`,
        value: i + 1,
        left: null as string | null,
        right: null as string | null,
    }));
    const queue = [0];
    let current = 1;
    while (current < size) {
        const parentIdx = queue[0];
        const parent = nodes[parentIdx];
        if (!parent.left) {
            parent.left = nodes[current].id;
            queue.push(current);
            current++;
        } else if (!parent.right) {
            parent.right = nodes[current].id;
            queue.push(current);
            current++;
            queue.shift();
        } else {
            queue.shift();
        }
    }
    return nodes;
};

export const generateRandomGraph = (size: number) => {
    const nodes = Array.from({ length: size }, (_, i) => ({
        id: `node-${i}`,
        value: i
    }));
    const edges = [];
    for (let i = 0; i < size - 1; i++) {
        edges.push({ source: `node-${i}`, target: `node-${i + 1}` });
    }
    const extraEdges = size;
    for (let i = 0; i < extraEdges; i++) {
        const s = Math.floor(Math.random() * size);
        const t = Math.floor(Math.random() * size);
        if (s !== t) {
            edges.push({ source: `node-${s}`, target: `node-${t}` });
        }
    }
    return { nodes, edges };
};

export const generateRandomParentheses = (size: number) => {
    const chars = [];
    const pool = ['(', ')', '{', '}', '[', ']'];
    for (let i = 0; i < size; i++) {
        chars.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    return chars;
};

export const generateEmptyGrid = (size: number) => {
    const n = Math.min(size, 8);
    const grid = [];
    for (let r = 0; r < n; r++) {
        const row = [];
        for (let c = 0; c < n; c++) row.push('');
        grid.push(row);
    }
    return grid;
};

export const generateLCSInput = (size: number) => {
    const len1 = Math.min(size, 8);
    const len2 = Math.min(size, 8);
    const chars = "ABCDEF";
    let s1 = "";
    let s2 = "";
    for (let i = 0; i < len1; i++) s1 += chars[Math.floor(Math.random() * chars.length)];
    for (let i = 0; i < len2; i++) s2 += chars[Math.floor(Math.random() * chars.length)];
    const grid = [];
    for (let r = 0; r <= len1; r++) {
        const row = [];
        for (let c = 0; c <= len2; c++) row.push(0);
        grid.push(row);
    }
    return { s1, s2, grid };
};

export const generateSudokuBoard = () => {
    // A simple valid incomplete board
    const board = [
        ['5', '3', '', '', '7', '', '', '', ''],
        ['6', '', '', '1', '9', '5', '', '', ''],
        ['', '9', '8', '', '', '', '', '6', ''],
        ['8', '', '', '', '6', '', '', '', '3'],
        ['4', '', '', '8', '', '3', '', '', '1'],
        ['7', '', '', '', '2', '', '', '', '6'],
        ['', '6', '', '', '', '', '2', '8', ''],
        ['', '', '', '4', '1', '9', '', '', '5'],
        ['', '', '', '', '8', '', '', '7', '9']
    ];
    return { grid: board };
};

export const generateMaze = (size: number) => {
    const n = Math.min(size, 8);
    // 0 = path, 1 = wall
    const grid = Array.from({ length: n }, () => Array(n).fill(0));
    // Random walls
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (Math.random() > 0.7 && !(r === 0 && c === 0) && !(r === n - 1 && c === n - 1)) {
                grid[r][c] = 1;
            }
        }
    }
    return { grid };
};

export const generateStringPattern = (size: number) => {
    const textLen = Math.min(size + 5, 20);
    const patternLen = Math.min(Math.floor(size / 2) + 2, 5);
    const chars = "AB"; // small alphabet for overlaps
    let text = "";
    for (let i = 0; i < textLen; i++) text += chars[Math.floor(Math.random() * chars.length)];
    // Pattern might exist
    let pattern = "";
    if (Math.random() > 0.5) {
        // substring
        const start = Math.floor(Math.random() * (textLen - patternLen));
        pattern = text.substring(start, start + patternLen);
    } else {
        for (let i = 0; i < patternLen; i++) pattern += chars[Math.floor(Math.random() * chars.length)];
    }
    return { text, pattern };
};

export const generateWordSearch = () => {
    // A fixed example is safer for demo than finding words in random soup
    const grid = [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
    ];
    // Word: SEE
    return { grid, word: 'SEE' };
};
