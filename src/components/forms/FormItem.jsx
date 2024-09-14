import {InputGroup} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faAsterisk} from "@fortawesome/free-solid-svg-icons"

function FormItem({children, label, required, description}) {
    return (
        <div className={`custom-form-group`} style={{marginTop: '20px', marginBottom: '20px'}}>
            {label && (
                <label className={`label text-3 mb-1`}>
                    <span dangerouslySetInnerHTML={{__html:label}}/>
                    {required && (<FontAwesomeIcon icon={faAsterisk} className={`ms-1 text-primary text-1`}/>)}
                </label>
            )}

            <InputGroup>
                {children}
            </InputGroup>

            {description && (
                <span className={`text-1 opacity-75 ${description.className}`}>
                    {description.message}
                </span>
            )}

        </div>
    )
}

export default FormItem