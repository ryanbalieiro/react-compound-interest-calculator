import type {CompoundingResult} from "@/hooks/types.tsx";
import {useStrings} from "@/hooks/strings.tsx";
import {useState} from "react";
import InfoCards from "@/components/widgets/InfoCards.tsx";
import {TabGroup} from "@/components/widgets/TabGroup.tsx";
import CalculatorDistributionTab from "@/components/calculator/tabs/CalculatorDistributionTab.tsx";
import CalculatorEmptyTab from "@/components/calculator/tabs/CalculatorEmptyTab.tsx";
import CalculatorEvolutionTab from "@/components/calculator/tabs/CalculatorEvolutionTab.tsx";
import CalculatorTableTab from "@/components/calculator/tabs/CalculatorTableTab.tsx";

interface CalculatorResultProps {
    result?: CompoundingResult;
    className?: string;
}

export default function CalculatorResult({ result = undefined, className = "" } : CalculatorResultProps) {
    const strings = useStrings();

    const [activeTabId, setActiveTabId] = useState(0);

    let ActiveTab = CalculatorEmptyTab;
    if(result && activeTabId === 0) ActiveTab = CalculatorEvolutionTab;
    if(result && activeTabId === 1) ActiveTab = CalculatorDistributionTab;
    if(result && activeTabId === 2) ActiveTab = CalculatorTableTab;

    return (
        <div className={`calculator-result flex flex-col gap-4 ${className}`}>
            <InfoCards items={[
                {type: "card", value: result?.final?.totalAmount, label: strings.get("estimated_total"), color: `text-dark`},
                {type: "icon", value: "pi pi-equals"},
                {type: "card", value: result?.final?.totalContributed, label: strings.get("total_invested"), color: `text-primary`},
                {type: "icon", value: "pi pi-plus"},
                {type: "card", value: result?.final?.totalInterest, label: strings.get("total_interest"), color: `text-success`},
            ]}/>

            <div className="calculator-result-report">
                <TabGroup selectedTabId={activeTabId}
                          onTabSelected={(id) => { setActiveTabId(id); }}
                          className={`mt-2`}
                          items={[
                              {id: 0, label: strings.get("evolution"), icon: "pi pi-chart-line"},
                              {id: 1, label: strings.get("distribution"), icon: "pi pi-chart-pie"},
                              {id: 2, label: strings.get("table"), icon: "pi pi-table"},
                          ]}/>

                <ActiveTab result={result}
                           className={`bg-muted/10 overflow-y-auto min-h-[400px] h-[400px] md:min-h-[500px] md:h-[500px]`}/>
            </div>
        </div>
    );
}