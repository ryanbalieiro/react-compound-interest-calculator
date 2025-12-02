import {type ChangeEvent, useEffect} from "react";
import {useUtils} from "@/hooks/utils.tsx";

interface CalculatorInputTextProps {
    id: string,
    value: string,
    onValueChanged?: (value: string) => void,
    onFocusChanged?: (id: string) => void,
    placeholder: string,
    disabled: boolean,
    range: {min: number, max: number},
    allowDecimals: boolean,
}

export function CalculatorInputText({ id, value, onFocusChanged, onValueChanged, placeholder, disabled, range, allowDecimals } : CalculatorInputTextProps) {
    const utils = useUtils();

    useEffect(() => {
        _applyChanges(value, true);
    }, [range.max]);

    const _onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        _applyChanges(newValue, false);
    };

    const _onFocus = (_: ChangeEvent<HTMLInputElement>) => {
        onFocusChanged && onFocusChanged(id);
    };

    const _onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        _applyChanges(newValue, true);
        onFocusChanged && onFocusChanged("");
    };

    const _applyChanges = (newValue: string, forceParse: boolean) => {
        if(!newValue || newValue === "") return _updateField("");

        const lastDigit = newValue.charAt(newValue.length - 1);
        if(lastDigit === ",") newValue = newValue.slice(0, -1) + ".";

        let newValueSanitized = newValue.replaceAll(",", "");
        newValueSanitized = newValueSanitized.replace(/\.(?=.*\.)/g, '');

        const hasOnlyValidCharacters = allowDecimals ?
            /^[0-9.]+$/.test(newValueSanitized) :
            /^[0-9]+$/.test(newValueSanitized);
        if(!hasOnlyValidCharacters && newValue.length === 1) return _updateField("");
        else if(!hasOnlyValidCharacters) return;

        let toNumber = Number(newValueSanitized);
        if(isNaN(toNumber)) return _updateField("");
        else if(toNumber < range.min) { toNumber = range.min; newValueSanitized = range.min.toString(); }
        else if(toNumber > range.max) { toNumber = range.max; newValueSanitized = range.max.toString(); }

        const hasThreeOrMoreDecimals = newValueSanitized.split(".")[1]?.length >= 3;
        if(hasThreeOrMoreDecimals) return;

        if(forceParse) newValueSanitized = allowDecimals ?
            toNumber.toFixed(2):
            toNumber.toFixed(0);

        newValueSanitized = utils.addThousandsSeparator(newValueSanitized);
        _updateField(newValueSanitized);
    };

    const _updateField = (newValue: string) => {
        onValueChanged && onValueChanged(newValue);
        return Boolean(onValueChanged);
    };

    return (
        <input type="text"
               value={value}
               onChange={_onChange}
               onFocus={_onFocus}
               onBlur={_onBlur}
               className={`
                    text-sm md:text-base flex-1 px-3 placeholder-secondary-30 outline-none
                    ${disabled ? "bg-secondary-50" : ""}
               `}
               disabled={disabled}
               placeholder={placeholder}/>
    );
}