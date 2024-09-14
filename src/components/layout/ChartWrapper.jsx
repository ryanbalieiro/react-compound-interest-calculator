import React from 'react'
import Divider from "/src/components/widgets/Divider.jsx"

const ChartWrapper = ({ children, legend, className }) => {
    const flexClassList = `d-flex justify-content-center align-items-center overflow-hidden h-100 w-100`

    return (
        <div className={`chart-wrapper ${flexClassList} flex-column ${className}`}>
            <div className={`chart-wrapper-content ${flexClassList}`}>
                { children }
            </div>

            {legend && (<p className={`text-3 m-0 mt-4 text-center`} dangerouslySetInnerHTML={{__html: legend}}/>)}
        </div>
    )
}

export default ChartWrapper