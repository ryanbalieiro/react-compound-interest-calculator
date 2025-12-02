export type CalculatorInputParameters = {
    initialAmount: number;
    contributionAmount: number;
    contributionPeriod: "monthly" | "yearly";
    compoundingRate: number;
    compoundingPeriod: "monthly" | "yearly";
    numberOfIterations: number;
    iterationPeriod: "monthly" | "yearly";
};

export type CompoundingStep = {
    totalAmount: number;
    totalContributed: number;
    interest: number;
    annualInterest: number;
    totalInterest: number;
};

export type CompoundingResult = {
    parameters: CalculatorInputParameters;
    steps: CompoundingStep[];
    final: CompoundingStep;
};