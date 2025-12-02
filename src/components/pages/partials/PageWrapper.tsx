import type { ReactNode } from "react";
import Container from "@/components/layout/Container.tsx";

interface PageWrapperProps {
    children?: ReactNode;
    className?: string;
}

export default function PageWrapper({ children, className = "" } : PageWrapperProps) {
    return (
        <div className={`bg-background`}>
            <Container className={`page-wrapper ${className} min-h-[calc(100vh-400px)] pt-8 pb-10 lg:pt-10 lg:pb-12`}>
                {children}
            </Container>
        </div>
    );
}