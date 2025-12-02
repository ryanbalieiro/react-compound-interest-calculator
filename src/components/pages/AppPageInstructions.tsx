import type {CalculatorInputParameters} from "@/hooks/types.tsx";
import {useStrings} from "@/hooks/strings.tsx";
import {useModel} from "@/hooks/model.tsx";
import {useUtils} from "@/hooks/utils.tsx";
import PageWrapper from "@/components/pages/partials/PageWrapper.tsx";
import PageHeader from "@/components/pages/partials/PageHeader.tsx";
import PageSection from "@/components/pages/partials/PageSection.tsx";
import {PageInfoBlock, PageInfoBlockList, PageInfoBlockParagraph, PageInfoBlockQuote, PageInfoBlockTitle} from "@/components/pages/partials/PageInfoBlock.tsx";
import Calculator from "@/components/calculator/Calculator.tsx";

export default function AppPageInstructions() {
    const model = useModel();
    const strings = useStrings();
    const utils = useUtils();

    const exampleParams: CalculatorInputParameters = {
        initialAmount: 10000,
        contributionAmount: 100,
        contributionPeriod: "monthly",
        compoundingRate: 0.06,
        compoundingPeriod: "yearly",
        numberOfIterations: 25,
        iterationPeriod: "yearly",
    };

    const yearsCount = exampleParams.iterationPeriod === "monthly" ?
        exampleParams.numberOfIterations / 12 :
        exampleParams.numberOfIterations;

    const exampleResult = model.compoundMonthly(exampleParams);

    const exampleDescription = strings.get("instructions_page_example_description")
        .replace("{i}", utils.toDisplayCurrency(exampleParams.initialAmount))
        .replace("{m}", utils.toDisplayCurrency(exampleParams.contributionAmount))
        .replace("{p}", utils.toDisplayPercentage(exampleParams.compoundingRate))
        .replace("{y}", (yearsCount).toFixed(0));

    const exampleNote = strings.get("instructions_page_example_note")
        .replace("{t}", `<span class="badge bg-dark">${utils.toDisplayCurrency(exampleResult.final.totalAmount)}</span>`)
        .replace("{c}", `<span class="badge bg-primary">${utils.toDisplayCurrency(exampleResult.final.totalContributed)}</span>`)
        .replace("{i}", `<span class="badge bg-success">${utils.toDisplayCurrency(exampleResult.final.totalInterest)}</span>`);

    return (
        <PageWrapper>
            <PageHeader title={strings.get("instructions")}
                        subtitle={strings.get("instructions_page_msg_subtitle")}>
            </PageHeader>

            <PageSection>
                <PageInfoBlock>
                    <PageInfoBlockTitle label={strings.get("instructions_page_description_title")}
                                        icon="pi pi-comments"/>

                    <PageInfoBlockParagraph content={strings.get("instructions_page_description_part_1")}/>
                    <PageInfoBlockParagraph content={strings.get("instructions_page_description_part_2")}/>

                    <PageInfoBlockQuote className={`mt-2 text-center font-bold`}>
                        <PageInfoBlockParagraph content={`${strings.get("amount")} = P × ( 1 + r ) <sup>t</sup>`}/>
                    </PageInfoBlockQuote>

                    <PageInfoBlockParagraph content={strings.get("instructions_page_formula_explanation_title")}/>
                    <PageInfoBlockList items={[
                        strings.get("instructions_page_formula_explanation_item_1"),
                        strings.get("instructions_page_formula_explanation_item_2"),
                        strings.get("instructions_page_formula_explanation_item_3")
                    ]}/>
                </PageInfoBlock>

                <PageInfoBlock>
                    <PageInfoBlockTitle label={strings.get("instructions_page_how_to_title")}
                                        icon="pi pi-calculator"/>

                    <PageInfoBlockParagraph content={strings.get("instructions_page_how_to_description")}/>

                    <PageInfoBlockList numbered items={[
                        strings.get("instructions_page_step_by_step_1"),
                        strings.get("instructions_page_step_by_step_2"),
                        strings.get("instructions_page_step_by_step_3"),
                        strings.get("instructions_page_step_by_step_4"),
                        strings.get("instructions_page_step_by_step_5"),
                    ]}/>

                    <PageInfoBlockParagraph content={strings.get("instructions_page_how_to_note")}/>
                </PageInfoBlock>

                <PageInfoBlock>
                    <PageInfoBlockTitle label={strings.get("instructions_page_example_title")}
                                        icon="pi pi-chart-bar"/>

                    <PageInfoBlockParagraph content={exampleDescription}/>

                    <PageInfoBlockQuote className={`mt-2 mb-2`}>
                        <Calculator inputParameters={exampleParams}
                                    editable={false}
                                    className={`p-1 lg:p-3`}/>
                    </PageInfoBlockQuote>

                    <PageInfoBlockParagraph content={exampleNote} className={`leading-6`}/>
                </PageInfoBlock>
            </PageSection>
        </PageWrapper>
    );
}