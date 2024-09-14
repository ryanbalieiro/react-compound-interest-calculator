import React from 'react'

const Divider = ({colorClass}) => {
    const bgClass = 'bg-' + colorClass

    return (
        <div className="d-flex w-100 justify-content-center align-content-center">
            <hr className={bgClass} style={{
                flexGrow: 1,
                border: 0,
                height: '4px',
                opacity: 1,
                maxWidth: '120px'
            }} />
        </div>
    )
}

export default Divider