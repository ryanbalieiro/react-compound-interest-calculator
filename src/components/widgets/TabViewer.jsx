function TabViewer({children, fixedHeight, className}) {
    return (
        <div className={`tab-viewer bg-card-focus overflow-y-auto ${className}`} style={{height: fixedHeight || 'auto'}}>
            {children}
        </div>
    )
}

export default TabViewer