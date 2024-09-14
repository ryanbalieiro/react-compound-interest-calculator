import {useUtils} from "/src/hooks/utils.js"
import {useCalculator} from "/src/hooks/calculator.js"
import ChartWrapper from "/src/components/layout/ChartWrapper.jsx"
import {Pie} from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import CalculatorTabWrapper from "/src/components/calculator/tabs/CalculatorTabWrapper.jsx"

function CalculatorDistributionTab({visible, result}) {
    const calculator = useCalculator()
    const utils = useUtils()

    const contributedPercentage = (result.final.totalContributed * 100 / result.final.total).toFixed(2)
    const interestPercentage = (100 - Number(contributedPercentage)).toFixed(2)

    const data = {
        labels: ["Total invested", "Total interest"],
        datasets: [
            {
                data: [result.final.totalContributed, result.final.totalInterest],
                backgroundColor: [
                    utils.getBootstrapColor(calculator.ColorClassSchema.CONTRIBUTED),
                    utils.getBootstrapColor(calculator.ColorClassSchema.INTEREST),
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    title: function (context) {
                        const value = context[0].raw
                        const percentage = ((value / result.final.total) * 100).toFixed(2)
                        return [`${context[0].label} - ${percentage}%`]
                    },

                    label: function (context) {
                        return ' ' + utils.toDisplayCurrency(context.raw).replace('$ ', '$')
                    },
                },
            }
        },
    }

    const legend = `
        <strong class="text-${calculator.ColorClassSchema.CONTRIBUTED}">${contributedPercentage}%</strong> 
        of your final balance came from contributions and
        <strong class="text-${calculator.ColorClassSchema.INTEREST}">${interestPercentage}%</strong> 
        came from interest.`

    ChartJS.register(ArcElement, Tooltip)

    return (
        <CalculatorTabWrapper visible={visible}>
            <ChartWrapper legend={legend} className={`p-4 p-md-5`}>
                {visible && (<Pie data={data} options={options}/>)}
            </ChartWrapper>
        </CalculatorTabWrapper>
    )
}

export default CalculatorDistributionTab