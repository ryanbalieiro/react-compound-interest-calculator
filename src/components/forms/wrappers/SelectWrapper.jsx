function SelectWrapper({options, style, disabled, value, onOptionSelected}) {
    const _onChange = (e) => {
        const option = options.find(option => option.value === e.target.value)
        onOptionSelected(option)
    }

    return (
        <select className="form-select text-3" style={style}
                value={value}
                disabled={disabled}
                onChange={_onChange}>
            {options.map((option, key) => (
                <option key={key} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}

export default SelectWrapper