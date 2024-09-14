import './ResultCard.scss'
import {Card} from "react-bootstrap"
import {useUtils} from "/src/hooks/utils.js"

function ResultCard({label, value, colorClass, className}) {
    const utils = useUtils()

    const _getDisplayValue = () => {
        if(value === null || value === undefined)
            return '-'
        return utils.toDisplayCurrency(value)
    }

    return (
        <Card className={`result-card ${className}`}>
            <p className={`text-1 label`}>{label}</p>
            <h4 className={`text-custom-subheading value text-${colorClass}`}>{ _getDisplayValue() }</h4>
        </Card>
    )
}

export default ResultCard