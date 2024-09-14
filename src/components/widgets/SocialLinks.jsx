import "./SocialLinks.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

function SocialLinks({ links, className }) {
    return (
        <ul className={`social-links ` + className}>
            {links.map((link, index) => (
                <li key={index} className={`social-link-wrapper`}>
                    <a href={link.url} target={`_blank`} aria-label={link.name} className={ `btn-social` }>
                        <span className={`btn-social-tooltip`}>
                            {link.name}
                        </span>

                        <FontAwesomeIcon className={`fa-icon`} icon={link.icon}/>
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default SocialLinks