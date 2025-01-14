import React, { useState } from 'react'

function Block({ value }) {
    const [isRevealed, setIsRevealed] = useState(false)

    const handleClick = () => {
        setIsRevealed(!isRevealed)
    }

    return (
        <div className="card-container" onClick={handleClick}>
            <div className={`card ${isRevealed ? 'rotate-y-180 ' : ''}`}>
                <div className='back'>{value}</div>
                <div className='front'></div>
            </div>
        </div>
    )
}

export default Block