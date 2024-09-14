import "./InlineLinkList.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {Link} from "react-router-dom"
import {useNavigation} from "/src/hooks/navigation.js"
import {faCircleNodes} from "@fortawesome/free-solid-svg-icons"

function InlineLinkList({ links }) {
    const navigation = useNavigation()

    const getParsedLinks = () => {
        const parsed = []
        for(const link of links) {
            link.__isRouterLink = link.url.charAt(0) === '/'
            parsed.push(link)
        }

        return parsed
    }

    return (
        <ul className={`inline-list text-white mt-3`}>
            <li className="inline-list-item list-header">
                ━ <FontAwesomeIcon icon={faCircleNodes}/> ━
            </li>

            {getParsedLinks().map((link, key) => (
                <li key={key} className={`inline-list-item`}>
                    {!link.__isRouterLink && (
                        <a href={link.url} className={`text-2 item-link`} target={`_blank`}>
                            <FontAwesomeIcon icon={link.icon} className={`fa-icon`}/>
                            <span>{link.name}</span>
                        </a>
                    )}

                    {link.__isRouterLink && (
                        <Link to={link.url} className={`text-2 item-link ${navigation.isActive(link.url) ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={link.icon} className={`fa-icon`}/>
                            <span>{link.name}</span>
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    )
}

export default InlineLinkList