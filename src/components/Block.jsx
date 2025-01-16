import React, { useEffect, useState } from 'react'

function Block({ id, value, handleClick, className }) {
    const [isRevealed, setIsRevealed] = useState(false)

    const onClick = () => {
        setIsRevealed(!isRevealed)
        handleClick(value, id)
    }


    return (
        <div id={id} className={`card-container  ${className}`} onClick={onClick}>
            <div className={`card  ${isRevealed ? 'rotate-y-180 ' : ''}`}>
                <div className='back'>{value}</div>
                <div className='front '></div>
            </div>
        </div>
    )
}

export default Block