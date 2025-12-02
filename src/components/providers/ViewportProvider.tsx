import {type ReactNode, useContext, useEffect, useState, createContext} from "react";

interface ViewportContextValue {
    scrollX: number;
    scrollY: number;
    innerWidth: number;
    innerHeight: number;
    shouldDisplayNavTabs: () => boolean;
    shouldDisplayCalculatorPartsSideBySide: () => boolean;
    isInnerWidthBetween: (min: number, max: number) => boolean;
}

const ViewportContext = createContext<ViewportContextValue | undefined>(undefined);

export const useViewport = () => {
    const ctx = useContext(ViewportContext);
    if(!ctx) throw new Error("useViewport must be used inside <ViewportProvider>");
    return ctx;
};

export default function ViewportProvider({ children } : { children?: ReactNode }) {
    const [scrollX, setScrollX] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [didCreateListeners, setDidCreateListeners] = useState(false);

    useEffect(() => {
        createListeners();
        return () => destroyListeners();
    }, []);

    const createListeners = (): void => {
        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onResize);
        onScroll();
        onResize();
        setDidCreateListeners(true);
    };

    const destroyListeners = (): void => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        setDidCreateListeners(false);
    };

    const onScroll = (): void => {
        setScrollX(window.scrollX);
        setScrollY(window.scrollY);
    };

    const onResize = (): void => {
        setInnerWidth(document.documentElement.clientWidth);
        setInnerHeight(window.innerHeight);
    };

    const shouldDisplayCalculatorPartsSideBySide = (): boolean => {
        return innerWidth > 1200;
    }

    const shouldDisplayNavTabs = (): boolean => {
        return innerWidth <= 1024;
    };

    const isInnerWidthBetween = (min: number, max: number): boolean => {
        return innerWidth >= min && innerWidth <= max;
    };

    return (
        <ViewportContext.Provider value={{scrollX, scrollY, innerWidth, innerHeight, shouldDisplayNavTabs, shouldDisplayCalculatorPartsSideBySide, isInnerWidthBetween}}>
            {didCreateListeners && children}
        </ViewportContext.Provider>
    );
};