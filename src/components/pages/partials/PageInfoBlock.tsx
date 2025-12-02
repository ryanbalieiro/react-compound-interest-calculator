import type { ReactNode } from "react";

export function PageInfoBlock({ children = null, className = "" } : { children?: ReactNode, className?: string }) {
    return (
        <div className={`flex flex-col gap-3 md:gap-4 ${className} mb-6 md:mb-8 last:mb-0`}>
            {children && (<>{children}</>)}
        </div>
    );
}

export function PageInfoBlockTitle({ label = "", icon = "" } : { label: string, icon?: string }) {
    return (
        <h3 className="font-literata text-xl md:text-2xl font-bold">
            {icon && (<i className={`${icon} mr-2`}/>)}
            <span dangerouslySetInnerHTML={{__html: label}}/>
        </h3>
    );
}

export function PageInfoBlockParagraph({ content = "", className = "" } : { content: string, className?: string }) {
    return (
        <p className={`text-sm md:text-base ${className}`}
           dangerouslySetInnerHTML={{ __html: content }}/>
    );
}

export function PageInfoBlockList({ items = [], numbered = false } : { items: string[], numbered?: boolean }) {
    const Tag = numbered ? "ol" : "ul";
    const ulOrOlClassName = numbered ? "list-decimal marker:font-bold" : "list-disc";
    const liClassName = numbered ? "ps-2" : "ps-0";

    return (
        <Tag className={`${ulOrOlClassName} text-sm md:text-base ms-10`}>
            {items.map((item, index) => (
                <li key={index}
                    className={liClassName}
                    dangerouslySetInnerHTML={{__html: item}}/>
            ))}
        </Tag>
    );
}

export function PageInfoBlockQuote({ children = null, className = "" } : { children: ReactNode, className?: string }) {
    return (
        <div className={`border-2 border-dotted border-muted/40 p-4 rounded ${className}`}>
            {children}
        </div>
    );
}
