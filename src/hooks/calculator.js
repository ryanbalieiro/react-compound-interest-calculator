import {useUtils} from "/src/hooks/utils.js"

export const useCalculator = () => {
    const utils = useUtils()

    const getPeriodUnitName = (unit, plural) => {
        switch (unit) {
            case Periods.YEAR: return !plural ? 'Year' : 'Years'
            case Periods.MONTH: return !plural ? 'Month' : 'Months'
        }

        return '-'
    }

    const listParameterDefinitions = () => {
        return PARAMETER_DEFINITIONS
    }

    const generateParametersBundle = () => {
        const params = {}

        for(const definition of PARAMETER_DEFINITIONS) {
            params[definition.id] = null
            if(definition.default) {
                params[definition.id] = definition.default
            }

            if(definition.formats) {
                const defaultFormat = definition.formats.find(format => format.default) || definition.formats[0]
                params[definition.id + 'Format'] = defaultFormat.value
            }
        }

        return params
    }

    const convertBundleToFormValues = (bundle) => {
        const formValues = {}

        for(const definition of PARAMETER_DEFINITIONS) {
            let value = bundle[definition.id]

            formValues[definition.id] = ''
            if(value !== null)
                formValues[definition.id] = utils.addThousandsSeparator(value.toFixed(definition.maxDecimals))

            if(definition.formats)
                formValues[definition.id + 'Format'] = bundle[definition.id + 'Format']
        }

        return formValues
    }

    const convertFormValuesToBundle = (formValues) => {
        const bundle = {}

        for(const definition of PARAMETER_DEFINITIONS) {
            bundle[definition.id] = formValues[definition.id] !== '' ?
                Number(formValues[definition.id].replaceAll(',', ''))
                : null

            if(definition.formats) {
                bundle[definition.id + 'Format'] = formValues[definition.id + 'Format'] || definition.formats[0].value
            }
        }

        return bundle
    }

    const validateBundle = (bundle) => {
        const errors = []

        for(const definition of PARAMETER_DEFINITIONS) {
            const fieldValue = bundle[definition.id]

            /** Field not filled **/
            if(fieldValue === null || fieldValue === undefined) {
                errors.push({
                    fieldId: definition.id,
                    message: ValidationErrors.REQUIRED
                })
            }
        }

        return {
            success: errors.length === 0,
            errors: errors
        }
    }

    const calculate = (bundle) => {
        const validation = validateBundle(bundle)
        if(!validation.success)
            return null

        return _composeMonthly(bundle)
    }

    const _composeMonthly = (bundle) => {
        const initialAmount = bundle.initialAmount
        const totalMonths = bundle.durationFormat === Periods.YEAR ?
            bundle.duration * 12 :
            bundle.duration

        const monthlyReturnRate = bundle.returnRateFormat === Periods.YEAR ?
            (Math.pow(1 + bundle.returnRate/100, 1/12) - 1)*100 :
            bundle.returnRate

        const monthlyContribution = bundle.contributionFormat === Periods.YEAR ?
            bundle.contribution / 12 :
            bundle.contribution

        const compositionSteps = _generateMonthlyCompositionSteps(initialAmount, totalMonths, monthlyReturnRate, monthlyContribution)

        const result = {}
        result.inputBundle = bundle
        result.final = compositionSteps[compositionSteps.length - 1]
        result.steps = compositionSteps
        return result
    }

    const _generateMonthlyCompositionSteps = (initialAmount, iterations, returnRate, contributionPerIteration) => {
        const steps = [{
            total: initialAmount,
            totalContributed: initialAmount,
            interest: 0,
            annualInterest: 0,
            totalInterest: 0,
        }]

        for(let i = 1 ; i <= iterations ; i++) {
            const previousStep = steps[i - 1]

            const interest = previousStep.total * returnRate/100
            const total = previousStep.total + interest + contributionPerIteration
            const totalContributed = previousStep.totalContributed + contributionPerIteration

            let annualInterest = previousStep.annualInterest
            if((i - 1) % 12 === 0)
                annualInterest = 0
            annualInterest += interest

            steps.push({
                total: _limitValue(total),
                totalContributed: _limitValue(totalContributed),
                interest: _limitValue(interest),
                annualInterest: _limitValue(annualInterest),
                totalInterest: _limitValue(previousStep.totalInterest + interest)
            })
        }

        return steps
    }

    const _limitValue = (value) => {
        return utils.clamp(value, 0, 9999999999999.99)
    }

    return {
        Periods,
        ColorClassSchema,
        getPeriodUnitName,
        listParameterDefinitions,
        generateParametersBundle,
        convertBundleToFormValues,
        convertFormValuesToBundle,
        validateBundle,
        calculate
    }
}

const Periods = {
    MONTH: 'month',
    YEAR: 'year'
}

const ColorClassSchema = {
    CONTRIBUTED: 'primary',
    INTEREST: 'success',
    TOTAL: 'dark'
}

const ValidationErrors = {
    REQUIRED: `This field is required!`
}

const PARAMETER_DEFINITIONS = [
    {
        id: 'initialAmount',
        description: `How much do you have <b>saved currently</b>?`,
        currency: true,
        range: [0, 999999999.99],
        maxDecimals: 2,
        formats: null
    },

    {
        id: 'contribution',
        description: `How much extra will you <b>contribute</b>?`,
        currency: true,
        range: [0, 9999999.99],
        maxDecimals: 2,
        formats: [
            {value: Periods.MONTH, label: 'per month', default: true},
            {value: Periods.YEAR, label: 'per year'},
        ]
    },

    {
        id: 'returnRate',
        description: `What's the expected <b>rate of return</b>?`,
        range: [0, 500],
        maxDecimals: 2,
        formats: [
            {value: Periods.MONTH, label: '% monthly'},
            {value: Periods.YEAR, label: '% yearly', default: true},
        ]
    },

    {
        id: 'duration',
        description: `How much <b>time</b> will you save for?`,
        range: [1, 3600],
        maxDecimals: 0,
        formats: [
            {value: Periods.YEAR, label: 'years', default: true},
            {value: Periods.MONTH, label: 'months', default: true},
        ]
    }
]