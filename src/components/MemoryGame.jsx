import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid';
import Block from './Block';

function createGrid(gridSize) {
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const values = [...Array(pairCount).keys()].map((i) => i + 1);
    const shuffledValues = [...values, ...values]
        .sort(() => Math.random() - 0.5)
        .slice(0, totalCards)
        .map((value) => ({ value, id: nanoid() }));
    return createGridLayout(shuffledValues, gridSize);
}

function createGridLayout(grid, gridSize) {
    const rows = [];
    for (let i = 0; i < grid.length; i += gridSize) {
        rows.push(grid.slice(i, i + gridSize));
    }
    return rows;
}

function MemoryGame() {
    const [gridSize, setGridSize] = useState(4);
    const [grid, setGrid] = useState([]);
    const [userselected, setUserSelected] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [won, setWon] = useState(false);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [solved, setSolved] = useState([]);

    useEffect(() => {
        const grid = createGrid(gridSize);
        setGrid(grid);
    }, [gridSize]);

    const handleBlockClick = (value, id) => {
        setUserSelected((prev) => {
            if (prev.length === 0) {
                return [{ id, value }];
            }


            if (prev.length === 1) {
                // If the same block is clicked again, deselect it
                if (prev[0].id === id) {
                    return [];
                }

                // If the values match, mark the blocks as solved
                if (prev[0].value === value) {
                    setSolved((solved) => [...solved, prev[0].id, id]);
                    setMatchedPairs((prev) => prev + 1);
                    return [];
                }

                // If the values don't match, replace the selection
                return [{ id, value }];
            }

            // Default: return the previous state (should not happen with your current logic)
            return prev;
        });

        setTimeout(() => {
            setUserSelected([]);
        }, 2000)
    };

    const resetGame = () => {
        setGrid(createGrid(gridSize, gridSize));
        setUserSelected([]);
        setMatchedPairs(0);
        setWon(false);
    };
    
    useEffect(() => {
        if (matchedPairs === gridSize * gridSize / 2) {
            setWon(true);
            setDisabled(true);
        }
    }, [matchedPairs])

    const checkSolved = (id) => {
        return solved.includes(id);
    }

    return (
        <div className={`p-4 ${disabled ? "disabled" : ""}`}>
            <label htmlFor="grid-size" className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enter Grid Size: {" "}
                <input
                    type="number"
                    min={4}
                    step={2}
                    name="grid-size"
                    id="grid-size"
                    value={gridSize}
                    onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (val >= 4 && val % 2 === 0) {
                            setGridSize(val);
                        } else {
                            setGridSize(4);
                            alert('Grid size should be an even number and greater than 0');
                        }
                    }}
                    className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200"
                    placeholder="Size"
                />
            </label>


            <div className="mt-6 space-y-2">
                {grid.map((row, i) => (
                    <div key={i} className="flex space-x-2">
                        {row.map(({ value, id }) => (
                            checkSolved(id) ? (
                                <Block
                                    key={id}
                                    value={value}
                                    id={id}
                                    handleClick={handleBlockClick}
                                    className="bg-green-500"
                                    isMatched={true}
                                />
                            ) : (
                                <Block
                                    key={id}
                                    value={value}
                                    id={id}
                                    handleClick={handleBlockClick}
                                    className=""
                                    isMatched={false}
                                />
                            )
                        ))}
                    </div>
                ))}
            </div>


            {won && (
                <div className="mt-4 text-center text-2xl font-semibold text-green-500">
                    You Won!
                    <button onClick={resetGame} className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Reset
                    </button>
                </div>
            )}

        </div>
    );
}

export default MemoryGame;