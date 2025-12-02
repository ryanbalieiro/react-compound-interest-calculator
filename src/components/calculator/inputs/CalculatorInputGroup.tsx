import type {ReactNode} from "react";

interface CalculatorInputGroupProps {
    children?: ReactNode;
    className?: string;
    label?: string;
    errorMessage?: string;
    focused?: boolean;
}

export default function CalculatorInputGroup({ children = undefined, focused = false, className = "", label = "", errorMessage = undefined } : CalculatorInputGroupProps) {
    return (
        <div className={`${className}`}>
            <p className={`text-sm md:text-base`}
               dangerouslySetInnerHTML={{__html: label + `<i class="pi pi-asterisk text-xs text-primary ms-2"></i>`}}/>

            <div className={`
                h-[35px] md:h-[38px] mt-1 md:mt-2 flex rounded overflow-hidden 
                ${focused ? 'border border-primary-10/40 ring-4 ring-primary-10/10 ring-offset-0' : 'border border-secondary-40'}
            `}>
                {Boolean(children) && (<>{children}</>)}
            </div>

            {errorMessage && (
                <p className={`text-xs md:text-sm text-primary-20 mt-1`}>
                    <i className="pi pi-exclamation-triangle text-xs mr-1"/>
                    <span dangerouslySetInnerHTML={{__html: errorMessage}}/>
                </p>
            )}
        </div>
    );
}