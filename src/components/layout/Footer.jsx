import "./Footer.scss"

import { useNavigation } from '/src/hooks/navigation.js'
import { Col, Container, Row } from 'react-bootstrap'
import { faPen, faFax } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import InlineLinkList from "/src/components/widgets/InlineLinkList.jsx"
import SocialLinks from "/src/components/widgets/SocialLinks.jsx"
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons'

function Footer() {
    const navigation = useNavigation()

    const columns = [
        {
            title: "About",
            faIcon: faPen,
            description: "This project is maintained by Ryan Balieiro and is based on the <a href='http://react.dev/'>React</a> framework and the <a href='https://getbootstrap.com/'>Bootstrap</a> framework.",
            links: navigation.navLinks,
            displayLinksAsList: true
        },

        {
            title: "Around the web",
            faIcon: null,
            description: null,
            links: [
                {name: "Github", url: "https://github.com/ryanbalieiro", icon: faGithub},
                {name: "My Personal Website", url: "https://ryanbalieiro.com", icon: faGlobe},
                {name: "Telegram", url: "https://telegram.me/ryanbalieiro", icon: faTelegram}
            ],
            displayLinksAsList: false
        },

        {
            title: "Contact Info",
            faIcon: faFax,
            description: "If you wish to contact me, you can reach me out through the following options:",
            links: [
                {name: "ryanbalieiro@icloud.com", url: "mailto:ryanbalieiro@icloud.com", icon: faEnvelope}
            ],
            displayLinksAsList: true
        }
    ]

    const copyright = `Copyright ©${new Date().getFullYear()} <a href='https://ryanbalieiro.com'>Ryan Balieiro</a> – Distributed Under the MIT License.`

    return (
        <footer className={`footer`}>
            <div className={`footer-block`}>
                <Container>
                    <Row className={`footer-block-row`}>
                        {columns.map((column, index) => (
                            <Col key={index} className={`footer-block-col col-12 col-lg-4`}>
                                <h5 className={`footer-title fw-bold text-white`}>
                                    {column.faIcon && (<FontAwesomeIcon icon={column.faIcon} className={`me-2 fa-icon`}/>)}
                                    <span className={`text-white text-custom-subheading`}>{column.title}</span>
                                </h5>

                                {column.description && (<div className={`footer-item-wrapper`}>
                                    <span className="text-2" dangerouslySetInnerHTML={{__html:column.description}}/>
                                </div>)}

                                {column.displayLinksAsList && (<InlineLinkList links={column.links}/>)}
                                {!column.displayLinksAsList && (<SocialLinks className={`mt-4`} links={column.links}/>)}
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            <div className={`footer-block footer-block-darken`}>
                <Container>
                    <p className={`copyright text-1 p-0 m-0`} dangerouslySetInnerHTML={{__html:copyright}}/>
                </Container>
            </div>
        </footer>
    )
}

export default Footer