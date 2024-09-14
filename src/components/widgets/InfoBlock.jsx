import "./InfoBlock.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const InfoBlock = ({title, faIcon, paragraphs, children}) => {
    return (
        <div className="info-block">
            {title && (
                <h4 className={`fw-bold mb-3`}>
                    {faIcon && <FontAwesomeIcon icon={faIcon} className={`me-2`}/>}
                    <span>{title}</span>
                </h4>
            )}

            {paragraphs && paragraphs.map((paragraph, index) => (
                <p key={index} className={`text-3`} dangerouslySetInnerHTML={{__html:paragraph}}/>
            ))}

            {children && (children)}
        </div>
    )
}

export default InfoBlock