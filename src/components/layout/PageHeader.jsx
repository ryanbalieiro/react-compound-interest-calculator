import React from 'react'
import Divider from "/src/components/widgets/Divider.jsx"

const PageHeader = ({ title, subtitle }) => {
    return (
        <div className={`page-header w-100 text-center`}>
            <h1 className={`text-primary fw-bold`}>{title}</h1>
            <h5 className={`text-secondary text-custom-subheading mt-3`}>{subtitle}</h5>
            <Divider colorClass={`primary`}/>
        </div>
    )
}

export default PageHeader