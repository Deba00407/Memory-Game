import React from 'react'

function Block({ value }) {

    return (
        <div className="card-container">
            <div className="card">
                <div className='back text-lg text-white'>{value}</div>
                <div className='front text-white'></div>
            </div>
        </div>
    )
}

export default Block
