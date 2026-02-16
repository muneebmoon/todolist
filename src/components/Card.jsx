import React from 'react'

function Card({title, count, color}) {
    return (
        <>
            <div className={`card-container p-10 flex flex-col items-center justify-center gap-10 rounded-lg ${color}`}>
                <div className="title">
                    <h1 className="text-2xl font-bold">{title}</h1>
                </div>
                <div className="count">
                    <h1 className="text-4xl font-bold">{count}</h1>
                </div>
            </div>
        </>
    )
}

export default Card
