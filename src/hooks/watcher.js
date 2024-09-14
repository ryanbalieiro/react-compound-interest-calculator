import { useState, useEffect } from 'react'

const BREAKPOINT_VALUES = {
    xxs: 0,
    xs: 360,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
}

const Breakpoints = {
    XXS: 'xxs',
    XS: 'xs',
    SM: 'sm',
    MD: 'md',
    LG: 'lg',
    XL: 'xl',
    XXL: 'xxl',
}

export function useWatcher() {
    const [scrollX, setScrollX] = useState(0)
    const [scrollY, setScrollY] = useState(0)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [innerHeight, setInnerHeight] = useState(window.innerHeight)

    useEffect(() => {
        const onScroll = () => {
            setScrollX(window.scrollX)
            setScrollY(window.scrollY)
        }

        const onResize = () => {
            setInnerWidth(window.innerWidth)
            setInnerHeight(window.innerHeight)
        }

        // Attach event listeners
        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onResize)

        // Initialize values
        onScroll()
        onResize()

        // Cleanup listeners on unmount
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    const isBreakpoint = (breakpoint) => {
        return innerWidth >= BREAKPOINT_VALUES[breakpoint]
    }

    return {
        Breakpoints,
        getScrollX: () => scrollX,
        getScrollY: () => scrollY,
        getInnerWidth: () => innerWidth,
        getInnerHeight: () => innerHeight,
        isBreakpoint,
    }
}
