interface CalculatorInputSelectProps {
    value?: string,
    onValueChanged?: (value: string) => void,
    disabled: boolean,
    options: { label: string, value: string }[],
}

export function CalculatorInputSelect({ value = "", onValueChanged = () => {}, disabled, options } : CalculatorInputSelectProps) {
    return (
        <div className={`
            flex items-center justify-center
            text-sm md:text-base w-[130px] border-l border-secondary-40 px-3 
            ${disabled ? "bg-secondary-50" : ""}
        `}>
            <select className={`flex-1 h-full outline-none appearance-none`}
                    value={value}
                    onChange={(e) => onValueChanged(e.target.value)}
                    disabled={disabled}>
                {options.map(({ label, value }) => (
                    <option key={`option-` + value}
                            value={value}>
                        {label.toLowerCase()}
                    </option>
                ))}
            </select>

            <i className={`pi pi-chevron-down text-xs opacity-50`}/>
        </div>
    );
}