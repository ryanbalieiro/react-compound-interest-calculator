import {useUtils} from "/src/hooks/utils.js"
import {useCalculator} from "/src/hooks/calculator.js"
import {useWatcher} from "/src/hooks/watcher.js"

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';

import ChartWrapper from "/src/components/layout/ChartWrapper.jsx"
import CalculatorTabWrapper from "/src/components/calculator/tabs/CalculatorTabWrapper.jsx"

function CalculatorEvolutionTab({visible, result}) {
    const calculator = useCalculator()
    const utils = useUtils()
    const watcher = useWatcher()

    const isLargeScreen = watcher.isBreakpoint(watcher.Breakpoints.LG)
    const shouldGroupByYear = result.steps.length > 12*15 + 1
    const unit = shouldGroupByYear ? 'year' : 'month'

    let entries = result.steps
    if(shouldGroupByYear) {
        entries =  entries.filter((_, index) => index % 12 === 0)
    }

    const originalEntriesLength = entries.length
    const lastEntry = entries[entries.length - 1]
    const maxEntriesAllowed = isLargeScreen ? 60 : 20

    while(entries.length > maxEntriesAllowed) {
        let interval = Math.ceil(entries.length / maxEntriesAllowed)
        entries = entries.filter((_, index) => index % interval === 0)
    }

    if(entries[entries.length - 1] !== lastEntry)
        entries.push(lastEntry)

    const _getEntryActualIndex = (arrayIndex) => {
        if(arrayIndex === entries.length - 1)
            return originalEntriesLength - 1

        return arrayIndex * Math.round(originalEntriesLength/entries.length)
    }

    const data = {
        labels: entries.map((_, index) => `${_getEntryActualIndex(index)}`),
        datasets: [
            {
                label: 'Total Contributed',
                data: entries.map(step => step.totalContributed),
                backgroundColor: utils.getBootstrapColor(calculator.ColorClassSchema.CONTRIBUTED),
                borderWidth: 0,
            },
            {
                label: 'Total Interest',
                data: entries.map(step => step.totalInterest),
                backgroundColor: utils.getBootstrapColor(calculator.ColorClassSchema.INTEREST),
                borderWidth: 0,
            },
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: function (context) {
                        const unitLabel = calculator.getPeriodUnitName(unit, false)
                        const currentIndex = context[0].label
                        return unitLabel + ' ' + currentIndex
                    },

                    label: function (context) {
                        return context.dataset.label + ': ' + utils.toDisplayCurrency(context.raw).replace('$ ', '$')
                    },

                    footer: function (context) {
                        const totalContributed = context[0].raw
                        const totalInterest = context[1].raw
                        const total = totalContributed + totalInterest
                        return 'Total: ' + utils.toDisplayCurrency(total).replace('$ ', '$')
                    }
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                grid: {
                    display: false, // Removes the X-axis grid
                },
                title: {
                    display: true,
                    text: calculator.getPeriodUnitName(unit, true),
                    align: 'center'
                },
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    callback: function(value) {
                        return utils.abbreviateNumber(value)
                    },
                },
            },
        },
    }

    ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

    return (
        <CalculatorTabWrapper visible={visible}>
            <ChartWrapper className={`p-3`}>
                <Bar className={`h-100`} data={data} options={options} />
            </ChartWrapper>
        </CalculatorTabWrapper>
    )
}

export default CalculatorEvolutionTab