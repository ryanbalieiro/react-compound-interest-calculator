import React from 'react'

const PageSection = ({ children }) => {
    return (
        <section className={`page-section`}>
            {children}
        </section>
    )
}

export default PageSection