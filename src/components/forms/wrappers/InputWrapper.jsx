function InputWrapper({type, placeholder, numeric, disabled, value, onValueChanged}) {
    let pattern = null
    let inputMode = null

    if(numeric) {
        pattern = "^\d+([,.]\d+)?$"
        inputMode = "decimal"
    }


    const _onChange = (e) => {
        onValueChanged(e.target.value, false)
    }

    const _onBlur = (e) => {
        onValueChanged(e.target.value, true)
    }

    return (
        <input  type={type}
                className={`form-control text-4`}
                placeholder={placeholder}
                disabled={disabled}
                pattern={pattern}
                inputMode={inputMode}
                value={value}
                onChange={_onChange}
                onBlur={_onBlur}/>
    )
}

export default InputWrapper