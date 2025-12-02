import {useStrings} from "@/hooks/strings.tsx";
import type {CompoundingResult} from "@/hooks/types.tsx";

interface CalculatorEmptyTabProps {
    result?: CompoundingResult;
    className?: string;
}

export default function CalculatorEmptyTab({ className = "" } : CalculatorEmptyTabProps) {
    const strings = useStrings();

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className={`flex flex-col items-center text-muted/60 font-ubuntu gap-3 max-w-[500px] text-center px-3`}>
                <i className="pi pi-eye-slash text-3xl md:text-4xl"/>
                <span className="text-sm md:text-base" dangerouslySetInnerHTML={{__html: strings.get("feedback_type_no_data")}}/>
            </div>
        </div>
    );
}