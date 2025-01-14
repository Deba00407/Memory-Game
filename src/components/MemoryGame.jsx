import React, { useState } from 'react'
import Block from './Block';

function createGrid(rows, cols) {
    if ((rows * cols) % 2 !== 0) {
        throw new Error("Grid must have an even number of cells.");
    }

    const totalCells = rows * cols;
    const uniqueNumbers = totalCells / 2;

    let numbers = [];
    for (let i = 1; i <= uniqueNumbers; i++) {
        numbers.push(i, i);
    }

    numbers.sort(() => Math.random() - 0.5);

    const grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push(numbers.splice(0, cols));
    }

    return grid;
}


function MemoryGame() {
    const [gridSize, setGridSize] = useState(4);
    const [grid, setGrid] = useState(createGrid(gridSize, gridSize));

    return (
        <div className="p-4">
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
                        const val = e.target.value;
                        if (val % 2 !== 0) {
                            alert('Grid size should be an even number');
                            setGridSize(4);
                            return;
                        }
                        setGridSize(val);
                    }}
                    className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-200"
                    placeholder="Size"
                />
            </label>



            <div className="mt-6 space-y-2">
                {
                    Array.from({ length: gridSize }).map((_, i) => (
                        <div key={i} className="flex justify-center space-x-3">
                            {
                                Array.from({ length: gridSize }).map((_, j) => (
                                    <Block key={i * gridSize + j} value={grid[i][j]} />
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MemoryGame
