interface CalculatorInputFieldPrefixProps {
    value?: string;
    focused? : boolean;
}

export default function CalculatorInputPrefix({ value = "", focused = false } : CalculatorInputFieldPrefixProps) {
    return (
        <span className={`
            text-sm md:text-base flex w-[40px] items-center justify-center
            border-r 
            ${focused ? 'bg-primary-10/20 border-primary-10/10' : 'bg-secondary-60 border-secondary-40'}
        `}
              dangerouslySetInnerHTML={{__html: value}}/>
    );
}