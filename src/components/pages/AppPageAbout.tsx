import {useStrings} from "@/hooks/strings.tsx";
import PageWrapper from "@/components/pages/partials/PageWrapper.tsx";
import PageHeader from "@/components/pages/partials/PageHeader.tsx";
import PageSection from "@/components/pages/partials/PageSection.tsx";
import {PageInfoBlock, PageInfoBlockList, PageInfoBlockParagraph, PageInfoBlockQuote, PageInfoBlockTitle} from "@/components/pages/partials/PageInfoBlock.tsx";

export default function AppPageAbout() {
    const strings = useStrings();

    return (
        <PageWrapper>
            <PageHeader title={strings.get("about")}
                        subtitle={strings.get("about_page_msg_subtitle")}>
            </PageHeader>

            <PageSection>
                <PageInfoBlock>
                    <PageInfoBlockParagraph content={strings.get("about_page_msg_description")}/>
                </PageInfoBlock>

                <PageInfoBlock>
                    <PageInfoBlockTitle label={strings.get("technical_info")}
                                        icon="pi pi-briefcase"/>

                    <PageInfoBlockParagraph content={strings.get("about_page_msg_technical_info_description")}/>
                    <PageInfoBlockList items={[
                        strings.get("about_page_msg_framework_description_react"),
                        strings.get("about_page_msg_framework_description_vite"),
                        strings.get("about_page_msg_framework_description_react_router_dom"),
                        strings.get("about_page_msg_framework_description_chart_js"),
                        strings.get("about_page_msg_framework_description_tailwind"),
                        strings.get("about_page_msg_framework_description_prime_icons"),
                    ]}/>
                </PageInfoBlock>

                <PageInfoBlock>
                    <PageInfoBlockTitle label={strings.get("license")}
                                        icon="pi pi-hammer"/>

                    <PageInfoBlockParagraph content={strings.get("about_page_msg_license_description")}/>
                    <PageInfoBlockQuote className={`mt-2`}>
                        <PageInfoBlockParagraph content={strings.get("about_page_msg_license_content")}
                                                className={`text-muted`}/>
                    </PageInfoBlockQuote>
                </PageInfoBlock>

                <PageInfoBlock>
                    <PageInfoBlockTitle label={strings.get("disclaimer_note")}
                                        icon="pi pi-exclamation-triangle"/>

                    <PageInfoBlockParagraph content={strings.get("about_page_msg_disclaimer_part_1")}/>
                    <PageInfoBlockParagraph content={strings.get("about_page_msg_disclaimer_part_2")}/>
                </PageInfoBlock>
            </PageSection>
        </PageWrapper>
    );
}