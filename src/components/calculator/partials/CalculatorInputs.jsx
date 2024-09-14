import {useState} from "react"
import {useUtils} from "/src/hooks/utils.js"
import {useCalculator} from "/src/hooks/calculator.js"

import {Form} from "react-bootstrap"
import FormItem from "/src/components/forms/FormItem.jsx"
import InputGroupText from "react-bootstrap/InputGroupText"
import InputWrapper from "/src/components/forms/wrappers/InputWrapper.jsx"
import SelectWrapper from "/src/components/forms/wrappers/SelectWrapper.jsx"
import ButtonWrapper from "/src/components/forms/wrappers/ButtonWrapper"
import {faCalculator, faTrash} from "@fortawesome/free-solid-svg-icons"

const CalculatorInputEvent = {
    INPUT: 'input',
    RESET: 'reset',
    SUBMIT: 'submit'
}

function CalculatorInputs({className, initialValues, editable, validation, canCalculate, onUserEvent}) {
    const utils = useUtils()
    const calculator = useCalculator()

    const [formValues, setFormValues] = useState(initialValues)

    const _getInputValueForField = (field) => {
        return formValues[field.id]
    }

    const _getSelectValueForField = (field) => {
        return formValues[field.id + 'Format']
    }

    const _setInputValueForField = (field, value, forceUpdate) => {
        if(value.charAt(value.length - 1) === ',') {
            value = value.substring(0, value.length - 1) + '.'
        }

        _setFormValue(field.id, utils.cleanNumericInputString(
            value,
            field.range[0],
            field.range[1],
            field.maxDecimals,
            forceUpdate
        ))

        if(forceUpdate)
            _checkFormValues()
    }

    const _setSelectValueForField = (field, option) => {
        _setFormValue(field.id + 'Format', option.value)
        _checkFormValues()
    }

    const _setFormValue = (id, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value
        }))

        formValues[id] = value
        _notifyEvent(CalculatorInputEvent.INPUT, formValues)
    }

    const _checkFormValues = () => {
        if(formValues.returnRateFormat === calculator.Periods.YEAR && formValues.durationFormat === calculator.Periods.MONTH && formValues.duration !== '') {
            _setFormValue('duration', utils.roundMonthsToNearestYear(formValues.duration).toString())
        }

        if(formValues.durationFormat === calculator.Periods.YEAR && formValues.duration !== '' && parseInt(formValues.duration) > 300) {
            _setFormValue('duration', '300')
        }
    }

    const _getPrefixForField = (field) => {
        return field.currency ? '$' : null
    }

    const _getPlaceHolderForField = (field) => {
        return (0).toFixed(field.maxDecimals)
    }

    const _getMessageForField = (field) => {
        if(!validation)
            return null

        const error = validation.errors.find(error => error.fieldId === field.id)
        if(!error)
            return null

        return {
            message: error.message,
            className: 'text-danger'
        }
    }

    const _canClear = () => {
        for(const definition of calculator.listParameterDefinitions()) {
            if(formValues[definition.id] !== '')
                return true
        }

        return false
    }

    const _onClearButton = () => {
        const defaultBundle = calculator.generateParametersBundle()
        const formValues = calculator.convertBundleToFormValues(defaultBundle)
        setFormValues(formValues)
        _notifyEvent(CalculatorInputEvent.RESET, formValues)
    }

    const _onCalculateButton = () => {
        _notifyEvent(CalculatorInputEvent.SUBMIT, formValues)
    }
    
    const _notifyEvent = (eventType, formValues) => {
        onUserEvent && onUserEvent(eventType, formValues)
    }

    return (
        <Form className={className}>
            {calculator.listParameterDefinitions().map((field, key) => (
                <FormItem key={key}
                          label={field.description}
                          required={true}
                          description={_getMessageForField(field)}>

                    {_getPrefixForField(field) && (
                        <InputGroupText>{_getPrefixForField(field)}</InputGroupText>
                    )}

                    <InputWrapper   type={`text`}
                                    placeholder={_getPlaceHolderForField(field)}
                                    numeric={true}
                                    disabled={!editable}
                                    value={ _getInputValueForField(field) }
                                    onValueChanged={(newValue, didLoseFocus) => {
                                        _setInputValueForField(field, newValue, didLoseFocus)
                                    }}/>

                    {field.formats && (
                        <SelectWrapper  style={{maxWidth: '125px'}}
                                        options={field.formats}
                                        disabled={!editable}
                                        value={ _getSelectValueForField(field) }
                                        onOptionSelected={(option) => {
                                            _setSelectValueForField(field, option)
                                        }}/>
                    )}
                </FormItem>
            ))}

            {editable && canCalculate && (
                <FormItem>
                    <ButtonWrapper  className={`btn-primary mt-2`}
                                    label={`Calculate`}
                                    faIcon={faCalculator}
                                    enabled={true}
                                    onClick={_onCalculateButton}/>
                </FormItem>
            )}

            {editable && (
                <FormItem>
                    <ButtonWrapper  className={`btn-secondary`}
                                    label={`Clear`}
                                    id={`clear-button`}
                                    faIcon={faTrash}
                                    enabled={_canClear()}
                                    onClick={_onClearButton}/>
                </FormItem>
            )}
        </Form>
    )
}

export {CalculatorInputs, CalculatorInputEvent}