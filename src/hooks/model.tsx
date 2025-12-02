import type {CalculatorInputParameters, CompoundingResult, CompoundingStep} from "@/hooks/types.tsx";

export const useModel = () => {
    const clampParameter = (value: number):number => {
        if(value < 0) return 0;
        if(value > 9999999999999.99) return 9999999999999.99;
        return value;
    };

    const compoundMonthly = (inputParameters: CalculatorInputParameters):CompoundingResult => {
        const normalizedInputParameters: CalculatorInputParameters = _normalizeInputParameters(inputParameters);
        const steps = _calculateMonthlySteps(normalizedInputParameters);

        return {
            parameters: normalizedInputParameters,
            steps: steps,
            final: steps[steps.length - 1]
        };
    };

    const _normalizeInputParameters = (inputParameters: CalculatorInputParameters):CalculatorInputParameters => {
        const monthlyContributionAmount =
            inputParameters.contributionPeriod === "monthly" ?
                inputParameters.contributionAmount :
                inputParameters.contributionAmount / 12;

        const monthlyCompoundingRate =
            inputParameters.compoundingPeriod === "monthly" ?
                inputParameters.compoundingRate :
                Math.pow(1 + inputParameters.compoundingRate, 1/12) - 1;

        const numberOfIterations =
            inputParameters.iterationPeriod === "monthly" ?
                inputParameters.numberOfIterations :
                inputParameters.numberOfIterations * 12;

        return {
            initialAmount: inputParameters.initialAmount,
            contributionAmount: monthlyContributionAmount,
            contributionPeriod: "monthly",
            compoundingRate: monthlyCompoundingRate,
            compoundingPeriod: "monthly",
            numberOfIterations: numberOfIterations,
            iterationPeriod: "monthly"
        };
    };

    const _calculateMonthlySteps = (normalizedInputParameters: CalculatorInputParameters):CompoundingStep[] => {
        const steps = [{
            totalAmount: normalizedInputParameters.initialAmount,
            totalContributed: normalizedInputParameters.initialAmount,
            interest: 0,
            annualInterest: 0,
            totalInterest: 0
        }];

        for(let i = 1 ; i <= normalizedInputParameters.numberOfIterations ; i++) {
            const previousStep = steps[i - 1];

            const interest = previousStep.totalAmount * normalizedInputParameters.compoundingRate;
            const totalAmount = previousStep.totalAmount + interest + normalizedInputParameters.contributionAmount;
            const totalContributed = previousStep.totalContributed + normalizedInputParameters.contributionAmount;

            let annualInterest = previousStep.annualInterest;
            if((i - 1) % 12 === 0) annualInterest = 0;
            annualInterest += interest;

            steps.push({
                totalAmount: clampParameter(totalAmount),
                totalContributed: clampParameter(totalContributed),
                interest: clampParameter(interest),
                annualInterest: clampParameter(annualInterest),
                totalInterest: clampParameter(previousStep.totalInterest + interest)
            });
        }

        return steps;
    };

    return {
        clampParameter,
        compoundMonthly
    };
}