import React from 'react'

const Loader = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
            <span className='loader'></span>
        </div>
    )
}

export default Loader