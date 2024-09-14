function CalculatorTabWrapper({visible, children}) {
    return (
        <div className={`tab-wrapper ${visible ? 'd-flex' : 'd-none'} h-100 w-100`}>
            {children}
        </div>
    )
}

export default CalculatorTabWrapper