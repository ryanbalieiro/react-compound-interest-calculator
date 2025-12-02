import type { ReactNode } from "react";

interface ContainerProps {
    children?: ReactNode;
    className?: string;
}

export default function Container({ children, className = "" } : ContainerProps) {
    return (
        <div className={`container mx-auto ${className} px-6 lg:px-14 max-w-[1430px]`}>
            {children}
        </div>
    );
}