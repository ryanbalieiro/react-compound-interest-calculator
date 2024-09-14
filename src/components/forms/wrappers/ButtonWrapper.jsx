import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

function ButtonWrapper({className, id, faIcon, label, enabled, onClick}) {
    const _onButtonClicked = (e) => {
        e.preventDefault()
        if(onClick) {
            onClick()
        }
    }

    return (
        <button onClick={_onButtonClicked}
                id={id}
                className={`btn w-100 text-4 ${className} ${enabled ? '' : 'disabled'}`}>
            <FontAwesomeIcon icon={faIcon} className={`me-2`}/>
            <span>{label}</span>
        </button>
    )
}

export default ButtonWrapper