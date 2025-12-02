import {Link, useLocation} from "react-router-dom";

interface InlineLinkListProps {
    links: {label: string, href: string, icon: string}[],
    className?: string;
}

interface InlineLinkListItemProps {
    label: string;
    href: string;
    icon: string;
}

export function InlineLinkList({ links = [], className = "" } : InlineLinkListProps) {
    return (
        <ul className={`flex flex-col lg:flex-row justify-center items-center ${className}`}>
            {links.map((link, index) => (
                <InlineLinkListItem key={index} {...link}/>
            ))}
        </ul>
    );
}

export function InlineLinkListItem({ label = "", href = "", icon = "" } : InlineLinkListItemProps) {
    const location = useLocation();
    const isRouterLink = href.charAt(0) === '/';

    const locationPage = location.pathname.replace(/\/$/, '');
    const targetPage = href.replace(/\/$/, '');
    const isActive = locationPage === targetPage;

    const liClass = `
        whitespace-nowrap px-[0.3rem]
        lg:[&:not(:last-child)::after]:content-['·']
        lg:[&:not(:last-child)::after]:opacity-50
        lg:[&:not(:last-child)::after]:ml-[0.6rem]
        pb-1 lg:pb-0 last:pb-0
    `;

    const hrefClass = `
        [&>span]:opacity-60
        [&>i]:mr-2
        
        hover:text-[var(--color-primary-50)]
        ${isActive ? 'text-[var(--color-primary-50)]' : ''}
    
        hover:[&>span]:opacity-100
        ${isActive ? '[&>span]:opacity-100' : ''}
    
        hover:[&>i]:text-[var(--color-primary-80)]
        ${isActive ? '[&>i]:text-[var(--color-primary-80)]' : ''}
    `;

    return (
        <li className={liClass}>
            {!isRouterLink && (
                <a href={href} className={`text-sm ${hrefClass}`} target={`_blank`}>
                    <i className={`${icon}`}/>
                    <span>{label}</span>
                </a>
            )}

            {isRouterLink && (
                <Link to={href} className={`text-sm ${hrefClass}`}>
                    <i className={`${icon}`}/>
                    <span>{label}</span>
                </Link>
            )}
        </li>
    );
}