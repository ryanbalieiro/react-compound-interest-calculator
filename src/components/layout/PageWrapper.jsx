import React from 'react'
import {Container} from "react-bootstrap"
import {useLocation} from "react-router-dom"
import {useEffect} from "react"

const PageWrapper = ({ children }) => {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <div className={`page-wrapper`}>
            <Container className={`mt-4 mb-5`}>
                {children}
            </Container>
        </div>
    )
}

export default PageWrapper