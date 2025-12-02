import type { ReactNode } from "react";

interface PageSectionProps {
    children?: ReactNode;
    className?: string;
}

export default function PageSection({ children = null, className = "" } : PageSectionProps) {
    return (
        <section className={`page-section ${className}`}>
            {children && (<>{children}</>)}
        </section>
    );
}