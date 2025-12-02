import {useStrings} from "@/hooks/strings.tsx";
import PageWrapper from "@/components/pages/partials/PageWrapper.tsx";
import PageHeader from "@/components/pages/partials/PageHeader.tsx";
import PageSection from "@/components/pages/partials/PageSection.tsx";
import {Link} from "react-router-dom";

export default function AppPageNotFound() {
    const strings = useStrings();

    return (
        <PageWrapper>
            <PageHeader title={strings.get("not_found")}
                        subtitle={strings.get("error_page_msg_404")}>
            </PageHeader>

            <PageSection>
                <div className="flex flex-col gap-10 items-center text-center justify-center pt-4 pb-8">
                    <div className="flex items-center justify-center w-32 h-32 rounded-full bg-primary text-white">
                        <i className="pi pi-exclamation-triangle text-6xl"></i>
                    </div>

                    <div className={`flex flex-col gap-2 max-w-[750px]`}>
                        <h3 className={`text-xl lg:text-2xl font-bold m-0 p-0`}
                            dangerouslySetInnerHTML={{__html: strings.get("error_page_msg_unavailable")}}/>

                        <p className={`lg:text-lg text-muted m-0 p-0`}
                           dangerouslySetInnerHTML={{__html: strings.get("error_page_msg_unavailable_description")}}/>
                    </div>

                    <Link to="/"
                          className="px-6 py-3 bg-primary text-white rounded-xl shadow hover:bg-primary-10 transition">
                        <i className="pi pi-home me-3"/>
                        {strings.get("go_back_home")}
                    </Link>
                </div>
            </PageSection>
        </PageWrapper>
    );
}