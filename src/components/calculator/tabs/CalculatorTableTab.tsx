import type {CompoundingResult} from "@/hooks/types.tsx";
import {useStrings} from "@/hooks/strings.tsx";
import {useUtils} from "@/hooks/utils.tsx";

interface CalculatorTableTabProps {
    result?: CompoundingResult;
    className?: string;
}

export default function CalculatorTableTab({ result, className = "" } : CalculatorTableTabProps) {
    const strings = useStrings();
    const utils = useUtils();
    if(!result) return <></>;

    const GROUPING_THRESHOLD_IN_YEARS = 30;
    const SHOULD_GROUP_BY_YEARS = result.steps.length > 12*GROUPING_THRESHOLD_IN_YEARS + 1;
    const SHOULD_REMOVE_NON_ESSENTIAL_FIELDS = result.final.totalAmount > 9999999999;

    const headers = [
        strings.get(`period_${SHOULD_GROUP_BY_YEARS ? 'year' : 'month'}_end`),
        strings.get("earned_interest"),
        strings.get("total_contributed"),
        strings.get("total_interest"),
        strings.get("estimated_total"),
    ].filter((_, index) => {
        if(!SHOULD_REMOVE_NON_ESSENTIAL_FIELDS) return true;
        return index !== 1;
    }).map(header => {
        const lowerCaseHeader = header.toLowerCase();
        return header.charAt(0).toUpperCase() + lowerCaseHeader.slice(1);
    });

    const filteredSteps = SHOULD_GROUP_BY_YEARS ?
        result.steps.filter((_, index) => index % 12 === 0) :
        result.steps;

    const rows = filteredSteps.map((step, index) => {
        return {
            index: index > 0 ? index : "-",
            interest: `+ ${utils.toDisplayCurrency(step.interest)}`,
            totalContributed: utils.toDisplayCurrency(step.totalContributed),
            totalInterest: utils.toDisplayCurrency(step.totalInterest),
            estimatedTotal: utils.toDisplayCurrency(step.totalAmount),
        };
    });

    return (
        <div className={`${className} overflow-x-scroll p-0 text-center`}>
            <table className={`min-w-[500px] md:min-w-auto custom-table-stylized text-sm`}>
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th className={`w-[20%]`} key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>{row.index}</td>
                            {!SHOULD_REMOVE_NON_ESSENTIAL_FIELDS && (
                                <td><span className={`badge bg-success flex justify-center w-[70%] min-w-[80px] m-auto`}>{row.interest}</span></td>
                            )}
                            <td className={`text-muted-accent`}>{row.totalContributed}</td>
                            <td className={`text-muted-accent`}>{row.totalInterest}</td>
                            <td className={`font-bold`}>{row.estimatedTotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}