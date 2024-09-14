import {Nav} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

function TabPicker({options, activeOptionId, onOptionSelected, className}) {
    const _onSelect = (optionId) => {
        onOptionSelected && onOptionSelected(optionId)
    }

    return (
        <Nav variant={"tabs"} className={className} activeKey={activeOptionId} onSelect={_onSelect}>
            {options.map((option) => (
                <Nav.Item key={option.id}>
                    <Nav.Link eventKey={option.id}>
                        <FontAwesomeIcon icon={option.faIcon} className={`me-2 ms-2 ms-md-0 text-4 fa-icon`}/>
                        <span className={`text-4`}>{option.label}</span>
                    </Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    )
}

export default TabPicker