import {useStrings} from "@/hooks/strings.tsx";
import {useSession} from "@/components/providers/SessionProvider.tsx";
import type {CalculatorInputParameters} from "@/hooks/types.tsx";
import PageWrapper from "@/components/pages/partials/PageWrapper.tsx";
import PageHeader from "@/components/pages/partials/PageHeader.tsx";
import PageSection from "@/components/pages/partials/PageSection.tsx";
import {PageInfoBlock, PageInfoBlockParagraph} from "@/components/pages/partials/PageInfoBlock.tsx";
import Calculator from "@/components/calculator/Calculator.tsx";
import {useViewport} from "@/components/providers/ViewportProvider.tsx";

export default function AppPageHome() {
    const strings = useStrings();
    const session = useSession();
    const viewport = useViewport();

    const _onCalculatorInput = (inputParameters?: CalculatorInputParameters) => {
        session.setInputParameters(inputParameters);

        const targetEl = document.querySelector(".calculator-result");
        if(viewport.shouldDisplayCalculatorPartsSideBySide() || !targetEl) return;
        if(!targetEl) return;

        if(inputParameters) {
            const globalY = targetEl.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: globalY - 10, behavior: "smooth" });
        }
        else {
            setTimeout(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, 50);
        }
    };

    return (
        <PageWrapper>
            <PageHeader title={strings.get("simulate_now")}
                        subtitle={strings.get("home_page_msg_subtitle")}>
            </PageHeader>

            <PageSection>
                <PageInfoBlock>
                    <Calculator inputParameters={session.inputParameters}
                                editable={true}
                                onSubmit={_onCalculatorInput}/>

                    <PageInfoBlockParagraph content={`<i class="pi pi-lightbulb me-1"></i> ${strings.get("home_page_note")}`}
                                            className={`mt-3 text-muted`}/>
                </PageInfoBlock>
            </PageSection>
        </PageWrapper>
    );
}