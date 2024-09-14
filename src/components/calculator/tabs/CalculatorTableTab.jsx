import {Table} from "react-bootstrap"
import {useUtils} from "/src/hooks/utils.js"
import {useCalculator} from "/src/hooks/calculator.js"
import CalculatorTabWrapper from "/src/components/calculator/tabs/CalculatorTabWrapper.jsx"

function CalculatorTableTab({visible, result}) {
    const calculator = useCalculator()
    const utils = useUtils()

    const shouldGroupByYear = result.steps.length > 12*30 + 1
    const unit = shouldGroupByYear ? 'year' : 'month'

    let rows = result.steps
    if(shouldGroupByYear) {
        rows =  rows.filter((_, index) => index % 12 === 0)
    }

    const _getIndex = (key) => {
        if(key === 0)
            return '-'
        return key
    }

    const _getInterestFor = (item) => {
        if(shouldGroupByYear)
            return item.annualInterest
        return item.interest
    }

    return (
        <CalculatorTabWrapper visible={visible}>
            <div className={`calculator-table-tab p-1 w-100`}>
                <Table striped={true} bordered={true} className={`text-3 text-center m-0 p-0`} style={{minWidth: '600px'}}>
                    <thead>
                        <tr className={`fw-bold`}>
                            <td style={{width: '20%'}}>End of {calculator.getPeriodUnitName(unit, false).toLowerCase()}</td>
                            <td style={{width: '20%'}}>Earned interest</td>
                            <td style={{width: '20%'}}>Total contributed</td>
                            <td style={{width: '20%'}}>Total interest</td>
                            <td style={{width: '20%'}}>Estimated total</td>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((item, key) => (
                            <tr key={key}>
                                <td>{_getIndex(key)}</td>

                                <td className={`text-3`}>
                                    <span className={`bg-success badge`} style={{minWidth: '60%'}}>
                                        + {utils.toDisplayCurrency(_getInterestFor(item))}
                                    </span>
                                </td>

                                <td className={`text-muted`}>
                                    {utils.toDisplayCurrency(item.totalContributed)}
                                </td>

                                <td className={`text-muted`}>
                                    {utils.toDisplayCurrency(item.totalInterest)}
                                </td>
                                <td className={`fw-bold`}>
                                    {utils.toDisplayCurrency(item.total)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </CalculatorTabWrapper>
    )
}

export default CalculatorTableTab