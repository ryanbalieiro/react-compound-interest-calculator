import type {CompoundingResult} from "@/hooks/types.tsx";
import {useStrings} from "@/hooks/strings.tsx";
import {useUtils} from "@/hooks/utils.tsx";
import {Chart as ChartJS, ArcElement, Tooltip, type ChartData, type ChartOptions} from 'chart.js';
import {Pie} from "react-chartjs-2";
import type { TooltipItem } from "chart.js";

interface CalculatorDistributionTabProps {
    result?: CompoundingResult;
    className?: string;
}

export default function CalculatorDistributionTab({ result, className = "" } : CalculatorDistributionTabProps) {
    const strings = useStrings();
    const utils = useUtils();
    if(!result) return <></>;

    ChartJS.register(ArcElement, Tooltip);

    const totalContributed = result.final.totalContributed;
    const totalInterest = result.final.totalInterest;
    const totalAmount = result.final.totalAmount;

    const percentageFromContributions = totalContributed / totalAmount;
    const percentageFromInterest = 1 - percentageFromContributions;
    const formattedPercentageFromContributions = utils.toDisplayPercentage(percentageFromContributions);
    const formattedPercentageFromInterest = utils.toDisplayPercentage(percentageFromInterest);

    const chartData:ChartData<'pie'> = {
        labels: [
            strings.get("total_invested"),
            strings.get("total_interest")
        ],
        datasets: [
            {
                data: [totalContributed, totalInterest],
                borderWidth: 1,
                backgroundColor: [
                    utils.getTailwindColor("primary"),
                    utils.getTailwindColor("success")
                ]
            }
        ]
    };

    const chartOptions:ChartOptions<'pie'> = {
        plugins: {
            legend: {display: false},
            tooltip: {
                callbacks: {
                    title: (context: TooltipItem<'pie'>[]) => {
                        if (!context.length) return "";
                        const value = context[0].raw as number;
                        const percentage = ((value / totalAmount) * 100).toFixed(2);
                        return `${context[0].label} - ${percentage}%`;
                    },

                    label: (context: TooltipItem<'pie'>) => {
                        const value = context.raw as number;
                        return ' ' + utils.toDisplayCurrency(value).replace('$ ', '$');
                    },
                },
            }
        }
    };

    const description = strings.get("calculator_distribution_explanation")
        .replace(`{c}`, `<span class="text-primary font-bold">${formattedPercentageFromContributions}</span>`)
        .replace(`{i}`, `<span class="text-success font-bold">${formattedPercentageFromInterest}</span>`);

    return (
        <div className={`
            flex flex-col justify-center items-center text-center w-full h-full overflow-hidden
            px-10 py-10 gap-6 md:p-10 md:gap-8
            ${className}
        `}>
            <Pie className={`max-w-[250px] max-h-[250px] md:max-w-[330px] md:max-h-[330px]`}
                 data={chartData}
                 options={chartOptions}/>

            <div className={`description-wrapper`}>
                <p className={`text-sm md:text-base m-0 p-0`}
                   dangerouslySetInnerHTML={{__html: description}}/>
            </div>
        </div>
    );
}