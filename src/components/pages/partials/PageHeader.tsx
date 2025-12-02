import type { ReactNode } from "react";
import Divider from "@/components/layout/Divider.tsx";

interface PageHeaderProps {
    children?: ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
}

export default function PageHeader({ children = null, className = "", title = "", subtitle = "" } : PageHeaderProps) {
    return (
        <div className={`page-header ${className} text-center`}>
            <h1 className="text-4xl md:text-5xl font-literata text-primary font-bold mb-2 md:mb-4">{title}</h1>
            <h2 className="text-lg md:text-2xl font-ubuntu text-muted">{subtitle}</h2>
            {children && (<>{children}</>)}
            <Divider className="my-6 mb-6 md:my-8 md:mb-10"/>
        </div>
    );
}