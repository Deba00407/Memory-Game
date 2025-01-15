import React, { useEffect, useState } from 'react'

function Block({ value, handleClick, gridposition }) {
    const [isRevealed, setIsRevealed] = useState(false)

    const onClick = () => {
        setIsRevealed(!isRevealed)
    }

    useEffect(() => {
        if (isRevealed) {
            handleClick(value, gridposition)
        }
    }, [isRevealed])

    return (
        <div className="card-container" onClick={onClick}>
            <div className={`card ${isRevealed ? 'rotate-y-180 ' : ''}`}>
                <div className='back'>{value}</div>
                <div className='front'></div>
            </div>
        </div>
    )
}

export default Block