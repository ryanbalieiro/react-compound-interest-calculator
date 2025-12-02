import {useNavigation} from "@/hooks/navigation.tsx";
import {useViewport} from "@/components/providers/ViewportProvider.tsx";
import {Link, useLocation} from "react-router-dom";
import type {MouseEvent} from "react";

export default function NavTabs() {
    const viewport = useViewport();
    const navigation = useNavigation();

    if(!viewport.shouldDisplayNavTabs())
        return <></>;

    const navLinks = navigation.getNavLinks().slice(0, 3);

    return (
        <nav className={`bg-dark-emphasis-accent w-full fixed bottom-0 left-0 z-50 h-[75px]`}>
            <ul className="flex justify-between items-center h-full">
                {navLinks.map((link, index) => (
                    <NavTab key={index}
                            href={link.href}
                            label={link.label}
                            icon={link.icon}/>
                ))}
            </ul>
        </nav>
    );
}

function NavTab({href = "", label = "", icon = ""}) {
    const location = useLocation();

    const locationPage = location.pathname.replace(/\/$/, '');
    const targetPage = href.replace(/\/$/, '');
    const isActive = locationPage === targetPage;

    const linkClass = isActive ?
        `opacity-100 bg-dark border-t-2 border-primary-60 text-primary-80` :
        `opacity-30 border-t-2 border-muted hover:opacity-60 hover:bg-dark`

    const spanClass = isActive ?
        'text-primary-60' :
        '';

    const _onClick = (_: MouseEvent<HTMLAnchorElement>) => {
        if(href !== location.pathname) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <li className={`flex-1 h-[75px] text-center text-white`}>
            <Link to={href}
                  onClick={_onClick}
                  className={`h-[75px] flex flex-col gap-2 justify-center items-center w-full ${linkClass}`}>
                <i className={`${icon} text-xl`} />
                <span className={`block text-xs mb-2 ${spanClass}`}>{label}</span>
            </Link>
        </li>
    );
}