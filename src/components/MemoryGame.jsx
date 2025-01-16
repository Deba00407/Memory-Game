import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid';
import Block from './Block';

function createGrid(rows, cols) {
    const totalCards = rows * cols;
    const pairCount = Math.floor(totalCards / 2);
    const values = [...Array(pairCount).keys()].map((i) => i + 1);
    const shuffledValues = [...values, ...values]
        .sort(() => Math.random() - 0.5)
        .slice(0, totalCards)
        .map((value) => ({ value, id: nanoid() }));

    return shuffledValues;
}

function MemoryGame() {
    const [gridSize, setGridSize] = useState(4);
    const [grid, setGrid] = useState([]);
    const [userselected, setUserSelected] = useState([]);
    const [disabed, setDisabled] = useState(false);
    const [won, setWon] = useState(false);

    useEffect(() => {
        const grid = createGrid(gridSize, gridSize);
        setGrid(grid);
    }, [gridSize]);

    const getPosition = (value) => {
        const positions = valueMap.get(value);
        if (!positions[0].taken) {
            positions[0].taken = true;
            return positions[0];
        } else if (!positions[1].taken) {
            positions[1].taken = true;
            return positions[1];
        }
    };

    const handleBlockClick = (value, id) => {
        if (disabed || won) return;
        console.log(value, id);

        if (userselected.length === 0) {
            setUserSelected([{ value, id }]);
        }

        else if (userselected.length === 1) {
            if (userselected.id === id) return;
            setUserSelected((prev) => [...prev, { value, id }]);
        }
    };

    useEffect(() => {
        console.log(userselected);
    }, [userselected])

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
                {grid?.map(({ value, id }) => (
                    <Block
                        key={id}
                        id={id}
                        value={value}
                        handleClick={handleBlockClick}
                    />
                ))}
            </div>

        </div>
    );
}

export default MemoryGame;