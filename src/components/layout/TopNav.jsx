import "./TopNav.scss"

import { useNavigation } from '/src/hooks/navigation.js'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Brand from "/src/components/widgets/Brand.jsx"
import {useWatcher} from "/src/hooks/watcher.js"

function TopNav() {
    const navigation = useNavigation()
    const watcher = useWatcher()

    let navLinks = navigation.navLinks
    if(!watcher.isBreakpoint(watcher.Breakpoints.LG)) {
        navLinks = navLinks.slice(0, 3)
    }

    return (
        <div className="custom-navbar">
            <Container className="container">
                <Brand/>

                <div className="nav-link-list">
                    {navLinks.map((link, index) => (
                        <Link   key={index}
                                to={link.url}
                                target={navigation.isUrlExternal(link.url) ? `_blank` : ``}
                                className={`item text-5 ${navigation.isActive(link.url) ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={link.icon} className={`me-md-2 fa-icon`}/>
                            <span className={`d-none d-md-inline`}>{link.name}</span>
                        </Link>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default TopNav