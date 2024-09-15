import {useCalculator} from "/src/hooks/calculator.js"

const calculator = useCalculator()

const _sessionVars = {
    params: calculator.generateParametersBundle()
}

export const useStore = () => {

    const getParams = () => {
        return _sessionVars.params
    }

    const setParams = (params) => {
        _sessionVars.params = params
    }

    const resetParams = () => {
        _sessionVars.params = calculator.generateParametersBundle()
    }

    return {
        getParams,
        setParams,
        resetParams
    }
}