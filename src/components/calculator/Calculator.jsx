import "./Calculator.scss"
import {useEffect, useState} from "react"
import {useCalculator} from "/src/hooks/calculator.js"
import {useWatcher} from "/src/hooks/watcher.js"

import {CalculatorInputs, CalculatorInputEvent} from "/src/components/calculator/partials/CalculatorInputs.jsx"
import {Card} from "react-bootstrap"
import {faChartLine, faChartPie, faTable} from "@fortawesome/free-solid-svg-icons"
import CalculatorResultSummary from "/src/components/calculator/partials/CalculatorResultSummary.jsx"
import TabPicker from "/src/components/widgets/TabPicker.jsx"
import TabViewer from "/src/components/widgets/TabViewer.jsx"
import CalculatorEmptyTab from "/src/components/calculator/tabs/CalculatorEmptyTab.jsx"
import CalculatorTableTab from "/src/components/calculator/tabs/CalculatorTableTab.jsx"
import CalculatorDistributionTab from "/src/components/calculator/tabs/CalculatorDistributionTab.jsx"
import CalculatorEvolutionTab from "/src/components/calculator/tabs/CalculatorEvolutionTab.jsx"

function Calculator({className, editable, bordered, paramsBundle, onParamsChanged, onCalculationSuccess}) {
    const calculator = useCalculator()
    const watcher = useWatcher()

    /** Constants **/
    const TAB_VIEWER_SIZE = watcher.isBreakpoint(watcher.Breakpoints.LG) ? '500px' : '400px'
    const INITIAL_FORM_VALUES = calculator.convertBundleToFormValues(paramsBundle)
    const TABS = [
        {
            id: 'evolution',
            label: 'Evolution',
            faIcon: faChartLine
        },

        {
            id: 'distribution',
            label: 'Distribution',
            faIcon: faChartPie
        },

        {
            id: 'table',
            label: 'Table',
            faIcon: faTable
        }
    ]

    /** State vars **/
    const [parameters, setParameters] = useState(paramsBundle)
    const [currentFormValues, setCurrentFormValues] = useState(INITIAL_FORM_VALUES)
    const [validation, setValidation] = useState(null)
    const [activeTabId, setActiveTabId] = useState(TABS[0].id)
    const [result, setResult] = useState(null)

    useEffect(() => {
        _calculate(paramsBundle)
    }, [])

    const _onFormEvent = (eventType, formValues) => {
        switch(eventType) {
            case CalculatorInputEvent.INPUT: _onInputEvent(formValues); break
            case CalculatorInputEvent.RESET: _onResetEvent(formValues); break
            case CalculatorInputEvent.SUBMIT: _onSubmitEvent(formValues); break
        }
    }

    const _onInputEvent = (formValues) => {
        const bundle = calculator.convertFormValuesToBundle(formValues)
        setCurrentFormValues(formValues)

        _checkIfResultIsDirty(bundle)
        if(validation) {
            _validate(bundle)
        }
    }

    const _onResetEvent = (formValues) => {
        const bundle = calculator.convertFormValuesToBundle(formValues)
        setCurrentFormValues(formValues)
        _commitValues(bundle)
        setValidation(null)
        setResult(null)
    }

    const _onSubmitEvent = (formValues) => {
        const bundle = calculator.convertFormValuesToBundle(formValues)
        setCurrentFormValues(formValues)
        _commitValues(bundle)

        const validation = _validate(bundle)
        if(validation.success) {
            _calculate(bundle)
            _scrollToResult(validation)
        }
    }

    const _commitValues = (bundle) => {
        setParameters(bundle)
        onParamsChanged && onParamsChanged(bundle)
    }

    const _validate = (bundle) => {
        const updatedValidation = calculator.validateBundle(bundle)
        setValidation(updatedValidation)
        return updatedValidation
    }

    const _calculate = (bundle) => {
        const result = calculator.calculate(bundle)
        setResult(result)
        onCalculationSuccess && onCalculationSuccess(result)
    }

    const _checkIfResultIsDirty = (bundle) => {
        if(!result)
            return

        const resultBundle = result.inputBundle
        for(let i in resultBundle) {
            if(bundle[i] !== resultBundle[i]) {
                setResult(false)
                return
            }
        }
    }

    const _scrollToResult = (validation) => {
        if(watcher.isBreakpoint(watcher.Breakpoints.XL) || !validation.success)
            return

        document.getElementById('clear-button').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

    const _getFinalResult = () => {
        if(!result)
            return {total: null, interest: null, contributed: null}
        return result.final
    }

    const _getClassName = () => {
        const borderClass = bordered ? `px-4` : `border-0`
        return `${className} ${borderClass}`
    }

    return (
        <Card className={_getClassName()}>
            <div className={`calculator`}>
                {parameters && (
                    <div className={`calculator-input-wrapper ${editable ? 'd-block' : 'd-none d-xl-block'}`}>
                        <h5 className={`fw-bold text-custom-subheading card-title pt-2`}>
                            Investment Details
                        </h5>

                        <CalculatorInputs initialValues={INITIAL_FORM_VALUES}
                                          editable={editable}
                                          validation={validation}
                                          canCalculate={!result}
                                          onUserEvent={_onFormEvent}/>
                    </div>
                )}

                {parameters && (
                    <div className={`calculator-result-wrapper ${editable ? 'calculator-result-wrapper-with-xl-border' : 'calculator-result-wrapper-without-xl-border'}`}
                         id={`calculator-result-wrapper`}>
                        <CalculatorResultSummary total={_getFinalResult().total}
                                                 totalInterest={_getFinalResult().totalInterest}
                                                 totalContributed={_getFinalResult().totalContributed}/>

                        <TabPicker options={TABS} className={`mt-3`} activeOptionId={activeTabId} onOptionSelected={setActiveTabId}/>
                        <TabViewer fixedHeight={TAB_VIEWER_SIZE}>
                            {!result && (
                                <CalculatorEmptyTab fixedHeight={TAB_VIEWER_SIZE} visible={true}/>
                            )}

                            {result && (<>
                                <CalculatorEvolutionTab result={result} visible={activeTabId === 'evolution'}/>
                                <CalculatorDistributionTab result={result} visible={activeTabId === 'distribution'}/>
                                <CalculatorTableTab result={result} visible={activeTabId === 'table'}/>
                            </>)}
                        </TabViewer>
                    </div>
                )}
            </div>
        </Card>
    )
}

export default Calculator