import type {CompoundingResult} from "@/hooks/types.tsx";
import {useStrings} from "@/hooks/strings.tsx";
import {useUtils} from "@/hooks/utils.tsx";
import {useViewport} from "@/components/providers/ViewportProvider.tsx";
import {useModel} from "@/hooks/model.tsx";
import {BarElement, CategoryScale, Chart as ChartJS, type ChartData, type ChartOptions, Legend, LinearScale, Tooltip, type TooltipItem} from "chart.js";
import {Bar} from "react-chartjs-2";

interface CalculatorEvolutionTabProps {
    result?: CompoundingResult;
    className?: string;
}

export default function CalculatorEvolutionTab({ result, className = "" } : CalculatorEvolutionTabProps) {
    const strings = useStrings();
    const utils = useUtils();
    const viewport = useViewport();
    const model = useModel();
    if(!result) return <></>;

    ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

    const GROUPING_THRESHOLD_IN_YEARS = 15;
    const SHOULD_GROUP_BY_YEARS = result.steps.length > 12*GROUPING_THRESHOLD_IN_YEARS + 1;
    const MAX_STEPS_ALLOWED = viewport.innerWidth >= 1024 ? 60 : 20;
    const UNIT = SHOULD_GROUP_BY_YEARS ? "year" : "month";

    let steps = SHOULD_GROUP_BY_YEARS ?
        result.steps.filter((_, index) => index % 12 === 0) :
        result.steps;

    const originalStepsLength = steps.length;
    const lastStep = steps[originalStepsLength - 1];
    while (steps.length > MAX_STEPS_ALLOWED) steps = steps.filter((_, i) =>
        i % Math.ceil(steps.length / MAX_STEPS_ALLOWED) === 0);
    if(steps[steps.length - 1] !== lastStep) steps.push(lastStep);

    const chartData: ChartData<"bar"> = {
        labels: steps.map((_, index) => {
            if(index === steps.length - 1) return originalStepsLength - 1;
            return index * Math.round(originalStepsLength / steps.length);
        }),
        datasets: [
            {
                label: strings.get("total_contributed"),
                data: steps.map(step => step.totalContributed),
                backgroundColor: utils.getTailwindColor("primary"),
                borderWidth: 0
            },
            {
                label: strings.get("total_interest"),
                data: steps.map(step => step.totalInterest),
                backgroundColor: utils.getTailwindColor("success"),
                borderWidth: 0
            }
        ]
    };

    const chartOptions: ChartOptions<"bar">  = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {display: false},
            tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                    title: (context: TooltipItem<"bar">[]) => {
                        const unitLabel = strings.get(`period_${UNIT}_singular`);
                        const currentIndex = context[0].label;
                        return unitLabel + ' ' + currentIndex;
                    },
                    label: (context: TooltipItem<"bar">) => {
                        const label = context.dataset.label;
                        const formattedValue = utils.toDisplayCurrency(Number(context.raw)).replace("$ ", "$");
                        return `${label}: ${formattedValue}`;
                    },
                    footer: (context: TooltipItem<"bar">[]) => {
                        const totalContributed = Number(context[0].raw);
                        const totalInterest = Number(context[1].raw);
                        const total = model.clampParameter(totalContributed + totalInterest);
                        const formattedValue = utils.toDisplayCurrency(total).replace("$ ", "$");
                        return `${strings.get("total")}: ${formattedValue}`;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'category',
                stacked: true,
                grid: { display: false },
                title: {
                    display: true,
                    text: strings.get(`period_${UNIT}_plural`),
                    align: "center"
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: { callback: (value) => utils.abbreviateNumber(Number(value)) }
            }
        }
    };

    return (
        <div className={`
            flex flex-col justify-center items-center text-center w-full max-w-full h-full overflow-hidden
            px-6 pt-10 pb-6 gap-6 md:p-10 md:pb-8 md:gap-8
            ${className}
        `}>
            <Bar data={chartData}
                 options={chartOptions}/>
        </div>
    );
}