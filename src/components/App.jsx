import "/src/styles/app.scss"
import React, {useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TopNav from "/src/components/layout/TopNav.jsx"
import PageWrapper from "/src/components/layout/PageWrapper.jsx"
import Footer from "/src/components/layout/Footer.jsx"

import HomePage from "/src/components/pages/home/HomePage.jsx"
import AboutPage from "/src/components/pages/about/AboutPage.jsx"
import TutorialPage from "/src/components/pages/tutorial/TutorialPage.jsx"
import NotFoundPage from "/src/components/pages/errors/NotFoundPage.jsx"
import {useAssets} from "/src/hooks/assets.js"

function App() {
    const assets = useAssets()

    return (
        <Router>
            <TopNav/>
                <PageWrapper>
                    <Routes>
                        <Route path={assets.resolvePath('/')} element={<HomePage />} />
                        <Route path={assets.resolvePath('/about')} element={<AboutPage />} />
                        <Route path={assets.resolvePath('/tutorial')} element={<TutorialPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </PageWrapper>
            <Footer/>
        </Router>
    )
}

export default App
