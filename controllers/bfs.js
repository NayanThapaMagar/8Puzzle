module.exports = async (req, res) => {

    class PuzzleNode {
        constructor(state, parent = null, action = null) {
            this.state = state; // The state of the puzzle (a 2D array)
            this.parent = parent; // Reference to the parent node
            this.action = action; // The action that led to this state ('up', 'down', 'left', 'right')
            this.level = parent ? parent.level + 1 : 0; // Level of the node
        }
    }

    const applyMove = require("../utils/applyMove")
    const findBlank = require("../utils/findBlank")
    const generateValidMoves = require("../utils/generateValidMoves")
    const statesAreEqual = require("../utils/statesAreEqual")
    // const generateAllNextStates = require("../utils/generateAllNextStates")



    // BFS function to solve the 8-puzzle and print nodes by level
    function solvePuzzleBFS(initialState, goalState, visitedNodesByLevelBFS) {
        const queue = [new PuzzleNode(initialState)];

        while (queue.length > 0) {
            const currentNode = queue.shift();

            // Check if the current state matches the goal state
            if (statesAreEqual(currentNode.state, goalState)) {
                // Found a solution, backtrack to get the path
                const path = [];
                let current = currentNode;
                while (current !== null) {
                    path.unshift(current);
                    current = current.parent;
                }
                return path;

            }

            // console.log(";;;");
            // console.log("saaa", visitedNodesByLevelBFS.has(currentNode.level));
            // Add the current node to the visited nodes at its level
            if (!visitedNodesByLevelBFS.has(currentNode.level)) {
                visitedNodesByLevelBFS.set(currentNode.level, []);
            }
            visitedNodesByLevelBFS.get(currentNode.level).push(currentNode);

            console.log(visitedNodesByLevelBFS.get(currentNode.level));
            // Generate possible next states (child nodes)
            const blankPosition = findBlank(currentNode.state);
            const possibleMoves = generateValidMoves(blankPosition);

            console.log(currentNode.state);
            for (const move of possibleMoves) {
                const nextState = applyMove(currentNode.state, blankPosition, move);

                // Check if this state has been visited before to avoid loops
                let isVisited = false;

                // Iterate through all levels in visitedNodesByLevelBFS
                for (const [level, nodes] of visitedNodesByLevelBFS) {
                    for (const visitedNode of nodes) {
                        // Check if the state of the visited node is equal to nextState
                        if (statesAreEqual(visitedNode.state, nextState)) {
                            isVisited = true;
                            break; // No need to continue checking this level
                        }
                    }

                    if (isVisited) {
                        break; // No need to check other levels
                    }
                }

                if (!isVisited) {
                    const childNode = new PuzzleNode(nextState, currentNode, move);
                    queue.push(childNode);
                }
            }
        }

        return null; // No solution found
    }

    // DFS function to solve the 8-puzzle and print nodes by level
    // function solvePuzzleDFS(initialState, goalState) {
    //     const stack = [new PuzzleNode(initialState)];
    //     const visitedNodesByLevel = new Map(); // To store nodes by level

    //     while (stack.length > 0) {
    //         const currentNode = stack.pop();

    //         // Check if the current state matches the goal state
    //         if (statesAreEqual(currentNode.state, goalState)) {
    //             // Found a solution, backtrack to get the path
    //             const path = [];
    //             let current = currentNode;
    //             while (current !== null) {
    //                 path.unshift(current);
    //                 current = current.parent;
    //             }
    //             return path;
    //         }

    //         // Add the current node to the visited nodes at its level
    //         if (!visitedNodesByLevel.has(currentNode.level)) {
    //             visitedNodesByLevel.set(currentNode.level, []);
    //         }
    //         visitedNodesByLevel.get(currentNode.level).push(currentNode);

    //         // Generate possible next states (child nodes)
    //         const blankPosition = findBlank(currentNode.state);
    //         const possibleMoves = generateValidMoves(blankPosition);

    //         for (const move of possibleMoves) {
    //             const nextState = applyMove(currentNode.state, blankPosition, move);

    //             // Check if this state has been visited before to avoid loops
    //             let isVisited = false;
    //             for (const visitedNode of visitedNodesByLevel.get(currentNode.level + 1) || []) {
    //                 if (statesAreEqual(visitedNode.state, nextState)) {
    //                     isVisited = true;
    //                     break;
    //                 }
    //             }

    //             if (!isVisited) {
    //                 const childNode = new PuzzleNode(nextState, currentNode, move);
    //                 stack.push(childNode);
    //             }
    //         }
    //     }

    //     return null; // No solution found
    // }

    // Helper function to print nodes by level
    function printNodesByLevel(visitedNodesByLevel) {
        for (const [level, nodes] of visitedNodesByLevel) {
            console.log(`Level ${level}:`);
            for (const node of nodes) {
                console.log(node.state);
            }
        }
    }

    // Example usage:
    const initialState = [
        [1, 2, 3],
        [4, 0, 5],
        [6, 7, 8]
    ];
    // const goalState = [
    //     [1, 2, 3],
    //     [4, 0, 5],
    //     [6, 7, 8]
    // ];

    const goalState = [
        [1, 2, 3],
        [4, 7, 5],
        [6, 8, 0]
    ];

    console.log('Breadth-First Search:');
    const visitedNodesByLevelBFS = new Map();
    const solutionPathBFS = solvePuzzleBFS(initialState, goalState, visitedNodesByLevelBFS);
    // console.log("solutionPathBFS", solutionPathBFS);
    console.log("visitedNodesByLevelBFS", visitedNodesByLevelBFS);
    if (solutionPathBFS !== null) {
        printNodesByLevel(visitedNodesByLevelBFS);
    } else {
        console.log('No solution found.');
    }

    // console.log('Depth-First Search:');
    // const visitedNodesByLevelDFS = new Map();
    // const solutionPathDFS = solvePuzzleDFS(initialState, goalState, visitedNodesByLevelDFS);
    // if (solutionPathDFS !== null) {
    //     printNodesByLevel(visitedNodesByLevelDFS);
    // } else {
    //     console.log('No solution found.');
    // }


}