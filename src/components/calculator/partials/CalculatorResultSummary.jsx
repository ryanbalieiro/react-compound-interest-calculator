import './CalculatorResultSummary.scss'
import ResultCard from "/src/components/widgets/ResultCard.jsx"
import {useCalculator} from "/src/hooks/calculator.js"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEquals, faPlus} from "@fortawesome/free-solid-svg-icons"

function CalculatorResultSummary({total, totalContributed, totalInterest}) {
    const calculator = useCalculator()

    const iconsThreshold = 9999999

    const shouldShowIcons = totalContributed < iconsThreshold
        && totalInterest < iconsThreshold
        && total < iconsThreshold

    return (
        <div className="result-summary">
            <ResultCard label={`Estimated total`}
                        className={`me-md-1`}
                        value={total}
                        colorClass={calculator.ColorClassSchema.TOTAL}/>

            {shouldShowIcons && (<FontAwesomeIcon className={`fa-icon`} icon={faEquals}/>)}

            <ResultCard label={`Total invested`}
                        className={`ms-md-1 me-md-1`}
                        value={totalContributed}
                        colorClass={calculator.ColorClassSchema.CONTRIBUTED}/>

            {shouldShowIcons && (<FontAwesomeIcon className={`fa-icon`} icon={faPlus}/>)}

            <ResultCard label={`Total interest`}
                        className={`ms-md-1`}
                        value={totalInterest}
                        colorClass={calculator.ColorClassSchema.INTEREST}/>
        </div>
    )
}

export default CalculatorResultSummary