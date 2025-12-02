import {useNavigation} from "@/hooks/navigation.tsx";
import {useStrings} from "@/hooks/strings.tsx";

interface BrandProps {
    className?: string;
}

export default function Brand({ className = "" } : BrandProps) {
    const navigation = useNavigation();
    const strings = useStrings();

    const logoPath = navigation.resolvePath("/icon.svg");
    const brandLeadLabel = strings.get("strings.brand_lead_label");
    const brandSubLabel = strings.get("strings.brand_sub_label");

    return (
        <div className={`brand ${className} flex gap-3 h-[100%] items-center`}>
            <img src={logoPath}
                 alt="logo"
                 className="
                    max-w-[60px] max-h-[60px]
                    md:max-w-[60px] md:max-h-[60px]
                    sm:max-w-[54px] sm:max-h-[54px]
                    max-[640px]:max-w-[54px] max-[640px]:max-h-[54px]
                    max-[480px]:max-w-[48px] max-[480px]:max-h-[48px]
                    max-[360px]:hidden
                 "/>

            <div className="flex flex-col font-ubuntu text-white">
                <span className="lead-label text-lg"
                      dangerouslySetInnerHTML={{__html: brandLeadLabel}}/>

                <span className="sub-label text-1 text-sm opacity-60 ms-12">
                    {brandSubLabel}
                    <i className="pi pi-chart-bar ms-2"/>
                </span>
            </div>
        </div>
    );
}