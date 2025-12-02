interface SocialLinksProps {
    links: {label: string, href: string, icon: string}[],
    className?: string;
}

interface SocialLinkProps {
    label: string;
    href: string;
    icon: string;
}

export function SocialLinks({ links = [], className = "" } : SocialLinksProps) {
    return (
        <ul className={`flex justify-center items-center p-0 mb-2 ${className}`}>
            {links.map((link, index) => (
                <SocialLink key={index} {...link}/>
            ))}
        </ul>
    );
}

export function SocialLink({ label = "", href = "", icon = "" } : SocialLinkProps) {
    const aClass = `
        relative

        hover:[&>span]:block

        hover:[&>i]:bg-[var(--color-background)]
        hover:[&>i]:text-[var(--color-primary-20)]
        hover:[&>i]:border-[var(--color-background)]
    `;

    const spanClass = `
        absolute
        pointer-events-none
        bg-[var(--color-primary-10)]
        font-bold
        capitalize
        whitespace-nowrap
        text-white
        px-[0.6rem]
        py-[0.2rem]
        rounded-[10px]
        text-[0.9rem]
        hidden
    
        left-1/2
        -translate-x-1/2
        top-[-40px]
    
        [&::before]:content-['']
        [&::before]:absolute
        [&::before]:top-full
        [&::before]:left-1/2
        [&::before]:-ml-[5px]
        [&::before]:border-[5px]
        [&::before]:border-solid
        [&::before]:border-t-[var(--color-primary-10)]
        [&::before]:border-r-transparent
        [&::before]:border-b-transparent
        [&::before]:border-l-transparent
    `;

    const iClass = `
        text-[1.5rem]
        border-2
        border-current
        text-[var(--color-background)]
        rounded-full
        p-[0.85rem]
        transition-all
        duration-200
        ease-out
        opacity-90
        pointer-events-none
        
        max-[1350px]:text-[1.25rem]
        max-[1350px]:p-[0.75rem]
    `;

    return (
        <li className={`inline-flex px-1`}>
            <a href={href}
               target={`_blank`}
               aria-label={label}
               className={`${aClass}`}>
                <span className={spanClass}>{label}</span>
                <i className={`${icon} ${iClass}`}/>
            </a>
        </li>
    );
}