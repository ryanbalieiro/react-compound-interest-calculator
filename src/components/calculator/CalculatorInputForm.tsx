import type {CalculatorInputParameters} from "@/hooks/types.tsx";
import {useStrings} from "@/hooks/strings.tsx";
import {useUtils} from "@/hooks/utils.tsx";
import {useEffect, useState} from "react";
import CalculatorInputGroup from "@/components/calculator/inputs/CalculatorInputGroup.tsx";
import CalculatorInputPrefix from "@/components/calculator/inputs/CalculatorInputPrefix.tsx";
import {CalculatorInputText} from "@/components/calculator/inputs/CalculatorInputText.tsx";
import {CalculatorInputSelect} from "@/components/calculator/inputs/CalculatorInputSelect.tsx";
import SimpleButton from "@/components/widgets/SimpleButton.tsx";

interface CalculatorInputFormProps {
    inputParameters?: CalculatorInputParameters;
    editable?: boolean;
    className?: string;
    onSubmit?: (inputParameters?: CalculatorInputParameters) => void;
}

export default function CalculatorInputForm({ inputParameters = undefined, editable = false, className = "", onSubmit = undefined } : CalculatorInputFormProps) {
    const strings = useStrings();
    const utils = useUtils();

    const defaultContributionPeriod = "monthly";
    const defaultCompoundingPeriod = "monthly";
    const defaultIterationPeriod = "yearly";

    const formIdInitialAmount = "form-initial-amount";
    const formIdContributionAmount = "form-contribution-amount";
    const formIdCompoundingRate = "form-compounding-rate";
    const formIdNumberOfIterations = "form-number-of-iterations";

    const [formValInitialAmount, setFormValInitialAmount] = useState<string>("");
    const [formValContributionAmount, setFormValContributionAmount] = useState<string>("");
    const [formValContributionPeriod, setFormValContributionPeriod] = useState<string>(defaultContributionPeriod);
    const [formValCompoundingRate, setFormValCompoundingRate] = useState<string>("");
    const [formValCompoundingPeriod, setFormValCompoundingPeriod] = useState<string>(defaultCompoundingPeriod);
    const [formValNumberOfIterations, setFormValNumberOfIterations] = useState<string>("");
    const [formValIterationPeriod, setFormValIterationPeriod] = useState<string>(defaultIterationPeriod);

    const [errorForInitialAmountField, setErrorForInitialAmountField] = useState<string>("");
    const [errorForContributionAmountField, setErrorForContributionAmountField] = useState<string>("");
    const [errorForCompoundingRateField, setErrorForCompoundingRateField] = useState<string>("");
    const [errorForNumberOfIterationsField, setErrorForNumberOfIterationsField] = useState<string>("");

    const [focusedFieldId, setFocusedFieldId] = useState<string>("");

    useEffect(() => {
        if(!inputParameters) return;
        setFormValInitialAmount(utils.parseCurrencyForInput(inputParameters.initialAmount, true));
        setFormValContributionAmount(utils.parseCurrencyForInput(inputParameters.contributionAmount, true));
        setFormValContributionPeriod(inputParameters.contributionPeriod);
        setFormValCompoundingRate(utils.parsePercentageForInput(inputParameters.compoundingRate));
        setFormValCompoundingPeriod(inputParameters.compoundingPeriod);
        setFormValNumberOfIterations(utils.parseCurrencyForInput(inputParameters.numberOfIterations, false));
        setFormValIterationPeriod(inputParameters.iterationPeriod);
    }, [null, inputParameters]);

    useEffect(() => { setErrorForInitialAmountField(""); }, [formValInitialAmount]);
    useEffect(() => { setErrorForContributionAmountField(""); }, [formValContributionAmount]);
    useEffect(() => { setErrorForCompoundingRateField(""); }, [formValCompoundingRate]);
    useEffect(() => { setErrorForNumberOfIterationsField(""); }, [formValNumberOfIterations]);

    const _canResetForm = ():boolean => {
        return formValInitialAmount !== "" ||
            formValContributionAmount !== "" ||
            formValCompoundingRate !== "" ||
            formValNumberOfIterations !== "";
    };

    const _canSubmitForm = ():boolean => {
        return formValInitialAmount !== "" ||
            formValContributionAmount !== "" ||
            formValCompoundingRate !== "" ||
            formValNumberOfIterations !== "";
    }

    const _resetForm = ():void => {
        setFormValInitialAmount("");
        setFormValContributionAmount("");
        setFormValCompoundingRate("");
        setFormValNumberOfIterations("");
        setErrorForInitialAmountField("");
        setErrorForContributionAmountField("");
        setErrorForCompoundingRateField("");
        setErrorForNumberOfIterationsField("");
        onSubmit && onSubmit(undefined);
    };

    const _submitForm = ():void => {
        let validated = true;

        setErrorForInitialAmountField("");
        const initialAmount = utils.toNumber(formValInitialAmount);
        if(!formValInitialAmount || isNaN(initialAmount)) {
            setErrorForInitialAmountField(strings.get("feedback_type_required_field"));
            validated = false;
        }

        setErrorForContributionAmountField("");
        const contributionAmount = utils.toNumber(formValContributionAmount);
        if(!formValContributionAmount || isNaN(contributionAmount)) {
            setErrorForContributionAmountField(strings.get("feedback_type_required_field"));
            validated = false;
        }

        setErrorForCompoundingRateField("");
        let compoundingRate = utils.toNumber(formValCompoundingRate);
        compoundingRate = !isNaN(compoundingRate) ? compoundingRate / 100 : NaN;
        if(!formValCompoundingRate || isNaN(compoundingRate)) {
            setErrorForCompoundingRateField(strings.get("feedback_type_required_field"));
            validated = false;
        }

        setErrorForNumberOfIterationsField("");
        const numberOfIterations = utils.toNumber(formValNumberOfIterations);
        if(!formValNumberOfIterations || isNaN(numberOfIterations)) {
            setErrorForNumberOfIterationsField(strings.get("feedback_type_required_field"));
            validated = false;
        }

        const contributionPeriod = formValContributionPeriod === "monthly" ? "monthly" : "yearly";
        const compoundingPeriod = formValCompoundingPeriod === "monthly" ? "monthly" : "yearly";
        const iterationPeriod = formValIterationPeriod === "monthly" ? "monthly" : "yearly";

        if(!validated) return;

        onSubmit && onSubmit({
            initialAmount,
            contributionAmount,
            contributionPeriod,
            compoundingRate,
            compoundingPeriod,
            numberOfIterations,
            iterationPeriod}
        );
    };

    return (
        <form className={`flex flex-col gap-4 md:gap-5 ${className}`}>
            <h2 className={`text-lg md:text-xl font-ubuntu font-bold`}
                dangerouslySetInnerHTML={{__html: strings.get("investment_details")}}/>

            <CalculatorInputGroup label={strings.get("calculator_input_description_currently_saved")}
                                  focused={focusedFieldId === formIdInitialAmount}
                                  errorMessage={errorForInitialAmountField}>
                <CalculatorInputPrefix  value={"$"}
                                        focused={focusedFieldId === formIdInitialAmount}/>
                <CalculatorInputText    id={formIdInitialAmount}
                                        placeholder="0.00"
                                        range={{min: 0, max: 999999999.99}}
                                        allowDecimals={true}
                                        disabled={!editable}
                                        value={formValInitialAmount}
                                        onFocusChanged={setFocusedFieldId}
                                        onValueChanged={setFormValInitialAmount}/>
            </CalculatorInputGroup>

            <CalculatorInputGroup label={strings.get("calculator_input_description_extra_contributions")}
                                  focused={focusedFieldId === formIdContributionAmount}
                                  errorMessage={errorForContributionAmountField}>
                <CalculatorInputPrefix  value={"$"}
                                        focused={focusedFieldId === formIdContributionAmount}/>
                <CalculatorInputText    id={formIdContributionAmount}
                                        placeholder="0.00"
                                        range={{min: 0, max: 9999999.99}}
                                        allowDecimals={true}
                                        disabled={!editable}
                                        value={formValContributionAmount}
                                        onFocusChanged={setFocusedFieldId}
                                        onValueChanged={setFormValContributionAmount}/>
                <CalculatorInputSelect  value={formValContributionPeriod}
                                        onValueChanged={setFormValContributionPeriod}
                                        options={[
                                            {label: strings.get("period_month_each"), value: "monthly"},
                                            {label: strings.get("period_year_each"), value: "yearly"},
                                        ]}
                                        disabled={!editable}/>
            </CalculatorInputGroup>

            <CalculatorInputGroup label={strings.get("calculator_input_description_rate_of_return")}
                                  focused={focusedFieldId === formIdCompoundingRate}
                                  errorMessage={errorForCompoundingRateField}>
                <CalculatorInputText    id={formIdCompoundingRate}
                                        placeholder="0.00"
                                        range={{min: 0, max: formValCompoundingPeriod === "yearly" ? 5999.99 : 499.99}}
                                        allowDecimals={true}
                                        disabled={!editable}
                                        value={formValCompoundingRate}
                                        onFocusChanged={setFocusedFieldId}
                                        onValueChanged={setFormValCompoundingRate}/>
                <CalculatorInputSelect  value={formValCompoundingPeriod}
                                        onValueChanged={setFormValCompoundingPeriod}
                                        options={[
                                            {label: strings.get("period_month_percentage"), value: "monthly"},
                                            {label: strings.get("period_year_percentage"), value: "yearly"},
                                        ]}
                                        disabled={!editable}/>
            </CalculatorInputGroup>

            <CalculatorInputGroup label={strings.get("calculator_input_description_time")}
                                  focused={focusedFieldId === formIdNumberOfIterations}
                                  errorMessage={errorForNumberOfIterationsField}>
                <CalculatorInputText    id={formIdNumberOfIterations}
                                        placeholder="0"
                                        range={{min: 0, max: formValIterationPeriod === "monthly" ? 3600 : 300}}
                                        allowDecimals={false}
                                        disabled={!editable}
                                        value={formValNumberOfIterations}
                                        onFocusChanged={setFocusedFieldId}
                                        onValueChanged={setFormValNumberOfIterations}/>
                <CalculatorInputSelect  value={formValIterationPeriod}
                                        onValueChanged={setFormValIterationPeriod}
                                        options={[
                                            {label: strings.get("period_month_plural"), value: "monthly"},
                                            {label: strings.get("period_year_plural"), value: "yearly"},
                                        ]}
                                        disabled={!editable}/>
            </CalculatorInputGroup>

            {editable && (
                <div className="menu flex flex-col mt-2 md:mt-3 gap-5">
                    <SimpleButton label={strings.get("calculate")}
                                  icon={`pi pi-calculator`}
                                  disabled={!_canSubmitForm()}
                                  onClick={_submitForm}
                                  color={"primary"}/>

                    <SimpleButton label={strings.get("clear")}
                                  icon={`pi pi-trash`}
                                  disabled={!_canResetForm()}
                                  onClick={_resetForm}
                                  color={"muted"}/>
                </div>
            )}
        </form>
    );
}