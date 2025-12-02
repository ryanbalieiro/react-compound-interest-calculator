import { useState, type MouseEvent } from "react";

interface SimpleButtonProps {
    className?: string;
    icon?: string;
    color?: "primary" | "muted";
    label?: string;
    disabled?: boolean;
    onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
}

export default function SimpleButton({ className = "", color = "primary", icon = "", label = "", disabled = false, onClick = undefined } : SimpleButtonProps) {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const colorMap = {
        primary: {default: "bg-primary", hover: "bg-primary-10"},
        muted: {default: "bg-muted-accent", hover: "bg-muted-emphasis"}
    };

    const colorParameters = colorMap[color]
        || colorMap.primary;

    const _onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (disabled) return;
        onClick?.(e);
    };

    return (
        <button disabled={disabled}
                onClick={_onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    cursor-pointer
                    px-3 py-2 text-white rounded-md text-sm md:text-base transition
                    ${isHovered ? colorParameters.hover : colorParameters.default}
                    ${className}
                    ${disabled ? "opacity-50 pointer-events-none" : ""}
                `}>
            {icon && (<i className={`${icon} me-2`}/>)}
            {label && (<span dangerouslySetInnerHTML={{__html: label}}/>)}
        </button>
    )
}