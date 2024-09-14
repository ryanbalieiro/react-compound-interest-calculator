import React, {useState} from 'react'
import {useCalculator} from "/src/hooks/calculator.js"

import InfoBlock from "/src/components/widgets/InfoBlock.jsx"
import {faChartLine, faPenRuler} from "@fortawesome/free-solid-svg-icons"
import Calculator from "/src/components/calculator/Calculator.jsx"
import {useUtils} from "/src/hooks/utils.js"

const ExampleBlock = () => {
    const calculator = useCalculator()
    const utils = useUtils()

    const [result, setResult] = useState()

    const _makeExampleBundle = () => {
        const params = calculator.generateParametersBundle()
        params.initialAmount = 10000

        params.contribution = 100
        params.contributionFormat = calculator.Periods.MONTH

        params.returnRate = 6.00
        params.returnRateFormat = calculator.Periods.YEAR

        params.duration = 25
        params.durationFormat = calculator.Periods.YEAR
        return params
    }

    const _generateDescription = () => {
        const exampleParams = _makeExampleBundle()
        const stringParams = calculator.convertBundleToFormValues(exampleParams)

        const initialAmount = `$<strong>${stringParams.initialAmount}</strong>`

        const contribution = `$<strong>${stringParams.contribution}</strong>`
        const contributionPeriod = stringParams.contributionFormat === calculator.Periods.MONTH ? 'month' : 'year'

        const returnRate = `<strong>${parseInt(stringParams.returnRate)}</strong>`
        const returnRatePeriod = stringParams.returnRateFormat === calculator.Periods.MONTH ? 'monthly' : 'annual'

        const duration = `<strong>${stringParams.duration}</strong>`
        const durationPeriod = stringParams.durationFormat === calculator.Periods.MONTH ? 'months' : 'years'

        return `Imagine you start with an initial investment of ${initialAmount}, and you add ${contribution} every ${contributionPeriod} at a ${returnRate}% ${returnRatePeriod} interest rate for ${duration} ${durationPeriod}:`
    }

    const _generateResultMessage = () => {
        const contributedAmount = _getFormatResultProperty('totalContributed', calculator.ColorClassSchema.CONTRIBUTED)
        const interestAmount = _getFormatResultProperty('totalInterest', calculator.ColorClassSchema.INTEREST)
        const totalAmount = _getFormatResultProperty('total', calculator.ColorClassSchema.TOTAL)

        return `For the scenario above, your estimated savings would be ${totalAmount} – with ${contributedAmount} coming from contributions and ${interestAmount} from interest. This calculation assumes that your investment earns interest income that compounds at the end of each month.`
    }

    const _getFormatResultProperty = (property, colorClass) => {
        const formatted = utils.toDisplayCurrency(
            result ? result['final'][property] : 0
        ).replace(' ', '')

        return `<strong class="badge bg-${colorClass} text-3">${formatted}</strong>`
    }

    const _onCalculationSuccess = (result) => {
        setResult(result)
    }

    return (
        <InfoBlock title={`Example scenario`} faIcon={faChartLine}>
            <p className={`mb-0 text-4`} dangerouslySetInnerHTML={{__html:_generateDescription()}}/>

            <Calculator className={`my-3`}
                        editable={false}
                        bordered={true}
                        paramsBundle={_makeExampleBundle()}
                        onParamsChanged={null}
                        onCalculationSuccess={_onCalculationSuccess}/>

            <p className={`text-4`}>
                <span dangerouslySetInnerHTML={{__html:_generateResultMessage()}}/>
            </p>
        </InfoBlock>
    )
};

export default ExampleBlock