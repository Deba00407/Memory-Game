import React, { useState } from 'react';

function Block({ id, value, handleClick, className, isMatched }) {
    const [isRevealed, setIsRevealed] = useState(false);

    const onClick = () => {
        // Prevent clicks if already matched
        if (isMatched) return;
        setIsRevealed(true);
        handleClick(value, id);

        // Flip back if not matched
        setTimeout(() => {
            if (!isMatched) setIsRevealed(false);
        }, 2000);
    };

    return (
        <div
            id={id}
            className={`card-container ${isMatched ? "disabled" : ""}`}
            onClick={onClick}
        >
            <div
                className={`card ${isRevealed || isMatched ? "rotate-y-180" : ""
                    }`}
            >
                <div
                    className={`back ${className} ${isMatched ? "matched" : ""
                        }`}
                >
                    {value}
                </div>
                <div className="front"></div>
            </div>
        </div>
    );
}

export default Block;
