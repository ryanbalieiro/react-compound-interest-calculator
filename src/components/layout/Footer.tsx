import type {ReactNode} from "react";
import Container from "@/components/layout/Container.tsx";
import {InlineLinkList} from "@/components/widgets/InlineLinkList.tsx";
import {SocialLinks} from "@/components/widgets/SocialLinks.tsx";
import {useNavigation} from "@/hooks/navigation.tsx";
import {useStrings} from "@/hooks/strings.tsx";
import {useViewport} from "@/components/providers/ViewportProvider.tsx";

export default function Footer() {
    const navigation = useNavigation();
    const strings = useStrings();
    const viewport = useViewport();

    const contactLinks = navigation.getContactLinks();
    const externalLinks = navigation.getExternalLinks();
    const navLinks = navigation.getNavLinks();

    const bottomClass = viewport.shouldDisplayNavTabs() ?
        'mb-18' : 'mb-0';

    return (
        <footer className={`d-flex bg-dark ${bottomClass}`}>
            <FooterBlock>
                <div className="grid grid-cols-1 lg:grid-cols-3 py-3 lg:pb-0">
                    <FooterBlockColumn title={strings.get("about")}
                                       icon="pi pi-lightbulb"
                                       description={strings.get("footer_msg_about", "custom-primary-light-link")}
                                       linksLayout={`list`}
                                       links={navLinks}/>

                    <FooterBlockColumn title={strings.get("around_the_web")}
                                       icon=""
                                       description={``}
                                       linksLayout={`buttons`}
                                       links={externalLinks}/>

                    <FooterBlockColumn title={strings.get("contact_info")}
                                       icon="pi pi-envelope"
                                       description={strings.get("footer_msg_contact_details")}
                                       linksLayout={`list`}
                                       links={contactLinks}/>
                </div>
            </FooterBlock>

            <FooterBlock darken center>
                <p className={`text-sm`} dangerouslySetInnerHTML={{__html: strings.get("footer_msg_copyright", "custom-primary-light-link")}}/>
            </FooterBlock>
        </footer>
    );
}

interface FooterBlockProps {
    children?: ReactNode;
    darken?: boolean;
    center?: boolean;
}

function FooterBlock({ children, darken = false, center = false } : FooterBlockProps) {
    const bgColorClass = darken ?
        'bg-dark-emphasis' : 'bg-dark';

    const centerClass = center ?
        'text-center' : '';

    return (
        <div className={`${bgColorClass} ${centerClass} text-white/65 px-5 py-5`}
             style={{ minHeight: '40px' }}>
            <Container>
                {children}
            </Container>
        </div>
    );
}

interface FooterBlockColumnProps {
    title: string;
    icon: string;
    description?: string;
    linksLayout?: 'list' | 'buttons';
    links?: {label: string, href: string, icon: string}[];
}

function FooterBlockColumn({ title = "", icon = "", description = "", linksLayout = "list", links= [] } : FooterBlockColumnProps) {
    const hasList = Boolean(linksLayout === 'list' && links.length);
    const hasButtons = Boolean(linksLayout === 'buttons' && links.length);

    return (
        <div className="col-span-1 d-flex justify-center items-center text-center px-4 mb-8 last:mb-0 mb-lg-0">
            <h1 className="font-ubuntu text-xl font-bold text-white">
                {icon && (
                    <i className={`${icon} me-2`}></i>
                )}
                <span>{title}</span>
            </h1>

            {description && (
                <div className="d-flex justify-center items-center text-sm pt-2 mx-auto lg:min-h-[60px] lg:pt-3"
                     style={{ maxWidth: '360px' }}>
                    <span dangerouslySetInnerHTML={{ __html: description }}/>
                </div>
            )}

            {hasList && (
                <InlineLinkList links={links}
                                className={`m-0 p-0 mt-3`}/>
            )}

            {hasButtons && (
                <SocialLinks links={links}
                             className={`mt-4 mt-lg-5`}/>
            )}
        </div>
    );
}
