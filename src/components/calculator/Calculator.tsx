import type {CalculatorInputParameters} from "@/hooks/types.tsx";
import {useViewport} from "@/components/providers/ViewportProvider.tsx";
import {useModel} from "@/hooks/model.tsx";
import CalculatorInputForm from "@/components/calculator/CalculatorInputForm.tsx";
import CalculatorResult from "@/components/calculator/CalculatorResult.tsx";

interface CalculatorProps {
    inputParameters?: CalculatorInputParameters;
    editable?: boolean;
    className?: string;
    onSubmit?: (inputParameters?: CalculatorInputParameters) => void;
}

export default function Calculator({ inputParameters = undefined, editable = false, className = "", onSubmit = undefined } : CalculatorProps) {
    const viewport = useViewport();
    const model = useModel();
    const shouldDisplayCalculatorPartsSideBySide = viewport.shouldDisplayCalculatorPartsSideBySide();

    const calculatorClassName = shouldDisplayCalculatorPartsSideBySide ?
        `calculator flex flex-row` :
        `calculator flex flex-col`;

    const calculatorInputFormWrapperClassName = shouldDisplayCalculatorPartsSideBySide ?
        `calculator-input-form-wrapper w-[450px]` :
        editable ?
            `calculator-input-form-wrapper w-full` :
            `calculator-input-form-wrapper hidden`;

    const calculatorResultWrapperClassName = shouldDisplayCalculatorPartsSideBySide ?
        `calculator-result-wrapper overflow-hidden w-full ml-[25px] pl-[25px] border-l-2 border-dotted border-muted/30` :
        editable ?
            `calculator-result-wrapper w-full mt-[25px] pt-[25px] border-t-2 border-dotted border-muted/30` :
            `calculator-result-wrapper w-full`;

    const result = inputParameters ?
        model.compoundMonthly(inputParameters) :
        undefined;

    return (
        <div className={`${calculatorClassName} ${className}`}>
            <div className={calculatorInputFormWrapperClassName}>
                <CalculatorInputForm inputParameters={inputParameters}
                                     editable={editable}
                                     onSubmit={onSubmit}/>
            </div>

            <div className={calculatorResultWrapperClassName}>
                <CalculatorResult result={result}/>
            </div>
        </div>
    );
}