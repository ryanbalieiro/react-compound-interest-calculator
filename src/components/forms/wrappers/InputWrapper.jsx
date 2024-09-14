function InputWrapper({type, placeholder, disabled, value, onValueChanged}) {
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
                value={value}
                onChange={_onChange}
                onBlur={_onBlur}/>
    )
}

export default InputWrapper